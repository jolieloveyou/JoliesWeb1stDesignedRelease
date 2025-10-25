import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function AboutMe() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Animated Glow */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white mb-8"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}
          >
            About Me
          </motion.h2>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10"
          >
            <p 
              className="text-gray-300 leading-relaxed text-lg"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 500
              }}
            >
              Hey there! Welcome to my "Universe"!<br /><br />
              I'm a passionate newbie in software development, diving headfirst into Web development and Data analysis with big dreams for the next five years. Creating impactful solutions is my driving force and 'spiritual soul' mission! When I'm not coding, you'll catch me somewhere fun and adventurous. I'm thrilled to connect, collaborate, and bring ideas to life ;)
            </p>

            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-12 h-12 border-t border-l border-white/20" />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b border-r border-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
