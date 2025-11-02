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

      {/* Multiple Animated Glows */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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
            className="text-white mb-4 text-4xl md:text-5xl lg:text-6xl"
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
            className="text-gray-400"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontWeight: 300
            }}
          >
            Let's connect and collaborate
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 mb-6 rounded-full bg-white/10 flex items-center justify-center mx-auto"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 
                    className="text-white mb-2 flex items-center justify-center gap-2 text-xl md:text-2xl"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    {contact.label}
                    {contact.label === 'LinkedIn' && (
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </h3>
                  <p 
                    className="text-gray-400 text-sm mb-2"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    {contact.description}
                  </p>
                  <p 
                    className="text-gray-300 break-all"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 400
                    }}
                  >
                    {contact.value}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-white/0 group-hover:border-white/30 transition-all" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-white/0 group-hover:border-white/30 transition-all" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
