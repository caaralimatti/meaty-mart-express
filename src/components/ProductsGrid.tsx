
import { Button } from "@/components/ui/button";
import { Heart, Star, Activity } from "lucide-react";
import ProductCard from "@/components/ProductCard";

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

interface ProductsGridProps {
  products: Product[];
  wishlistItems: number[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onOpenReviews: (productName: string) => void;
  onOpenNutrition?: (productName: string) => void;
}

const ProductsGrid = ({
  products,
  wishlistItems,
  onAddToCart,
  onToggleWishlist,
  onOpenReviews,
  onOpenNutrition
}: ProductsGridProps) => {
  return (
    <div className="container mx-auto px-4">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
            <div className="flex justify-between items-center mt-2 px-2">
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`${
                    wishlistItems.includes(product.id) 
                      ? 'text-red-600' 
                      : 'text-gray-400'
                  } hover:text-red-600`}
                >
                  <Heart className={`w-4 h-4 ${
                    wishlistItems.includes(product.id) ? 'fill-current' : ''
                  }`} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenReviews(product.name)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Star className="w-4 h-4 mr-1" />
                  Reviews
                </Button>
                
                {onOpenNutrition && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenNutrition(product.name)}
                    className="text-gray-600 hover:text-green-600"
                  >
                    <Activity className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
