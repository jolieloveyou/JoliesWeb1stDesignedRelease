// src/components/PaymentPortal.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Shield, RefreshCw, Info } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { checkout } from '../checkout'; // helper để gọi edge function

interface PaymentPortalProps {
  isRegistered: boolean;
  userEmail?: string;
  amount: number;      // dollars (e.g. 15.00)
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
  const [fullName, setFullName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState(userEmail || '');
  const [address, setAddress] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    generateCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  const refreshCaptcha = () => {
    generateCaptcha();
    setCaptcha('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validations
    if (!fullName || !deliveryEmail || !address) {
      toast.error('Vui lòng điền đầy đủ thông tin nhận sách/ebook.');
      return;
    }

    if (!deliveryEmail.includes('@')) {
      toast.error('Email không hợp lệ.');
      return;
    }

    if (captcha.trim().toUpperCase() !== captchaCode) {
      toast.error('Mã xác thực không đúng. Thử lại.');
      setCaptcha('');
      return;
    }

    try {
      setIsProcessing(true);

      // gọi helper checkout (Edge Function) - amount convert to cents
      // Edge function sẽ trả về { url } để redirect đến Stripe Checkout
      await checkout(Math.round(amount * 100), productName, deliveryEmail);

      // NOTE: khi redirect diễn ra, user rời trang -> không chạy tiếp.
      // Nhưng nếu bạn muốn lưu tạm thông tin trước redirect, có thể gọi API lưu ở đây.

      // onPaymentSuccess sẽ được gọi sau khi bạn xác nhận thành công qua webhook hoặc redirect success page
      // (không gọi trực tiếp ở đây vì checkout redirect sẽ rời trang)
      onPaymentSuccess();
    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error(err?.message || 'Không thể tạo phiên thanh toán. Thử lại sau.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
      >
        {!isRegistered && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-300 text-sm px-6 py-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span>Register to receive updates and bonuses on your next purchase.</span>
          </div>
        )}

        <div className="relative p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-serif font-semibold">Secure Checkout</h2>
                {userEmail && <p className="text-gray-200 text-sm">Registered as: {userEmail}</p>}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-200 text-sm">{productName}</span>
                <span className="text-white font-serif font-semibold">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

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

            {/* Info box */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5" />
              <p className="text-gray-200 text-xs">
                Payment is processed securely on Stripe. We never see or store card details.
              </p>
            </div>

            {/* Submit */}
            <div>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors h-12 flex items-center justify-center gap-3"
              >
                {/* Loading animation (spinner) */}
                {isProcessing ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ loop: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="black" strokeOpacity="0.2" strokeWidth="2" />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                    <span>Redirecting to secure checkout…</span>
                  </>
                ) : (
                  <>Pay ${amount.toFixed(2)}</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
