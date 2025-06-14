import { supabase } from '@/integrations/supabase/client';

interface OdooConfig {
  serverUrl: string;
  database: string;
  username: string;
  password: string;
  apiKey?: string;
}

interface OdooProduct {
  id: number;
  name: string;
  list_price: number;
  standard_price: number;
  qty_available: number;
  categ_id: [number, string];
  description: string;
  image_1920?: string;
}

interface OdooCustomer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  street?: string;
  city?: string;
  country_id?: [number, string];
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

  private async makeRequest(endpoint: string, data?: any) {
    console.log(`Making Odoo proxy request for endpoint: ${endpoint}`, { data });
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke('odoo-api-proxy', {
        body: {
          odoo_endpoint: endpoint,
          data,
          session_id: this.sessionId,
        },
      });

      if (error) {
        throw error;
      }
      
      if (responseData.error) {
        console.error('Odoo API Error:', responseData.error);
        const odooErrorMessage = responseData.error.data?.message || responseData.error.message || 'Odoo API request failed';
        throw new Error(odooErrorMessage);
      }

      return responseData;
    } catch (error) {
      console.error('Odoo proxy request failed:', error);
      throw error;
    }
  }

  async authenticate(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/web/session/authenticate', {
        jsonrpc: '2.0',
        method: 'call',
        params: {},
      });

      if (response.result && response.result.session_id) {
        this.sessionId = response.result.session_id;
        console.log('Odoo authentication successful via proxy');
        return true;
      }
      
      this.sessionId = null;
      return false;
    } catch (error) {
      console.error('Odoo authentication failed:', error);
      this.sessionId = null;
      return false;
    }
  }

  async getProducts(): Promise<OdooProduct[]> {
    if (!this.sessionId) await this.authenticate();
    if (!this.sessionId) throw new Error("Not authenticated with Odoo");

    try {
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'product.product',
          method: 'search_read',
          args: [[]],
          kwargs: {
            fields: ['name', 'list_price', 'standard_price', 'qty_available', 'categ_id', 'description', 'image_1920'],
            limit: 100,
          },
        },
      });

      return response.result || [];
    } catch (error) {
      console.error('Failed to fetch products from Odoo:', error);
      return [];
    }
  }

  async createCustomer(customer: Partial<OdooCustomer>): Promise<number | null> {
    if (!this.sessionId) await this.authenticate();
    if (!this.sessionId) throw new Error("Not authenticated with Odoo");

    try {
      const response = await this.makeRequest('/web/dataset/call_kw', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          model: 'res.partner',
          method: 'create',
          args: [customer],
          kwargs: {},
        },
      });

      return response.result;
    } catch (error) {
      console.error('Failed to create customer in Odoo:', error);
      return null;
    }
  }

  async createOrder(order: OdooOrder): Promise<number | null> {
    if (!this.sessionId) await this.authenticate();
    if (!this.sessionId) throw new Error("Not authenticated with Odoo");
    
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
      });

      return response.result;
    } catch (error) {
      console.error('Failed to create order in Odoo:', error);
      return null;
    }
  }

  async syncProductsToLocal(localProducts: any[]): Promise<any[]> {
    const odooProducts = await this.getProducts();
    
    return localProducts.map(localProduct => {
      const odooProduct = odooProducts.find(op => 
        op.name.toLowerCase().includes(localProduct.name.toLowerCase())
      );
      
      if (odooProduct) {
        return {
          ...localProduct,
          odooId: odooProduct.id,
          price: odooProduct.list_price,
          inStock: odooProduct.qty_available > 0,
          odooData: odooProduct,
        };
      }
      
      return localProduct;
    });
  }
}

export const odooService = new OdooService();
export type { OdooProduct, OdooCustomer, OdooOrder };
