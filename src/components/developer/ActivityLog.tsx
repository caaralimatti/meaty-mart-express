import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RefreshCw, Terminal } from 'lucide-react';

interface ApiLog {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  payload: any;
  error: string;
  created_at: string;
}

export const ActivityLog = () => {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('dev_api_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('dev_api_logs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'dev_api_logs'
      }, (payload) => {
        setLogs(prev => [payload.new as ApiLog, ...prev.slice(0, 99)]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-500';
    if (status >= 400 && status < 500) return 'bg-yellow-500';
    if (status >= 500) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <CardTitle>Activity Log</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLogs}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-2 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                No API activity logged yet
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="border rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(log.status)}>
                      {log.method}
                    </Badge>
                    <span className="text-muted-foreground">{formatTime(log.created_at)}</span>
                    <span className="font-medium">{log.endpoint}</span>
                    <Badge variant={log.status >= 400 ? 'destructive' : 'secondary'}>
                      {log.status}
                    </Badge>
                  </div>
                  {log.error && (
                    <div className="text-red-500 text-xs break-all">
                      Error: {log.error}
                    </div>
                  )}
                  {log.payload && (
                    <div className="text-muted-foreground text-xs">
                      <details>
                        <summary className="cursor-pointer hover:text-foreground">
                          View payload
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap break-all">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};