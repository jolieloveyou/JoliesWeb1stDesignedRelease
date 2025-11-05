import { motion } from "framer-motion";
import { useState } from "react";
import { 
  BarChart3, TrendingUp, Database, Code, Smartphone, Zap, Calendar 
} from "lucide-react";
import { Button } from "../components/ui/button";
import ServiceVideo from "../assets/video1.mp4";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Calendar } from "lucide-react";
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
      {/* 🔁 Video nền */}
      <motion.video
        key={currentImageIndex}
        src={videos[currentImageIndex]}
        variants={fadeVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-[85vh] object-cover object-center"
        autoPlay
        muted
        loop   // ✅ tự repeat
        playsInline
      />

      {/* 🔤 Chữ đè lên video */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[#FAF0E6] drop-shadow-lg text-5xl md:text-6xl lg:text-7xl font-bold"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          My Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 text-[#F9F5EE]/90 text-lg md:text-xl max-w-2xl mx-auto"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontWeight: 300,
          }}
        >
          Transform your data into insights and build stunning web applications that bring your vision to life.
        </motion.p>

        {/* nút CTA đè lên video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-10"
        >
          <Button
            size="lg"
            className="px-10 py-6 bg-[#8B7355] text-[#FAF0E6] hover:bg-[#A0826D] rounded-full shadow-lg text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Consultation
          </Button>
        </motion.div>
      </div>

      {/* overlay làm mờ video để chữ rõ hơn */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}

const dataAnalysisServices = [
  {
    icon: BarChart3,
    title: "Statistical Analysis",
    description:
      "Advanced statistical methods to uncover patterns and trends in your data.",
    features: ["Regression Analysis", "Hypothesis Testing", "Time Series Analysis"],
  },
  {
    icon: TrendingUp,
    title: "Data Visualization",
    description:
      "Transform complex data into clear, interactive visualizations and dashboards.",
    features: ["Interactive Dashboards", "Custom Charts", "Business Intelligence"],
  },
  {
    icon: Database,
    title: "Predictive Modeling",
    description:
      "Build machine learning models to forecast trends and make data-driven predictions.",
    features: ["Machine Learning", "Forecasting", "Pattern Recognition"],
  },
];

const webDevServices = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Create beautiful, responsive user interfaces with modern frameworks.",
    features: ["React & TypeScript", "Responsive Design", "UI/UX Implementation"],
  },
  {
    icon: Smartphone,
    title: "Full-Stack Applications",
    description:
      "Build complete web applications from database to user interface.",
    features: ["API Development", "Database Design", "Cloud Deployment"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimize your web applications for speed, SEO, and user experience.",
    features: ["Code Optimization", "SEO Enhancement", "Performance Audits"],
  },
];

export function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FAEBD7] to-[#FAF0E6]">
      {/* ✅ Thêm Hero có video */}
      <Hero />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139,115,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1
              className="text-[#3E2723] mb-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              My Services
            </h1>
            <p
              className="text-[#8B7355] max-w-2xl mx-auto text-lg"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300,
              }}
            >
              Transform your data into insights and build stunning web applications that bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section id="data-analysis" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-[#3E2723] mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
              }}
            >
              Data Analysis
            </h2>
            <p
              className="text-[#8B7355] max-w-2xl mx-auto"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300,
              }}
            >
              Turn complex data into actionable insights with advanced analytics and visualization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataAnalysisServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative bg-[#FAF0E6]/60 backdrop-blur-sm rounded-lg p-8 border border-[#D2B48C]/30 hover:border-[#8B7355]/50 hover:shadow-xl transition-all duration-300 h-full">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-full bg-[#E8D7C3]/50 flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-[#8B7355]" />
                    </motion.div>

                    <h3
                      className="text-[#3E2723] mb-4 text-xl md:text-2xl"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 600,
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-[#6D4C41] mb-6"
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + i * 0.1,
                          }}
                          className="flex items-center gap-2 text-[#8B7355] text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#A0826D]" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Web Development Section */}
      <section id="web-development" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-[#3E2723] mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
              }}
            >
              Web Development
            </h2>
            <p
              className="text-[#8B7355] max-w-2xl mx-auto"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300,
              }}
            >
              Build responsive, modern web applications with cutting-edge technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {webDevServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative bg-[#FAF0E6]/60 backdrop-blur-sm rounded-lg p-8 border border-[#D2B48C]/30 hover:border-[#8B7355]/50 hover:shadow-xl transition-all duration-300 h-full">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-full bg-[#E8D7C3]/50 flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-[#8B7355]" />
                    </motion.div>

                    <h3
                      className="text-[#3E2723] mb-4 text-xl md:text-2xl"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 600,
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-[#6D4C41] mb-6"
                      style={{
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + i * 0.1,
                          }}
                          className="flex items-center gap-2 text-[#8B7355] text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#A0826D]" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Book Consultation CTA */}
      <section className="py-24 border-t border-[#D2B48C]/30 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#3E2723] mb-6 text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          Ready to Begin Your Journey?
        </motion.h2>

        <p className="text-[#8B7355] mb-8 text-lg font-light">
          Schedule a consultation to discuss which service is right for you.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="px-10 py-6 bg-[#8B7355] text-[#FAF0E6] hover:bg-[#A0826D] rounded-full shadow-lg text-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Consultation
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
