
import { useState, useEffect } from 'react';

export interface ApiLog {
  id: string;
  timestamp: string;
  type: 'webhook' | 'api_request' | 'api_response';
  method?: string;
  endpoint: string;
  statusCode?: number;
  payload?: any;
  response?: any;
  headers?: Record<string, string>;
  duration?: number;
}

export const useApiMonitor = () => {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [isRecording, setIsRecording] = useState(true);

  const addLog = (log: Omit<ApiLog, 'id' | 'timestamp'>) => {
    if (!isRecording) return;
    
    const newLog: ApiLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only last 100 logs
  };

  const clearLogs = () => setLogs([]);
  
  const toggleRecording = () => setIsRecording(!isRecording);

  // Intercept fetch requests
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      if (!isRecording) return originalFetch(...args);
      
      const startTime = Date.now();
      const [url, options = {}] = args;
      const method = options.method || 'GET';
      
      // Log the request
      addLog({
        type: 'api_request',
        method,
        endpoint: url.toString(),
        payload: options.body ? JSON.parse(options.body as string) : null,
        headers: options.headers as Record<string, string> || {},
      });

      try {
        const response = await originalFetch(...args);
        const responseClone = response.clone();
        const responseData = await responseClone.json().catch(() => null);
        
        // Log the response
        addLog({
          type: 'api_response',
          method,
          endpoint: url.toString(),
          statusCode: response.status,
          response: responseData,
          duration: Date.now() - startTime,
        });

        return response;
      } catch (error) {
        addLog({
          type: 'api_response',
          method,
          endpoint: url.toString(),
          statusCode: 0,
          response: { error: error.message },
          duration: Date.now() - startTime,
        });
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isRecording]);

  return {
    logs,
    isRecording,
    addLog,
    clearLogs,
    toggleRecording,
  };
};
