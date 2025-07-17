export interface OdooConfig {
  serverUrl: string;
  database: string;
  username: string;
  password: string;
  fields?: string;
}

export const getOdooConfig = (): OdooConfig => {
  // Try to get config from localStorage first (from Configuration Status UI)
  const raw = localStorage.getItem('odooConfig');
  const cfg = raw ? JSON.parse(raw) : {};
  
  return {
    serverUrl: cfg.serverUrl || 'https://goatgoat.xyz/',
    database: cfg.database || 'staging',
    username: cfg.username || 'admin',
    password: cfg.password || 'admin',
    fields: cfg.fields || 'name, list_price, uom_id'
  };
};

export const setOdooConfig = (config: OdooConfig) => {
  localStorage.setItem('odooConfig', JSON.stringify(config));
};

export const hasOdooConfig = (): boolean => {
  const raw = localStorage.getItem('odooConfig');
  return raw !== null && raw !== undefined;
};