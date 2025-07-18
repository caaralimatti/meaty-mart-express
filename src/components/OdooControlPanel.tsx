
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, RotateCw, BarChart3 } from "lucide-react";

interface OdooControlPanelProps {
  onSyncOpen: () => void;
}

const OdooControlPanel = ({ onSyncOpen }: OdooControlPanelProps) => {
  return (
    <Card className="mb-6 border-red-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-red-600" />
          <CardTitle className="text-red-700">Odoo Integration</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            onClick={onSyncOpen}
            variant="outline" 
            className="flex items-center space-x-2 hover:bg-blue-50"
          >
            <RotateCw className="w-4 h-4" />
            <span>Sync Data</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 hover:bg-green-50"
            onClick={() => console.log('View reports')}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Reports</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 hover:bg-purple-50"
            onClick={() => console.log('View orders')}
          >
            <Database className="w-4 h-4" />
            <span>View Orders</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OdooControlPanel;
