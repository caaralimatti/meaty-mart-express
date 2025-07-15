
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, X, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

interface ProductReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const ProductReviews = ({ isOpen, onClose, productName }: ProductReviewsProps) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      user: "Rajesh K.",
      rating: 5,
      comment: "Excellent quality meat! Very fresh and well-packaged. Delivered exactly on time.",
      date: "2024-01-15",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: "Priya S.",
      rating: 4,
      comment: "Good quality but slightly expensive. The cold chain was maintained properly.",
      date: "2024-01-10",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: "Kumar M.",
      rating: 5,
      comment: "Best goat meat in Hubli! Will definitely order again. Great packaging and freshness.",
      date: "2024-01-08",
      verified: false,
      helpful: 15
    }
  ]);

  const submitReview = () => {
    if (newRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Please write a review");
      return;
    }
    
    toast.success("Review submitted successfully!");
    setShowWriteReview(false);
    setNewRating(0);
    setNewComment("");
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-500 to-green-600 text-white border-b border-emerald-300">
          <CardTitle className="text-xl font-semibold">Reviews for {productName}</CardTitle>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 transition-all duration-300">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto bg-gradient-to-br from-emerald-50 to-green-100">
          {/* Rating Summary */}
          <Card className="mb-4 border-emerald-200 bg-gradient-to-br from-white to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-emerald-700">{averageRating.toFixed(1)}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-emerald-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-emerald-600">{reviews.length} reviews</p>
                </div>
                <Button 
                  onClick={() => setShowWriteReview(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
                >
                  Write Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Write Review Form */}
          {showWriteReview && (
            <Card className="mb-4 border-emerald-300 bg-gradient-to-br from-emerald-100 to-green-100">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-emerald-800">Write Your Review</h3>
                
                {/* Star Rating */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2 text-emerald-700">Rating</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="focus:outline-none transition-all duration-300"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-emerald-300 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2 text-emerald-700">Your Review</p>
                  <Textarea
                    placeholder="Share your experience with this product..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="border-emerald-200 focus:border-emerald-400 bg-white/80"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={submitReview} className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300">
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowWriteReview(false)}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-emerald-200 hover:border-emerald-400 transition-all duration-300 bg-gradient-to-br from-white to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-emerald-900">{review.user}</span>
                      {review.verified && (
                        <Badge className="bg-emerald-600 text-white text-xs border-emerald-700">Verified Purchase</Badge>
                      )}
                    </div>
                    <span className="text-sm text-emerald-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-emerald-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-emerald-800 mb-3">{review.comment}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-100 transition-all duration-300">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;
