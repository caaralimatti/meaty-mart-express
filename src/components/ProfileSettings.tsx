
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Camera, MapPin, CreditCard, Gift, Clock } from "lucide-react";
import { toast } from "sonner";

interface ProfileSettingsProps {
  onClose: () => void;
}

const ProfileSettings = ({ onClose }: ProfileSettingsProps) => {
  const [userData, setUserData] = useState({
    fullName: "",
    profilePicture: "",
    preferredLanguage: "english",
    address: "",
    pincode: "",
    landmark: "",
    deliveryType: "instant",
    paymentPreference: "upi",
    loyaltyPoints: 250,
    referralCode: "QG" + Math.random().toString(36).substring(2, 8).toUpperCase()
  });

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('onboardingData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

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
        setUserData(prev => ({ ...prev, profilePicture: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('onboardingData', JSON.stringify(userData));
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">Profile Settings</h2>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      {/* Profile Picture & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-red-200">
                {userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 bg-red-600 rounded-full p-1 cursor-pointer hover:bg-red-700">
                <Camera className="w-3 h-3 text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={userData.fullName}
                onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
                className="border-red-200 focus:border-red-400"
              />
            </div>
          </div>

          <div>
            <Label>Preferred Language</Label>
            <RadioGroup 
              value={userData.preferredLanguage} 
              onValueChange={(value) => setUserData(prev => ({ ...prev, preferredLanguage: value }))}
              className="mt-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <div key={lang.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={lang.value} id={lang.value} />
                    <Label htmlFor={lang.value} className="text-sm cursor-pointer">
                      {lang.flag} {lang.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Delivery Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              value={userData.address}
              onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
              className="border-red-200 focus:border-red-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pincode">Pin Code</Label>
              <Input
                id="pincode"
                value={userData.pincode}
                onChange={(e) => setUserData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                className="border-red-200 focus:border-red-400"
                maxLength={6}
              />
            </div>
            <div>
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                value={userData.landmark}
                onChange={(e) => setUserData(prev => ({ ...prev, landmark: e.target.value }))}
                className="border-red-200 focus:border-red-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Delivery Type</Label>
            <RadioGroup 
              value={userData.deliveryType} 
              onValueChange={(value) => setUserData(prev => ({ ...prev, deliveryType: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instant" id="instant-pref" />
                <Label htmlFor="instant-pref" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>30-minute instant</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="scheduled-pref" />
                <Label htmlFor="scheduled-pref" className="flex items-center space-x-2">
                  <span>🕐</span>
                  <span>Scheduled delivery</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Payment Preference</Label>
            <RadioGroup 
              value={userData.paymentPreference} 
              onValueChange={(value) => setUserData(prev => ({ ...prev, paymentPreference: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi-pref" />
                <Label htmlFor="upi-pref">📱 UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod-pref" />
                <Label htmlFor="cod-pref">💵 Cash on Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card-pref" />
                <Label htmlFor="card-pref">💳 Card</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Loyalty & Referral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{userData.loyaltyPoints}</div>
              <div className="text-sm text-gray-600">Loyalty Points</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{userData.referralCode}</div>
              <div className="text-sm text-gray-600">Referral Code</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button onClick={handleSave} className="flex-1 bg-red-600 hover:bg-red-700">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
