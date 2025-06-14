
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
  private config: OdooConfig | null = null;
  private sessionId: string | null = null;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const savedConfig = localStorage.getItem('odooConfig');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    }
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    if (!this.config) {
      throw new Error('Odoo configuration not found');
    }

    const url = `${this.config.serverUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.sessionId) {
      headers['Cookie'] = `session_id=${this.sessionId}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      requestOptions.body = JSON.stringify(data);
    }

    console.log(`Making Odoo API request to: ${url}`, { method, data });

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Odoo API request failed:', error);
      throw error;
    }
  }

  async authenticate(): Promise<boolean> {
    if (!this.config) {
      throw new Error('Odoo configuration not found');
    }

    try {
      const response = await this.makeRequest('/web/session/authenticate', 'POST', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: this.config.database,
          login: this.config.username,
          password: this.config.password,
        },
      });

      if (response.result && response.result.session_id) {
        this.sessionId = response.result.session_id;
        console.log('Odoo authentication successful');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Odoo authentication failed:', error);
      return false;
    }
  }

  async getProducts(): Promise<OdooProduct[]> {
    try {
      const response = await this.makeRequest('/web/dataset/call_kw', 'POST', {
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
    try {
      const response = await this.makeRequest('/web/dataset/call_kw', 'POST', {
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
    try {
      const response = await this.makeRequest('/web/dataset/call_kw', 'POST', {
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
