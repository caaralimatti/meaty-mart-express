
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show logo first
    setTimeout(() => setShowLogo(true), 200);
    // Show text after logo animation
    setTimeout(() => setShowText(true), 800);

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
        {/* Company Logo */}
        <div className={`mb-8 flex justify-center transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative animate-logo-bounce">
            <img
              src="/lovable-uploads/8f9753cb-0f1b-4875-8ffd-8cf77fcf2eff.png"
              alt="QuickGoat Logo"
              className="w-full h-full object-contain animate-logo-rotate"
            />
            <div className="absolute inset-0 animate-logo-glow"></div>
          </div>
        </div>
        
        {/* Animated Brand Name */}
        <div className={`transition-all duration-800 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-off-white mb-2 animate-text-slide">
            Quick<span className="text-vibrant-orange animate-text-glow">Goat</span>
          </h1>
          <p className="text-off-white/80 text-lg mb-8 animate-fade-in-up">Premium Meat & Livestock Platform</p>
        </div>
        
        {/* Animated Loading Progress */}
        <div className={`transition-all duration-500 delay-700 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-64 h-2 bg-dark-slate rounded-full overflow-hidden mx-auto relative">
            <div 
              className="h-full bg-gradient-to-r from-vibrant-orange to-orange-400 rounded-full transition-all duration-300 ease-out relative animate-progress-shine"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 w-4 h-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-off-white/60 text-sm mt-4 animate-bounce-subtle">Loading {progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
