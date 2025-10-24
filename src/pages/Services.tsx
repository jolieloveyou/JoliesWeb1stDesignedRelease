import { motion } from 'motion/react';
import { Brain, Heart, Users, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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
              className="text-white mb-6"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
            >
              My Services
            </h1>
            <p 
              className="text-gray-400 max-w-2xl mx-auto"
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
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 mb-6 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 
                      className="text-white mb-4"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 600
                      }}
                    >
                      {service.title}
                    </h3>

                    <p 
                      className="text-gray-400 mb-6"
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
                          className="flex items-center gap-2 text-gray-300 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    />
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-white mb-6"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700
              }}
            >
              Ready to Begin Your Journey?
            </h2>
            <p 
              className="text-gray-400 mb-8"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Schedule a consultation to discuss which service is right for you
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-full transition-all hover:bg-gray-200"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 500
              }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
