
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
        {/* Animated Goat Logo */}
        <div className={`mb-8 flex justify-center transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative animate-pulse">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-vibrant-orange"
              fill="currentColor"
            >
              {/* Goat Head */}
              <ellipse cx="50" cy="40" rx="25" ry="20" />
              
              {/* Horns */}
              <path d="M30 25 L25 15 L35 20 Z" />
              <path d="M70 25 L75 15 L65 20 Z" />
              
              {/* Eyes */}
              <circle cx="42" cy="38" r="3" fill="#1A1D21" />
              <circle cx="58" cy="38" r="3" fill="#1A1D21" />
              
              {/* Nose */}
              <ellipse cx="50" cy="45" rx="4" ry="2" fill="#1A1D21" />
              
              {/* Beard */}
              <path d="M50 55 Q48 65 45 70 Q50 72 55 70 Q52 65 50 55 Z" />
              
              {/* Body */}
              <ellipse cx="50" cy="70" rx="15" ry="12" />
              
              {/* Legs */}
              <rect x="38" y="78" width="4" height="12" rx="2" />
              <rect x="48" y="78" width="4" height="12" rx="2" />
              <rect x="58" y="78" width="4" height="12" rx="2" />
            </svg>
          </div>
        </div>
        
        {/* Animated Brand Name */}
        <div className={`transition-all duration-800 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-off-white mb-2 animate-fade-in">
            Quick<span className="text-vibrant-orange animate-pulse">Goat</span>
          </h1>
          <p className="text-off-white/80 text-lg mb-8 animate-fade-in">Premium Meat & Livestock Platform</p>
        </div>
        
        {/* Animated Loading Progress */}
        <div className={`transition-all duration-500 delay-700 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-64 h-2 bg-dark-slate rounded-full overflow-hidden mx-auto relative">
            <div 
              className="h-full bg-gradient-to-r from-vibrant-orange to-orange-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 w-4 h-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-off-white/60 text-sm mt-4">Loading {progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
