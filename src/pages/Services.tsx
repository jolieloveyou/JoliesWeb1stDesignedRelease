import { motion } from 'motion/react';
import { Brain, Heart, Users, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';

const services = [
  {
    icon: Brain,
    title: 'Individual Therapy',
    description: 'One-on-one sessions tailored to your unique mental health needs and goals.',
    features: ['Cognitive Behavioral Therapy', 'Mindfulness-Based Therapy', 'Solution-Focused Therapy']
  },
  {
    icon: Heart,
    title: 'Couples Counseling',
    description: 'Strengthen your relationship through guided communication and understanding.',
    features: ['Relationship Building', 'Conflict Resolution', 'Emotional Intelligence']
  },
  {
    icon: Users,
    title: 'Group Sessions',
    description: 'Connect with others facing similar challenges in a supportive environment.',
    features: ['Peer Support', 'Shared Learning', 'Community Building']
  },
  {
    icon: Sparkles,
    title: 'Wellness Coaching',
    description: 'Holistic guidance for achieving balance in your personal and professional life.',
    features: ['Life Balance', 'Stress Management', 'Personal Growth']
  }
];

export function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FAEBD7] to-[#FAF0E6]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(139,115,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl"
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
                letterSpacing: '0.02em'
              }}
            >
              My Services
            </h1>
            <p 
              className="text-[#8B7355] max-w-2xl mx-auto"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Professional mental health services designed to support your journey toward wellness
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
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
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-full bg-[#E8D7C3]/50 flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-[#8B7355]" />
                    </motion.div>

                    {/* Content */}
                    <h3 
                      className="text-[#3E2723] mb-4 text-xl md:text-2xl lg:text-3xl"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 600
                      }}
                    >
                      {service.title}
                    </h3>

                    <p 
                      className="text-[#6D4C41] mb-6"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                          className="flex items-center gap-2 text-[#8B7355] text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#A0826D]" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#D2B48C]/0 to-[#D2B48C]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 border-t border-r border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b border-l border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Book Consultation CTA Section */}
      <section className="py-24 border-t border-[#D2B48C]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-[#3E2723] mb-6 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700
              }}
            >
              Ready to Begin Your Journey?
            </h2>
            <p 
              className="text-[#8B7355] mb-8 text-lg"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Schedule a consultation to discuss which service is right for you
            </p>
            
            {/* Book Consultation Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="px-10 py-6 bg-[#8B7355] text-[#FAF0E6] hover:bg-[#A0826D] rounded-full shadow-lg text-lg"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontWeight: 500
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-[#A0826D] text-sm"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              First consultation is free • Flexible scheduling • Confidential
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
