
import { useState, useEffect, useCallback, useRef } from 'react';

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
  const isRecordingRef = useRef(isRecording);

  const addLog = useCallback((log: Omit<ApiLog, 'id' | 'timestamp'>) => {
    const newLog: ApiLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only last 100 logs
  }, []);

  // Update ref whenever isRecording changes
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  const clearLogs = () => setLogs([]);
  
  const toggleRecording = () => setIsRecording(!isRecording);

  // Intercept fetch requests
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      const startTime = Date.now();
      const [url, options = {}] = args;
      const method = options.method || 'GET';
      
      // Log the request
      if (isRecordingRef.current) {
        addLog({
          type: 'api_request',
          method,
          endpoint: url.toString(),
          payload: options.body ? (
            typeof options.body === 'string' ? 
              (() => { try { return JSON.parse(options.body as string); } catch { return options.body; } })() 
              : options.body
          ) : null,
          headers: options.headers as Record<string, string> || {},
        });
      }

      try {
        const response = await originalFetch(args[0], args[1]);
        
        if (isRecordingRef.current) {
          const responseClone = response.clone();
          let responseData = null;
          
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              responseData = await responseClone.json();
            } else {
              responseData = await responseClone.text();
            }
          } catch {
            responseData = 'Unable to parse response';
          }
          
          // Log the response
          addLog({
            type: 'api_response',
            method,
            endpoint: url.toString(),
            statusCode: response.status,
            response: responseData,
            duration: Date.now() - startTime,
          });
        }

        return response;
      } catch (error) {
        if (isRecordingRef.current) {
          addLog({
            type: 'api_response',
            method,
            endpoint: url.toString(),
            statusCode: 0,
            response: { error: error.message },
            duration: Date.now() - startTime,
          });
        }
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [addLog]);

  return {
    logs,
    isRecording,
    addLog,
    clearLogs,
    toggleRecording,
  };
};
