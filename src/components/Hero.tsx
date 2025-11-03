import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { useState, useEffect } from 'react';
import jolieImage1 from 'figma:asset/5aa006ee0d74e6bf12997219376b980afcfebcea.png';
import jolieImage2 from 'figma:asset/402a3ff024c627e238e91f49ad43d9fc8cd4d033.png';
import jolieImage3 from 'figma:asset/ec363a74c14c70c1c680416cb060c8b8cf94e902.png';
import jolieImage4 from 'figma:asset/e0c0e6a11d7353365bd87b94983380edbb69a2c8.png';

export function Hero() {
  const images = [jolieImage1, jolieImage2, jolieImage3, jolieImage4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  // 🔁 Auto-slide every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentImageIndex, images.length]);

  const paginate = (newDirection: number) => {
    const newIndex = (currentImageIndex + newDirection + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) paginate(1);
    else if (swipe > swipeConfidenceThreshold) paginate(-1);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const fadeVariants = {
    enter: (direction: number) => ({ opacity: 0, scale: 0.95 }),
    center: { opacity: 1, scale: 1 },
    exit: (direction: number) => ({ opacity: 0, scale: 1.05 }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FAEBD7] to-[#FAF0E6] px-4 md:px-8 py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Hero Text Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <div 
              className="text-[#6D4C41] tracking-tight text-2xl md:text-3xl lg:text-4xl"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300,
                letterSpacing: '0.02em'
              }}
            >
              Welcome to
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <div 
              className="text-[#3E2723] text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.03em',
              }}
            >
              <span className="relative inline-block bg-gradient-to-r from-[#8B7355] via-[#A0826D] to-[#8B7355] bg-clip-text text-transparent">
                Jolie's Universe
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div 
              className="text-[#8B7355] text-lg md:text-xl lg:text-2xl italic"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              "Think Bigger, Feel Deeper"
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="mt-4 h-px w-48 md:w-64 bg-gradient-to-r from-transparent via-[#A0826D] to-transparent mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Image Slider Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl bg-[#E8D7C3]/30 border border-[#D2B48C]/30">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Jolie's portfolio ${currentImageIndex + 1}`}
                custom={direction}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.8, ease: "easeInOut" },
                  scale: { duration: 0.8, ease: "easeInOut" }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/20 via-transparent to-transparent pointer-events-none" />

            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newDirection = index > currentImageIndex ? 1 : -1;
                      setCurrentImageIndex(index);
                      setPage([page + newDirection, newDirection]);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentImageIndex 
                        ? 'bg-[#8B7355] w-8 h-3' 
                        : 'bg-[#D2B48C] hover:bg-[#A0826D] w-3 h-3'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#8B7355]/40" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#8B7355]/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
