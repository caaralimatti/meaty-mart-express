
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-charcoal-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Goat Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
            <img 
              src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png" 
              alt="QuickGoat Logo" 
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl font-bold text-off-white mb-2">
          Quick<span className="text-vibrant-orange">Goat</span>
        </h1>
        <p className="text-off-white/80 text-lg mb-8">Premium Meat & Livestock Platform</p>
        
        {/* Loading Progress */}
        <div className="w-64 h-2 bg-dark-slate rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-vibrant-orange rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-off-white/60 text-sm mt-4">Loading {progress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
