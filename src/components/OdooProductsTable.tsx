
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OdooProduct {
  id: number;
  name: string;
  list_price: number;
  uom_id: [number, string];
}

interface OdooProductsTableProps {
  products: OdooProduct[];
  isLoading: boolean;
}

const OdooProductsTable = ({ products, isLoading }: OdooProductsTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Odoo Products...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Odoo Products Synced
          <Badge variant="secondary">{products.length} products</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found. Try syncing with Odoo.
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Sales Price</TableHead>
                  <TableHead>Unit of Measure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">
                      {product.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        £{product.list_price.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.uom_id ? product.uom_id[1] : 'Unit'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OdooProductsTable;
