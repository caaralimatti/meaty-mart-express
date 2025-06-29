
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApiMonitor, ApiLog } from '@/hooks/useApiMonitor';
import { Play, Pause, Trash2, Eye, Copy, Filter } from 'lucide-react';
import { toast } from 'sonner';

const ApiMonitor = () => {
  const { logs, isRecording, clearLogs, toggleRecording } = useApiMonitor();
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [filter, setFilter] = useState<'all' | 'webhook' | 'api_request' | 'api_response'>('all');

  const filteredLogs = logs.filter(log => filter === 'all' || log.type === filter);

  const getStatusColor = (statusCode?: number) => {
    if (!statusCode) return 'bg-gray-500';
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-500';
    if (statusCode >= 400 && statusCode < 500) return 'bg-yellow-500';
    if (statusCode >= 500) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const formatJson = (obj: any) => {
    if (!obj) return 'N/A';
    return JSON.stringify(obj, null, 2);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            API Monitor & Webhook Inspector
            <div className="flex items-center space-x-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                onClick={toggleRecording}
              >
                {isRecording ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRecording ? 'Pause' : 'Record'}
              </Button>
              <Button variant="outline" size="sm" onClick={clearLogs}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter:</span>
            </div>
            <div className="flex space-x-2">
              {['all', 'webhook', 'api_request', 'api_response'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f as any)}
                >
                  {f.replace('_', ' ').toUpperCase()}
                </Button>
              ))}
            </div>
            <Badge variant="outline">
              {filteredLogs.length} logs
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {log.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs max-w-32 truncate">
                        {log.endpoint}
                      </TableCell>
                      <TableCell>
                        {log.statusCode && (
                          <Badge className={`${getStatusColor(log.statusCode)} text-white`}>
                            {log.statusCode}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Log Details */}
        <Card>
          <CardHeader>
            <CardTitle>Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="payload">Payload</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-sm text-gray-600">{selectedLog.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Method</label>
                      <p className="text-sm text-gray-600">{selectedLog.method || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status Code</label>
                      <p className="text-sm text-gray-600">{selectedLog.statusCode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Duration</label>
                      <p className="text-sm text-gray-600">{selectedLog.duration ? `${selectedLog.duration}ms` : 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Endpoint</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600 flex-1">{selectedLog.endpoint}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedLog.endpoint)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timestamp</label>
                    <p className="text-sm text-gray-600">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                </TabsContent>

                <TabsContent value="payload">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Request Payload</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.payload))}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {formatJson(selectedLog.payload)}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="response">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Response Data</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.response))}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {formatJson(selectedLog.response)}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="headers">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Request Headers</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.headers))}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
                      {formatJson(selectedLog.headers)}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a log entry to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiMonitor;
