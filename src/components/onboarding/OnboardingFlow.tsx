
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import PhoneAuth from "./PhoneAuth";
import BasicInfoCollection from "./BasicInfoCollection";
import DeliveryPreferences from "./DeliveryPreferences";
import { toast } from "sonner";

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface UserData {
  fullName?: string;
  profilePicture?: string;
  preferredLanguage?: string;
  address?: string;
  pincode?: string;
  landmark?: string;
  deliveryType?: string;
  paymentPreference?: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<"welcome" | "auth" | "info" | "preferences">("welcome");
  const [userData, setUserData] = useState<UserData>({});

  const handleAuthSuccess = () => {
    setCurrentStep("info");
  };

  const handleInfoComplete = (data: { fullName: string; profilePicture?: string; preferredLanguage: string }) => {
    setUserData(prev => ({ ...prev, ...data }));
    setCurrentStep("preferences");
  };

  const handlePreferencesComplete = (data: {
    address: string;
    pincode: string;
    landmark: string;
    deliveryType: string;
    paymentPreference: string;
  }) => {
    const finalUserData = { ...userData, ...data };
    console.log("Onboarding completed with data:", finalUserData);
    
    // Save to localStorage or send to backend
    localStorage.setItem('onboardingData', JSON.stringify(finalUserData));
    
    toast.success("Welcome to QuickGoat! 🎉");
    onComplete();
  };

  const handleStepBack = () => {
    switch (currentStep) {
      case "auth":
        setCurrentStep("welcome");
        break;
      case "info":
        setCurrentStep("auth");
        break;
      case "preferences":
        setCurrentStep("info");
        break;
    }
  };

  switch (currentStep) {
    case "welcome":
      return <WelcomeScreen onGetStarted={() => setCurrentStep("auth")} />;
    
    case "auth":
      return <PhoneAuth onAuthSuccess={handleAuthSuccess} onBack={handleStepBack} />;
    
    case "info":
      return <BasicInfoCollection onComplete={handleInfoComplete} onBack={handleStepBack} />;
    
    case "preferences":
      return <DeliveryPreferences onComplete={handlePreferencesComplete} onBack={handleStepBack} />;
    
    default:
      return <WelcomeScreen onGetStarted={() => setCurrentStep("auth")} />;
  }
};

export default OnboardingFlow;
