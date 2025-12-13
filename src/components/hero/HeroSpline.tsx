import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load Spline for performance
const Spline = lazy(() => import("@splinetool/react-spline"));

// PASTE YOUR SPLINE SCENE URL HERE
const SPLINE_SCENE_URL = "PASTE_SPLINE_URL_HERE";

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Animated loading rings */}
        <div className="w-32 h-32 rounded-full border-2 border-primary/20 animate-ping" />
        <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-4 w-24 h-24 rounded-full border border-accent/30 animate-pulse" />
      </div>
    </div>
  );
}

export function HeroSpline() {
  const isPlaceholder = SPLINE_SCENE_URL === "PASTE_SPLINE_URL_HERE";

  if (isPlaceholder) {
    return (
      <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
        {/* Placeholder 3D-style visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main orb */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl animate-pulse-glow" />
            
            {/* Inner orb */}
            <motion.div
              animate={{ 
                rotateY: 360,
                rotateX: 15,
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-8 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent shadow-2xl shadow-primary/50"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
            
            {/* Orbital rings */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-4 rounded-full border border-primary/30" style={{ transform: "rotateX(60deg)" }} />
            </motion.div>
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-2 rounded-full border border-accent/20" style={{ transform: "rotateX(75deg) rotateY(20deg)" }} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Suspense fallback={<SplineLoader />}>
        <Spline
          scene={SPLINE_SCENE_URL}
          className="w-full h-full"
        />
      </Suspense>
      
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent pointer-events-none lg:hidden" />
    </div>
  );
}
