import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Bell, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { ChatBot } from './ChatBot';
import { NewsletterRegistration } from './NewsletterRegistration';
import { Button } from './ui/button';

const navigation = [
  { name: 'Portfolio', href: '/' },
  { name: 'PsyEdu', href: '/psyedu' },
  { name: 'My Service', href: '/services' },
  { name: 'My Product', href: '/products' },
];

interface LayoutProps {
  children: React.ReactNode;
  isRegistered: boolean;
  userEmail: string;
  userName: string;
  onRegister: (email: string, name: string) => void;
}

export function Layout({ children, isRegistered, userEmail, userName, onRegister }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-white tracking-tight"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}
              >
                JOLIE
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative"
                  >
                    <motion.span
                      className={`text-sm tracking-wide transition-colors ${
                        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300
                      }}
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-px bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Register Button */}
              <Button
                onClick={() => setShowRegistration(true)}
                className={`${
                  isRegistered 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                    : 'bg-white text-black hover:bg-gray-200'
                } transition-colors`}
                size="sm"
              >
                {isRegistered ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="hidden lg:inline">Registered</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Get Updates
                  </div>
                )}
              </Button>
            </div>

            {/* Mobile menu button and register button */}
            <div className="md:hidden flex items-center gap-3">
              <Button
                onClick={() => setShowRegistration(true)}
                className={`${
                  isRegistered 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-white text-black'
                }`}
                size="sm"
              >
                {isRegistered ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </Button>
              <button
                className="text-white"
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
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-sm ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
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
      <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p 
              className="text-gray-400 text-sm tracking-wide"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </footer>

      {/* AI ChatBot - Available on all pages */}
      <ChatBot />

      {/* Newsletter Registration Modal */}
      <NewsletterRegistration 
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onRegister={onRegister}
      />
    </div>
  );
}
