import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import jolieImage1 from 'figma:asset/5aa006ee0d74e6bf12997219376b980afcfebcea.png';
import jolieImage2 from 'figma:asset/402a3ff024c627e238e91f49ad43d9fc8cd4d033.png';
import jolieImage3 from 'figma:asset/ec363a74c14c70c1c680416cb060c8b8cf94e902.png';
import jolieImage4 from 'figma:asset/e0c0e6a11d7353365bd87b94983380edbb69a2c8.png';

export function Hero() {
  /* 
   * PORTFOLIO IMAGE SLIDER
   * Four images automatically slide every 5 seconds
   * - Navigation arrows for manual control
   * - Dots indicator at the bottom
   * - Smooth transitions with Black Mirror effects
   */
  const images = [
    jolieImage1,
    jolieImage2,
    jolieImage3,
    jolieImage4,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black px-4 md:px-8 gap-8 md:gap-12">
      {/* Left Side - Profile Image Carousel with Black Mirror Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full md:w-auto max-w-sm md:max-w-md lg:max-w-lg relative"
      >
        <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
          {/* Image Carousel */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Jolie's portrait ${currentImageIndex + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {/* Glass/Mirror Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/30 pointer-events-none" />
          
          {/* Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-white to-transparent bg-[length:100%_4px] animate-pulse" />
          </div>

          {/* Navigation Arrows - Only show if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Right Side - Black Mirror Text */}
      <div className="w-full md:w-auto md:flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Animated Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 text-center px-4 md:px-8 flex flex-col justify-center py-12 md:py-24">
          {/* Top Text - "Welcome to" */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative mb-4 md:mb-8"
          >
            <div 
              className="text-white tracking-tight relative text-xl md:text-2xl lg:text-3xl"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                fontWeight: 200,
                letterSpacing: '-0.02em'
              }}
            >
              <span className="relative inline-block">
                Welcome to
              </span>
            </div>
            
            {/* Glitch layers */}
            <motion.div
              animate={{
                x: [0, -2, 2, 0],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="absolute top-0 left-0 w-full text-white tracking-tight opacity-70 text-xl md:text-2xl lg:text-3xl"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                fontWeight: 200,
                letterSpacing: '-0.02em',
                textShadow: '-2px 0 #ff00de',
                clipPath: 'inset(0 0 0 0)'
              }}
            >
              Welcome to
            </motion.div>
          </motion.div>

          {/* Middle Text - "Jolie's Universe" */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative mb-4 md:mb-6"
          >
            <div 
              className="text-white relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              <span className="relative inline-block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Jolie's Universe
              </span>
            </div>
            
            {/* Glitch layers for bottom text */}
            <motion.div
              animate={{
                x: [0, -2, 2, 0],
                opacity: [0, 0.7, 0.7, 0]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 5
              }}
              className="absolute top-0 left-0 w-full text-white opacity-70 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                textShadow: '-2px 0 #ff00de',
                clipPath: 'inset(0 0 0 0)'
              }}
            >
              Jolie's Universe
            </motion.div>
          </motion.div>

          {/* Slogan - "Think Bigger, Feel Deeper" with Flash Animation */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative"
          >
            <motion.div 
              animate={{
                opacity: [1, 0.4, 1, 0.4, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="text-gray-400 relative text-base md:text-lg lg:text-xl italic"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              <span className="relative inline-block">
                "{" "}Think Bigger, Feel Deeper{" "}"
              </span>
            </motion.div>

            {/* Subtle underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeOut"
              }}
              className="mt-3 h-px w-40 md:w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto origin-center"
            />
          </motion.div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20" />
      </div>
    </div>
  );
}
