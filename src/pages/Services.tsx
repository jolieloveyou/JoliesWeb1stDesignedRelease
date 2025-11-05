import { motion } from 'motion/react';
import { useState } from 'react';
import { BarChart3, TrendingUp, Database, Code, Smartphone, Zap, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import ServiceVideo from "../assets/video1.mp4";

export function Hero() {
  const videos = [ServiceVideo];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fadeVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F9F5EE]">
      <motion.video
        key={currentImageIndex}
        src={videos[currentImageIndex]}
        variants={fadeVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        muted
        playsInline
        onEnded={() => setCurrentImageIndex((prev) => (prev + 1) % videos.length)}
      />
    </section>
  );
}
