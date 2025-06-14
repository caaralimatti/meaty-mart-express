
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Share2, Camera, Star, Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface SocialSharingProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const SocialSharing = ({ isOpen, onClose, productName }: SocialSharingProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [shareContent, setShareContent] = useState("");
  const [rating, setRating] = useState(0);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const socialPlatforms = [
    { name: "WhatsApp", color: "bg-green-500", emoji: "📱" },
    { name: "Instagram", color: "bg-pink-500", emoji: "📸" },
    { name: "Facebook", color: "bg-blue-600", emoji: "👍" },
    { name: "Twitter", color: "bg-blue-400", emoji: "🐦" }
  ];

  const shareTemplates = [
    "Just ordered the most amazing goat meat from QuickGoat! Fresh, quality, and delivered in 30 minutes! 🥩✨ #QuickGoat #FreshMeat",
    "Sunday special cooking with premium goat cuts from QuickGoat. The quality is unmatched! 👨‍🍳🔥 #CookingWithQuickGoat",
    "Family dinner sorted with QuickGoat's fresh goat meat delivery. Best decision ever! 🏠❤️ #FamilyTime #QuickGoat",
    "Hosting a dinner party? QuickGoat's bulk ordering saved my day! Fresh meat delivered right on time! 🎉🥳 #PartyTime"
  ];

  const handleShare = () => {
    if (!selectedPlatform || !shareContent) {
      toast.error("Please select a platform and add content");
      return;
    }

    const shareText = shareContent + (productName ? ` featuring ${productName}` : '');
    
    switch (selectedPlatform) {
      case "WhatsApp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case "Instagram":
        toast.success("Copy the text and share it on Instagram with your photo!");
        navigator.clipboard.writeText(shareText);
        break;
      case "Facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case "Twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
    }

    toast.success("Shared successfully! Thanks for spreading the word!");
    onClose();
  };

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    toast.success("Photo uploaded! It will appear in your social post.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl text-blue-700">Share Your Experience</CardTitle>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Rate Your Experience */}
          <div>
            <h3 className="font-semibold mb-3">Rate Your Experience</h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star 
                    className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                </Button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-gray-600 mt-2">
                {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good!" : rating === 3 ? "Good!" : rating === 2 ? "Fair" : "Poor"}
              </p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <h3 className="font-semibold mb-3">Add a Photo</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {photoUploaded ? (
                <div className="space-y-2">
                  <Camera className="w-12 h-12 mx-auto text-green-600" />
                  <p className="text-green-600 font-medium">Photo uploaded!</p>
                  <Button variant="outline" size="sm" onClick={() => setPhotoUploaded(false)}>
                    Change Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Camera className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="text-gray-600">Upload a photo of your delicious meal</p>
                  <Button onClick={handlePhotoUpload} className="bg-blue-600 hover:bg-blue-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <h3 className="font-semibold mb-3">Choose Platform</h3>
            <div className="grid grid-cols-2 gap-2">
              {socialPlatforms.map((platform) => (
                <Button
                  key={platform.name}
                  variant={selectedPlatform === platform.name ? "default" : "outline"}
                  onClick={() => setSelectedPlatform(platform.name)}
                  className={`p-3 h-auto ${selectedPlatform === platform.name ? platform.color : ''}`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg">{platform.emoji}</span>
                    <span className="text-sm">{platform.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Content Templates */}
          <div>
            <h3 className="font-semibold mb-3">Share Templates</h3>
            <div className="space-y-2">
              {shareTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => setShareContent(template)}
                  className="w-full text-left h-auto p-3 text-sm"
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <h3 className="font-semibold mb-3">Your Message</h3>
            <Textarea
              placeholder="Write your own message or customize a template..."
              value={shareContent}
              onChange={(e) => setShareContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{shareContent.length} characters</span>
              <span>Max: 280</span>
            </div>
          </div>

          {/* Hashtag Suggestions */}
          <div>
            <h3 className="font-semibold mb-3">Popular Hashtags</h3>
            <div className="flex flex-wrap gap-1">
              {["#QuickGoat", "#FreshMeat", "#GoatMeat", "#FastDelivery", "#QualityFood", "#Halal", "#FarmFresh"].map((hashtag) => (
                <Button
                  key={hashtag}
                  variant="outline"
                  size="sm"
                  onClick={() => setShareContent(prev => prev + " " + hashtag)}
                  className="text-xs"
                >
                  {hashtag}
                </Button>
              ))}
            </div>
          </div>

          {/* Incentives */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-green-700">Earn Rewards!</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Get 50 loyalty points for sharing</li>
                <li>• Extra 25 points if friends like/comment</li>
                <li>• Monthly best post wins ₹500 voucher</li>
              </ul>
            </CardContent>
          </Card>

          {/* Share Button */}
          <Button
            onClick={handleShare}
            disabled={!selectedPlatform || !shareContent}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSharing;
