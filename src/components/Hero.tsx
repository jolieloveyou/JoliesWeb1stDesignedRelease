import { motion } from 'motion/react';
import jolieImage from 'figma:asset/5aa006ee0d74e6bf12997219376b980afcfebcea.png';

export function Hero() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black">
      {/* Left Side - Profile Image with Black Mirror Effect */}
      <div className="w-full md:w-1/2 h-screen relative overflow-hidden">
        {/* Main Image */}
        <img
          src={jolieImage}
          alt="Jolie's portrait"
          className="w-full h-full object-cover"
        />
        
        {/* Glass/Mirror Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/80" />
        
        {/* Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-white to-transparent bg-[length:100%_4px] animate-pulse" />
        </div>
      </div>

      {/* Right Side - Black Mirror Text */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-black relative overflow-hidden">
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

        <div className="relative z-10 text-center px-8 flex flex-col justify-center h-full py-24">
          {/* Top Text - "Welcome to" */}
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative mb-8"
          >
            <div 
              className="text-white tracking-tight relative text-2xl md:text-3xl lg:text-4xl"
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
              className="absolute top-0 left-0 w-full text-white tracking-tight opacity-70 text-2xl md:text-3xl lg:text-4xl"
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
            className="relative mb-6"
          >
            <div 
              className="text-white relative text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
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
              className="absolute top-0 left-0 w-full text-white opacity-70 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
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

          {/* Slogan - "Think Bigger, Feel Deeper" */}
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
            <div 
              className="text-gray-400 relative text-xl md:text-2xl lg:text-3xl italic"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              <span className="relative inline-block">
                Think Bigger, Feel Deeper
              </span>
            </div>

            {/* Subtle underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeOut"
              }}
              className="mt-3 h-px w-48 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto origin-center"
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
