import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, Shield, CheckCircle, RefreshCw, User, Mail, MapPin, Info } from 'lucide-react';
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

export function PaymentPortal({
  isRegistered,
  userEmail,
  amount,
  productName,
  onPaymentSuccess
}: PaymentPortalProps) {
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

  // ✅ UseEffect thay cho useState để generate captcha khi mount
  useEffect(() => {
    const generateCaptcha = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    setCaptchaCode(generateCaptcha());
  }, []);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !deliveryEmail || !address) {
      toast.error('Please fill in all delivery information');
      return;
    }

    if (!deliveryEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (captcha.toUpperCase() !== captchaCode) {
      toast.error('Incorrect captcha code. Please try again.');
      setCaptcha('');
      return;
    }

    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast.error('Please fill in all payment details');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid card number');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      toast.success(`Payment successful! Your ebook will be sent to ${deliveryEmail}`);
      onPaymentSuccess();
      setIsProcessing(false);

      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setCardName('');
      setFullName('');
      setDeliveryEmail('');
      setAddress('');
      setCaptcha('');
    }, 2000);
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

  return (
    <div className="max-w-2xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
      >
        {/* Thông báo nhẹ nếu chưa đăng ký */}
        {!isRegistered && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-300 text-sm px-6 py-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>
              Register to receive updates and bonuses on your next purchase.
            </span>
          </div>
        )}

        {/* Nội dung chính */}
        <div className="relative p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-serif font-semibold">Secure Payment</h2>
                {userEmail && (
                  <p className="text-gray-200 text-sm">Registered as: {userEmail}</p>
                )}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-200 text-sm">{productName}</span>
                <span className="text-white font-serif font-semibold">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form thanh toán */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Delivery Info */}
            <div className="border-b border-white/10 pb-6">
              <h3 className="text-white font-serif font-semibold mb-4">Delivery Information</h3>
              <Input placeholder="Full Name *" value={fullName} onChange={e => setFullName(e.target.value)} />
              <Input
                placeholder="Email for ebook delivery *"
                type="email"
                value={deliveryEmail}
                onChange={e => setDeliveryEmail(e.target.value)}
              />
              <Textarea
                placeholder="Address *"
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />

              {/* Captcha */}
              <div className="mt-4">
                <label className="block text-gray-200 text-sm mb-2">Security Verification *</label>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-center text-white tracking-widest font-mono text-lg">
                    {captchaCode}
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
                  placeholder="Enter the code above"
                  value={captcha}
                  onChange={e => setCaptcha(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-white font-serif font-semibold mb-4">Payment Information</h3>
              <Input
                placeholder="Card Number (16 digits)"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              />
              <Input
                placeholder="Cardholder Name"
                value={cardName}
                onChange={e => setCardName(e.target.value.toUpperCase())}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Expiry (MM/YY)"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                />
                <Input
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3 mt-3">
                <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                <p className="text-gray-200 text-xs">
                  Your payment is encrypted and secure. We never store card details.
                </p>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors h-12"
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${amount.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
