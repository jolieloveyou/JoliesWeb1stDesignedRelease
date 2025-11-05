import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ChatBot } from './ChatBot';
import { ConsultationBooking } from './ConsultationBooking';
import { Button } from './ui/button';

const navigation = [
  { name: 'Portfolio', href: '/' },
  { name: 'PsyEdu', href: '/psyedu' },
  { 
    name: 'My Service', 
    href: '/services',
    dropdown: [
      { name: 'Data Analysis', href: '/services#data-analysis' },
      { name: 'Web Development', href: '/services#web-development' }
    ]
  },
  { 
    name: 'My Product', 
    href: '/products',
    dropdown: [
      { name: 'Ebook', href: '/products#ebook' },
      { name: 'Digital Product', href: '/products#digital-product' }
    ]
  },
];

interface LayoutProps {
  children: React.ReactNode;
  isRegistered: boolean;
  userEmail: string;
  userName: string;
  onRegister: (email: string, name: string) => void;
  onBooking: (name: string, email: string, message: string, wantsUpdates: boolean) => void;
}

export function Layout({ children, isRegistered, userEmail, userName, onRegister, onBooking }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FAEBD7] to-[#FAF0E6] text-[#3E2723]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF0E6]/95 backdrop-blur-md border-b border-[#D2B48C]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-[#8B7355] tracking-tight text-xl"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 700,
                  letterSpacing: '0.08em'
                }}
              >
                JOLIE
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.dropdown && item.dropdown.some(sub => location.pathname + location.hash === sub.href));
                
                if (item.dropdown) {
                  return (
                    <div 
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <motion.div
                        className={`flex items-center gap-1 text-sm tracking-wide transition-colors cursor-pointer ${
                          isActive ? 'text-[#8B7355]' : 'text-[#A0826D] hover:text-[#8B7355]'
                        }`}
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          fontWeight: isActive ? 500 : 400
                        }}
                        whileHover={{ y: -2 }}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </motion.div>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#8B7355]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <AnimatePresence>
                        {openDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 left-0 bg-[#FAF0E6] border border-[#D2B48C]/30 rounded-lg shadow-lg overflow-hidden min-w-[200px]"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block px-4 py-3 text-sm text-[#A0826D] hover:text-[#8B7355] hover:bg-[#E8D7C3]/30 transition-colors"
                                style={{
                                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                                  fontWeight: 400
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative"
                  >
                    <motion.span
                      className={`text-sm tracking-wide transition-colors ${
                        isActive ? 'text-[#8B7355]' : 'text-[#A0826D] hover:text-[#8B7355]'
                      }`}
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: isActive ? 500 : 400
                      }}
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#8B7355]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Book Me Now Button with Sparkles */}
              <motion.div className="relative">
                {/* Sparkle animations */}
                <motion.div
                  className="absolute -top-1 -left-1 text-yellow-500"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2 text-yellow-400"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [360, 180, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.3,
                    repeatDelay: 0.5
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 right-0 text-yellow-300"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, -180, -360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.6,
                    repeatDelay: 0.5
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>

                <Button
                  onClick={() => setShowBooking(true)}
                  className="bg-[#8B7355] text-[#FAF0E6] hover:bg-[#A0826D] shadow-lg transition-all duration-300"
                  size="sm"
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Book Me Now
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button and book button */}
            <div className="md:hidden flex items-center gap-3">
              <motion.div className="relative">
                <motion.div
                  className="absolute -top-1 -right-1 text-yellow-500"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                </motion.div>
                <Button
                  onClick={() => setShowBooking(true)}
                  className="bg-[#8B7355] text-[#FAF0E6]"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </motion.div>
              <button
                className="text-[#8B7355]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF0E6] border-t border-[#D2B48C]/30"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                
                if (item.dropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name)}
                        className={`flex items-center justify-between w-full py-2 text-sm ${
                          isActive ? 'text-[#8B7355]' : 'text-[#A0826D]'
                        }`}
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          fontWeight: isActive ? 500 : 400
                        }}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpenDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileOpenDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2 mt-2"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileOpenDropdown(null);
                                }}
                                className="block py-2 text-sm text-[#A0826D]"
                                style={{
                                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                                  fontWeight: 400
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${
                      isActive ? 'text-[#8B7355]' : 'text-[#A0826D]'
                    }`}
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: isActive ? 500 : 400
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-[#E8D7C3]/50 backdrop-blur-sm border-t border-[#D2B48C]/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p 
              className="text-[#8B7355] text-sm tracking-wide"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              © 2025 Jolie Nguyen. All rights reserved.
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#A0826D]/30 to-transparent" />
      </footer>

      {/* AI ChatBot - Available on all pages */}
      <ChatBot />

      {/* Consultation Booking Modal */}
      <ConsultationBooking 
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBooking={onBooking}
      />
    </div>
  );
}
