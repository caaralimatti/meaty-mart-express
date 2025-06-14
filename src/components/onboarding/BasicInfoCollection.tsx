
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Camera } from "lucide-react";
import { toast } from "sonner";

interface BasicInfoCollectionProps {
  onComplete: (data: {
    fullName: string;
    profilePicture?: string;
    preferredLanguage: string;
  }) => void;
  onBack: () => void;
}

const BasicInfoCollection = ({ onComplete, onBack }: BasicInfoCollectionProps) => {
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [preferredLanguage, setPreferredLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { value: "english", label: "English", flag: "🇬🇧" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
    { value: "marathi", label: "मराठी (Marathi)", flag: "🇮🇳" },
    { value: "hindi", label: "हिंदी (Hindi)", flag: "🇮🇳" }
  ];

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    onComplete({
      fullName: fullName.trim(),
      profilePicture,
      preferredLanguage
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-700">Complete Your Profile</CardTitle>
          <p className="text-gray-600">Help us personalize your experience</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <Label>Profile Picture (Optional)</Label>
            <div className="mt-2 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-red-200">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <label htmlFor="profile-upload" className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2 cursor-pointer hover:bg-red-700 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-red-200 focus:border-red-400"
            />
          </div>

          {/* Language Preference */}
          <div className="space-y-3">
            <Label>Preferred Language</Label>
            <RadioGroup value={preferredLanguage} onValueChange={setPreferredLanguage}>
              {languages.map((lang) => (
                <div key={lang.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.value} id={lang.value} />
                  <Label htmlFor={lang.value} className="flex items-center space-x-2 cursor-pointer">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleContinue}
              disabled={isLoading || !fullName.trim()}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Setting up..." : "Continue"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoCollection;
