import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, User, Check } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface NewsletterRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (email: string, name: string) => void;
}

export function NewsletterRegistration({ isOpen, onClose, onRegister }: NewsletterRegistrationProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onRegister(email, name);
      toast.success('Successfully registered! Check your email for updates.');
      setIsSubmitting(false);
      setEmail('');
      setName('');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-black border border-white/20 rounded-lg overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center"
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 
                    className="text-white mb-2"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    Stay Updated
                  </h2>
                  <p 
                    className="text-gray-400 text-sm"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    Register to receive exclusive updates, new content, and special offers
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label 
                      className="block text-gray-400 text-sm mb-2"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300
                      }}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-gray-400 text-sm mb-2"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 300
                      }}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                        />
                        Registering...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Register Now
                      </div>
                    )}
                  </Button>
                </form>

                {/* Privacy Notice */}
                <p 
                  className="text-gray-500 text-xs text-center mt-4"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-white/20" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-white/20" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
