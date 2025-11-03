import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface ConsultationBookingProps {
  isOpen: boolean;
  onClose: () => void;
  onBooking: (name: string, email: string, message: string, wantsUpdates: boolean) => void;
}

export function ConsultationBooking({ isOpen, onClose, onBooking }: ConsultationBookingProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onBooking(name, email, message, wantsUpdates);
      toast.success('Consultation booked successfully!', {
        description: 'We\'ll get back to you within 24 hours.'
      });
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
      setWantsUpdates(false);
      onClose();
    }, 1000);
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
            className="fixed inset-0 bg-[#3E2723]/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#FAF0E6] border border-[#D2B48C]/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Decorative Pattern Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(139,115,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

              {/* Animated Glow */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-[#D2B48C]/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Content */}
              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E8D7C3]/50 hover:bg-[#D2B48C]/50 flex items-center justify-center text-[#6D4C41] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B7355]/10 mb-4 relative"
                  >
                    <Sparkles className="w-8 h-8 text-[#8B7355]" />
                    
                    {/* Sparkle animations */}
                    <motion.div
                      className="absolute -top-1 -right-1 text-yellow-500"
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
                  </motion.div>

                  <h2 
                    className="text-[#3E2723] text-2xl md:text-3xl mb-2"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 700
                    }}
                  >
                    Book a Consultation
                  </h2>
                  <p 
                    className="text-[#8B7355]"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    Let's discuss how I can help you on your journey
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#3E2723]">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-[#FAEBD7] border-[#D2B48C]/40 text-[#3E2723] placeholder:text-[#A0826D] focus:border-[#8B7355] focus:ring-[#8B7355]/20"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#3E2723]">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="bg-[#FAEBD7] border-[#D2B48C]/40 text-[#3E2723] placeholder:text-[#A0826D] focus:border-[#8B7355] focus:ring-[#8B7355]/20"
                      required
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#3E2723]">
                      How Can I Help You? *
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about what you're looking for..."
                      rows={4}
                      className="bg-[#FAEBD7] border-[#D2B48C]/40 text-[#3E2723] placeholder:text-[#A0826D] focus:border-[#8B7355] focus:ring-[#8B7355]/20 resize-none"
                      required
                    />
                  </div>

                  {/* Updates Checkbox */}
                  <div className="flex items-start space-x-3 p-4 bg-[#FAEBD7]/50 rounded-lg border border-[#D2B48C]/30">
                    <Checkbox
                      id="updates"
                      checked={wantsUpdates}
                      onCheckedChange={(checked) => setWantsUpdates(checked as boolean)}
                      className="mt-1 border-[#8B7355] data-[state=checked]:bg-[#8B7355] data-[state=checked]:border-[#8B7355]"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor="updates" 
                        className="text-[#3E2723] cursor-pointer"
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          fontWeight: 400
                        }}
                      >
                        I want to receive notifications about new updates
                      </Label>
                      <p 
                        className="text-sm text-[#A0826D] mt-1"
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          fontWeight: 300
                        }}
                      >
                        Get notified about new resources, articles, and services
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#8B7355] hover:bg-[#A0826D] text-[#FAF0E6] py-6 rounded-xl shadow-lg disabled:opacity-50"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 500
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#FAF0E6]/30 border-t-[#FAF0E6] rounded-full"
                          />
                          Booking...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Book Consultation
                        </span>
                      )}
                    </Button>
                  </motion.div>

                  {/* Privacy Note */}
                  <p 
                    className="text-center text-xs text-[#A0826D]"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    Your information is kept confidential and secure
                  </p>
                </form>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#8B7355]/20" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#8B7355]/20" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
