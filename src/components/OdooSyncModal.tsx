import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OdooSync from "./OdooSync";
import { Database } from "lucide-react";

interface OdooSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
  onProductsSync: (products: any[]) => void;
}

const OdooSyncModal = ({ isOpen, onClose, products, onProductsSync }: OdooSyncModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-red-600" />
            <span>Odoo Integration - Product Sync</span>
          </DialogTitle>
        </DialogHeader>
        <OdooSync products={products} onProductsSync={onProductsSync} />
      </DialogContent>
    </Dialog>
  );
};

export default OdooSyncModal;