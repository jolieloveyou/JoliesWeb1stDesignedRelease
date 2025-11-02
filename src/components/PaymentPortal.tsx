import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, Shield, CheckCircle, RefreshCw, User, Mail, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

interface PaymentPortalProps {
  isRegistered: boolean;
  userEmail?: string;
  amount: number;
  productName: string;
  onPaymentSuccess: () => void;
}

export function PaymentPortal({ isRegistered, userEmail, amount, productName, onPaymentSuccess }: PaymentPortalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [fullName, setFullName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState(userEmail || '');
  const [address, setAddress] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate random captcha on mount
  useState(() => {
    const generateCaptcha = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    setCaptchaCode(generateCaptcha());
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryDate(formatExpiryDate(value));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRegistered) {
      toast.error('Please register first to access the payment portal');
      return;
    }

    // Validate delivery information
    if (!fullName || !deliveryEmail || !address) {
      toast.error('Please fill in all delivery information');
      return;
    }

    if (!deliveryEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate captcha
    if (captcha.toUpperCase() !== captchaCode) {
      toast.error('Incorrect captcha code. Please try again.');
      setCaptcha('');
      return;
    }

    // Validate payment details
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast.error('Please fill in all payment details');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid card number');
      return;
    }

    if (expiryDate.length !== 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return;
    }

    if (cvv.length !== 3) {
      toast.error('Please enter a valid CVV');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success(`Payment successful! Your ebook will be sent to ${deliveryEmail}`);
      onPaymentSuccess();
      setIsProcessing(false);
      
      // Reset form
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setCardName('');
      setFullName('');
      setDeliveryEmail('');
      setAddress('');
      setCaptcha('');
    }, 2500);
  };

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptcha('');
  };

  if (!isRegistered) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 
            className="text-white mb-2"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 600
            }}
          >
            Registration Required
          </h3>
          <p 
            className="text-gray-400"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontWeight: 300
            }}
          >
            Please register to receive updates before accessing the payment portal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        <div className="relative p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 
                  className="text-white"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 600
                  }}
                >
                  Secure Payment
                </h2>
                <p 
                  className="text-gray-400 text-sm"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Registered as: {userEmail}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span 
                  className="text-gray-400"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  {productName}
                </span>
                <span 
                  className="text-white"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 600
                  }}
                >
                  ${amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Delivery Information Section */}
            <div className="border-b border-white/10 pb-6">
              <h3 
                className="text-white mb-4"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 600
                }}
              >
                Delivery Information
              </h3>

              {/* Full Name */}
              <div className="mb-4">
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                  />
                </div>
              </div>

              {/* Email for Ebook Delivery */}
              <div className="mb-4">
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Email Address (for ebook delivery) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    value={deliveryEmail}
                    onChange={(e) => setDeliveryEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full address"
                    rows={3}
                    className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 resize-none"
                  />
                </div>
              </div>

              {/* Captcha */}
              <div>
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Security Verification *
                </label>
                <div className="flex gap-3 items-center mb-2">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 flex items-center justify-center">
                    <span 
                      className="text-white tracking-widest select-none"
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        textDecoration: 'line-through',
                        textDecorationStyle: 'wavy',
                        letterSpacing: '0.3em'
                      }}
                    >
                      {captchaCode}
                    </span>
                  </div>
                  <Button
                    type="button"
                    onClick={refreshCaptcha}
                    className="bg-white/10 border border-white/20 hover:bg-white/20 text-white"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  placeholder="Enter the code above"
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 uppercase"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Payment Information Section */}
            <div>
              <h3 
                className="text-white mb-4"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 600
                }}
              >
                Payment Information
              </h3>

              {/* Card Number */}
              <div className="mb-4">
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                  />
                </div>
              </div>

              {/* Card Name */}
              <div className="mb-4">
                <label 
                  className="block text-gray-400 text-sm mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40 uppercase"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label 
                    className="block text-gray-400 text-sm mb-2"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    Expiry Date
                  </label>
                  <Input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                  />
                </div>
                <div>
                  <label 
                    className="block text-gray-400 text-sm mb-2"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    CVV
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="w-full pl-10 bg-white/5 border-white/20 text-white placeholder-gray-500 focus:border-white/40"
                    />
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
                <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p 
                  className="text-gray-400 text-xs"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors h-12"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full"
                  />
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Pay ${amount.toFixed(2)}
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-white/20" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-white/20" />
      </motion.div>
    </div>
  );
}
