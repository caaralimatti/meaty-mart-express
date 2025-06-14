
import { useState } from "react";
import { toast } from "sonner";
import WelcomeScreen from "./WelcomeScreen";
import PhoneAuth from "./PhoneAuth";
import BasicInfoCollection from "./BasicInfoCollection";
import DeliveryPreferences from "./DeliveryPreferences";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = "welcome" | "auth" | "info" | "preferences";

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [userData, setUserData] = useState<any>({});

  const handleWelcomeNext = () => {
    setCurrentStep("auth");
  };

  const handleAuthSuccess = () => {
    setCurrentStep("info");
  };

  const handleInfoComplete = (data: any) => {
    setUserData(prev => ({ ...prev, ...data }));
    setCurrentStep("preferences");
  };

  const handlePreferencesComplete = (data: any) => {
    const finalUserData = { ...userData, ...data };
    localStorage.setItem('onboardingData', JSON.stringify(finalUserData));
    toast.success("Welcome to QuickGoat! 🎉", {
      description: "Your account has been set up successfully!"
    });
    onComplete();
  };

  const handleBack = () => {
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
      return <WelcomeScreen onNext={handleWelcomeNext} />;
    
    case "auth":
      return <PhoneAuth onNext={handleAuthSuccess} onBack={handleBack} />;
    
    case "info":
      return <BasicInfoCollection onNext={handleInfoComplete} onBack={handleBack} />;
    
    case "preferences":
      return <DeliveryPreferences onComplete={handlePreferencesComplete} onBack={handleBack} />;
    
    default:
      return <WelcomeScreen onNext={handleWelcomeNext} />;
  }
};

export default OnboardingFlow;
