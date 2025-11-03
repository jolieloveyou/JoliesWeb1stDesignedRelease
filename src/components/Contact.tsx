import { motion } from 'motion/react';
import { Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

const contacts = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'jolie0801',
    link: 'https://www.linkedin.com/in/jolie0801/',
    description: 'Connect with me professionally'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'jolieworks81@gmail.com',
    link: 'mailto:jolieworks81@gmail.com',
    description: 'Send me a message'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+84 945 412 510',
    link: 'tel:+84945412510',
    description: 'For urgent meetings'
  }
];

export function Contact() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#FAF0E6] via-[#F5F5DC] to-[#FAEBD7] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" 
          style={{
            backgroundImage: 'linear-gradient(rgba(139,115,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Multiple Animated Glows */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#3E2723] mb-4 text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#8B7355] text-lg"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontWeight: 300
            }}
          >
            Let's connect and create something amazing together
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.link}
                target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-[#FAF0E6]/60 backdrop-blur-sm rounded-lg p-6 border border-[#D2B48C]/30 hover:border-[#8B7355]/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-full bg-[#E8D7C3]/50 flex items-center justify-center mb-4"
                >
                  <Icon className="w-7 h-7 text-[#8B7355]" />
                </motion.div>

                {/* Label */}
                <h3 
                  className="text-[#3E2723] mb-2 text-xl"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 600
                  }}
                >
                  {contact.label}
                </h3>

                {/* Value */}
                <p 
                  className="text-[#6D4C41] mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 400
                  }}
                >
                  {contact.value}
                </p>

                {/* Description */}
                <p 
                  className="text-[#A0826D] text-sm mb-3"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  {contact.description}
                </p>

                {/* Link Indicator */}
                <div className="flex items-center gap-2 text-[#8B7355] group-hover:text-[#A0826D] transition-colors">
                  <span 
                    className="text-sm"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 500
                    }}
                  >
                    Connect
                  </span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#D2B48C]/0 to-[#D2B48C]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />

                {/* Corner Accents */}
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
