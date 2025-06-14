
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  boneIn: boolean;
  inStock: boolean;
  rating: number;
  freshness: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-red-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white">Out of Stock</Badge>
          </div>
        )}
        {product.inStock && discountPercent > 0 && (
          <Badge className="absolute top-2 left-2 bg-green-600">
            {discountPercent}% OFF
          </Badge>
        )}
        <Badge className="absolute top-2 right-2 bg-blue-600">
          {product.freshness}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg truncate">{product.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {product.weight}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.boneIn ? "Bone-in" : "Boneless"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-red-600">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {product.inStock && (
            <div className="flex items-center text-green-600 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              30 min
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
