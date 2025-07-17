
import { useState } from "react";
import { toast } from "sonner";
import WelcomeScreen from "./WelcomeScreen";
import { CustomerOnboarding } from "../customer/CustomerOnboarding";
import DeliveryPreferences from "./DeliveryPreferences";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = "welcome" | "auth" | "preferences";

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [userData, setUserData] = useState<any>({});

  const handleWelcomeNext = () => {
    setCurrentStep("auth");
  };

  const handleAuthSuccess = () => {
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
      case "preferences":
        setCurrentStep("auth");
        break;
    }
  };

  switch (currentStep) {
    case "welcome":
      return <WelcomeScreen onNext={handleWelcomeNext} />;
    
    case "auth":
      return <CustomerOnboarding onComplete={handleAuthSuccess} />;
    
    case "preferences":
      return <DeliveryPreferences onComplete={handlePreferencesComplete} onBack={handleBack} />;
    
    default:
      return <WelcomeScreen onNext={handleWelcomeNext} />;
  }
};

export default OnboardingFlow;
