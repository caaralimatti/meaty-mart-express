
import { supabase } from '@/integrations/supabase/client';
import { getOdooConfig, type OdooConfig } from './odooConfigManager';

interface OdooProduct {
  id: number;
  name: string;
  list_price: number;
  uom_id: [number, string]; // Unit of measure as [id, name]
  qty_available?: number;
  categ_id?: [number, string];
  description?: string;
  image_1920?: string;
}

interface OdooCustomer {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  country_id?: [number, string];
  company_type?: string;
  zip?: string;
  is_company?: boolean;
  supplier_rank?: number;
  customer_rank?: number;
}

interface OdooOrder {
  id?: number;
  partner_id: number;
  order_line: Array<{
    product_id: number;
    product_uom_qty: number;
    price_unit: number;
  }>;
  state?: string;
  amount_total?: number;
}

class OdooService {
  private sessionId: string | null = null;
  private config: OdooConfig | null = null;

  setConfig(config: OdooConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, data?: any) {
    console.log(`Making Odoo proxy request for endpoint: ${endpoint}`, { data, sessionId: this.sessionId });
    
    // Always get fresh config from localStorage
    const config = getOdooConfig();
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('odoo-api-proxy', {
        body: {
          odoo_endpoint: endpoint,
          data,
          session_id: this.sessionId,
          config: config, // Pass the fresh configuration to the edge function
        },
      });

      if (error) {
        console.error('Supabase function invoke error:', error);
        // Log the error to activity log
        this.logActivity(endpoint, 'POST', 500, data, error.message);
        throw error;
      }
      
      console.log('Odoo response:', responseData);
      
      if (responseData?.error) {
        console.error('Odoo API Error:', responseData.error);
        const odooErrorMessage = responseData.error.data?.message || responseData.error.message || 'Odoo API request failed';
        // Log the error to activity log
        this.logActivity(endpoint, 'POST', 400, data, odooErrorMessage);
        throw new Error(odooErrorMessage);
      }

      // Log successful request
      this.logActivity(endpoint, 'POST', 200, data, null);
      return responseData;
    } catch (error) {
      console.error('Odoo proxy request failed:', error);
      // Log the error to activity log
      this.logActivity(endpoint, 'POST', 500, data, error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }

  private async logActivity(endpoint: string, method: string, status: number, payload: any, error: string | null) {
    try {
      await supabase.functions.invoke('log-traffic', {
        body: {
          endpoint: `Odoo: ${endpoint}`,
          method,
          status,
          payload,
          error,
        },
      });
    } catch (logError) {
      console.error('Failed to log activity:', logError);
    }
  }

  async authenticate(): Promise<boolean> {
    // Always get fresh config from localStorage
    const config = getOdooConfig();
    this.setConfig(config);
    
    if (!config.serverUrl || !config.database || !config.username || !config.password) {
      const errorMessage = 'Odoo configuration incomplete. Please configure server, database, and credentials.';
      await this.logActivity('/authenticate', 'POST', 500, {}, errorMessage);
      throw new Error(errorMessage);
    }

    try {
      console.log('Starting Odoo authentication...');
      
      const response = await this.makeRequest('/web/session/authenticate', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: this.config.database,
          login: this.config.username,
          password: this.config.password
        },
        id: Math.random(),
      });

      console.log('Authentication response:', response);

      if (response?.result) {
        if (response.result.session_id) {
          this.sessionId = response.result.session_id;
          console.log('Odoo authentication successful via /web/session/authenticate');
          return true;
        } else if (response.result.uid && response.result.uid !== false) {
          this.sessionId = 'authenticated';
          console.log('Odoo authentication successful via uid');
          return true;
        }
      }
      
      console.log('Trying fallback authentication method...');
      const fallbackResponse = await this.makeRequest('/xmlrpc/2/common', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'common',
          method: 'authenticate',
          args: [this.config.database, this.config.username, this.config.password]
        },
        id: Math.random(),
      });

      if (fallbackResponse?.result && fallbackResponse.result !== false) {
        this.sessionId = 'authenticated';
        console.log('Odoo authentication successful via /xmlrpc/2/common');
        return true;
      }
      
      this.sessionId = null;
      console.log('Authentication failed - no valid response');
      return false;
    } catch (error) {
      console.error('Odoo authentication failed:', error);
      this.sessionId = null;
      return false;
    }
  }

  async getProducts(fields?: string[]): Promise<OdooProduct[]> {
    if (!this.sessionId) {
      const authSuccess = await this.authenticate();
      if (!authSuccess) throw new Error("Not authenticated with Odoo");
    }

    // Always get fresh config
    const config = getOdooConfig();
    this.setConfig(config);

    try {
      const fieldsToUse = fields || ['name', 'list_price', 'uom_id'];
      console.log('Fetching products from Odoo with fields:', fieldsToUse);
      
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'product.product',
          method: 'search_read',
          args: [[]],
          kwargs: {
            fields: fieldsToUse,
            limit: 100,
          },
        },
        id: Math.random(),
      });

      console.log('Products fetched successfully:', response.result?.length || 0, 'products');
      return response.result || [];
    } catch (error) {
      console.error('Failed to fetch products from Odoo:', error);
      return [];
    }
  }

  async syncProductsToLocal(localProducts: any[], fields?: string[]): Promise<any[]> {
    console.log('Starting product sync with Odoo...');
    const odooProducts = await this.getProducts(fields);
    console.log('Fetched', odooProducts.length, 'products from Odoo');
    
    return localProducts.map(localProduct => {
      const odooProduct = odooProducts.find(op => 
        op.name.toLowerCase().includes(localProduct.name.toLowerCase())
      );
      
      if (odooProduct) {
        console.log(`Matched local product "${localProduct.name}" with Odoo product "${odooProduct.name}"`);
        return {
          ...localProduct,
          odooId: odooProduct.id,
          price: odooProduct.list_price,
          unitOfMeasure: odooProduct.uom_id ? odooProduct.uom_id[1] : 'Unit',
          odooData: {
            id: odooProduct.id,
            name: odooProduct.name,
            list_price: odooProduct.list_price,
            uom_id: odooProduct.uom_id,
          },
        };
      }
      
      return localProduct;
    });
  }

  async createCustomer(customer: Partial<OdooCustomer>): Promise<number | null> {
    if (!this.sessionId) {
      const authSuccess = await this.authenticate();
      if (!authSuccess) throw new Error("Not authenticated with Odoo");
    }

    try {
      console.log('Creating customer in Odoo res.partner table:', customer);
      
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'res.partner',
          method: 'create',
          args: [customer],
          kwargs: {},
        },
        id: Math.random(),
      });

      if (response.result) {
        console.log('Odoo customer created successfully with ID:', response.result);
        return response.result;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to create customer in Odoo:', error);
      throw error;
    }
  }

  async createOrder(order: OdooOrder): Promise<number | null> {
    if (!this.sessionId) {
      const authSuccess = await this.authenticate();
      if (!authSuccess) throw new Error("Not authenticated with Odoo");
    }
    
    try {
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'sale.order',
          method: 'create',
          args: [order],
          kwargs: {},
        },
        id: Math.random(),
      });

      return response.result;
    } catch (error) {
      console.error('Failed to create order in Odoo:', error);
      return null;
    }
  }

  async createProduct(product: { name: string; list_price: number; seller_id: string; state: string; seller_name?: string; seller_uid?: string; default_code?: string; meat_type?: string }): Promise<number | null> {
    if (!this.sessionId) {
      const authSuccess = await this.authenticate();
      if (!authSuccess) throw new Error("Not authenticated with Odoo");
    }
    
    try {
      console.log('Creating product in Odoo product.template table:', product);
      
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'product.template',
          method: 'create',
          args: [product],
          kwargs: {},
        },
        id: Math.random(),
      });

      if (response.result) {
        console.log('Odoo product created successfully with ID:', response.result);
        return response.result;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to create product in Odoo:', error);
      throw error;
    }
  }
}

export const odooService = new OdooService();
export type { OdooProduct, OdooCustomer, OdooOrder };
