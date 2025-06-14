
import { useState, useEffect } from 'react';

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingData = localStorage.getItem('onboardingData');
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    if (onboardingData && hasCompletedOnboarding === 'true') {
      setIsOnboardingComplete(true);
    }
    
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setIsOnboardingComplete(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingData');
    localStorage.removeItem('hasCompletedOnboarding');
    setIsOnboardingComplete(false);
  };

  return {
    isOnboardingComplete,
    isLoading,
    completeOnboarding,
    resetOnboarding
  };
};
