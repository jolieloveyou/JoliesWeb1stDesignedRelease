import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import jolieImage1 from "../assets/thumbnail (1).mp4";

export function Hero() {
  const images = [jolieImage1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔁 Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const fadeVariants = {
    enter: { opacity: 0, scale: 1.02 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F9F5EE]">
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Jolie visual"
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Text Layer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="relative z-10 text-center text-white px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-wide drop-shadow-lg"
        >
          Jolie's Universe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-4 text-lg md:text-xl italic text-[#F5DEB3] drop-shadow-md"
        >
          "Think Bigger, Feel Deeper"
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-6 mx-auto h-[2px] w-40 bg-gradient-to-r from-transparent via-[#EED9B7] to-transparent"
        />
      </motion.div>

      {/* Dots Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`transition-all rounded-full ${
              i === currentImageIndex
                ? "bg-[#EED9B7] w-6 h-3"
                : "bg-white/40 hover:bg-white/70 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
