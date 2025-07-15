
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
    if (!statusCode) return 'bg-emerald-500';
    if (statusCode >= 200 && statusCode < 300) return 'bg-emerald-600';
    if (statusCode >= 400 && statusCode < 500) return 'bg-amber-500';
    if (statusCode >= 500) return 'bg-red-600';
    return 'bg-emerald-700';
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
      <Card className="bg-gradient-to-br from-emerald-700 to-green-800 border-emerald-600/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            API Monitor & Webhook Inspector
            <div className="flex items-center space-x-2">
              <Button
                variant={isRecording ? "destructive" : "default"}
                size="sm"
                onClick={toggleRecording}
                className={isRecording ? "bg-red-600 hover:bg-red-700 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
              >
                {isRecording ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRecording ? 'Pause' : 'Record'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearLogs} 
                className="bg-white/90 border-white text-emerald-700 hover:bg-white hover:text-emerald-800 shadow-md"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-emerald-100" />
              <span className="text-sm text-emerald-100">Filter:</span>
            </div>
            <div className="flex space-x-2">
              {['all', 'webhook', 'api_request', 'api_response'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f as any)}
                  className={filter === f 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-white/90 border-white text-emerald-700 hover:bg-white hover:text-emerald-800 shadow-md"
                  }
                >
                  {f.replace('_', ' ').toUpperCase()}
                </Button>
              ))}
            </div>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
              {filteredLogs.length} logs
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs Table */}
        <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900">Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-200/50">
                    <TableHead className="text-emerald-800">Time</TableHead>
                    <TableHead className="text-emerald-800">Type</TableHead>
                    <TableHead className="text-emerald-800">Endpoint</TableHead>
                    <TableHead className="text-emerald-800">Status</TableHead>
                    <TableHead className="text-emerald-800">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-emerald-200/30 hover:bg-emerald-50/50">
                      <TableCell className="text-xs text-emerald-700">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          {log.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs max-w-32 truncate text-emerald-700">
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
                          className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
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
        <Card className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-md border-emerald-200/50">
          <CardHeader>
            <CardTitle className="text-emerald-900">Log Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4 bg-emerald-100/50 border-emerald-200">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Overview</TabsTrigger>
                  <TabsTrigger value="payload" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Payload</TabsTrigger>
                  <TabsTrigger value="response" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Response</TabsTrigger>
                  <TabsTrigger value="headers" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Headers</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-emerald-800">Type</label>
                      <p className="text-sm text-emerald-700">{selectedLog.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-emerald-800">Method</label>
                      <p className="text-sm text-emerald-700">{selectedLog.method || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-emerald-800">Status Code</label>
                      <p className="text-sm text-emerald-700">{selectedLog.statusCode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-emerald-800">Duration</label>
                      <p className="text-sm text-emerald-700">{selectedLog.duration ? `${selectedLog.duration}ms` : 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-800">Endpoint</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-emerald-700 flex-1">{selectedLog.endpoint}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(selectedLog.endpoint)}
                        className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-emerald-800">Timestamp</label>
                    <p className="text-sm text-emerald-700">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                </TabsContent>

                <TabsContent value="payload">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-emerald-800">Request Payload</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.payload))}
                        className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-emerald-50 p-3 rounded text-xs overflow-auto max-h-64 text-emerald-900 border border-emerald-200">
                      {formatJson(selectedLog.payload)}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="response">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-emerald-800">Response Data</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.response))}
                        className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-emerald-50 p-3 rounded text-xs overflow-auto max-h-64 text-emerald-900 border border-emerald-200">
                      {formatJson(selectedLog.response)}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="headers">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-emerald-800">Request Headers</label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(formatJson(selectedLog.headers))}
                        className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="bg-emerald-50 p-3 rounded text-xs overflow-auto max-h-64 text-emerald-900 border border-emerald-200">
                      {formatJson(selectedLog.headers)}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center text-emerald-500 py-8">
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
