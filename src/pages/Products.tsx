import { motion } from 'motion/react';
import { ShoppingCart, Star, X, Lock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { PaymentPortal } from '../components/PaymentPortal';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

interface ProductsProps {
  isRegistered: boolean;
  userEmail: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ebookProducts = [
  {
    id: 1,
    name: 'Web Development Guide',
    description: 'Complete ebook covering React, TypeScript, and modern web development practices.',
    price: 29.99,
    rating: 4.8,
    category: 'Ebook'
  },
  {
    id: 2,
    name: 'Python for Data Science',
    description: 'In-depth ebook on Python libraries for data analysis and machine learning.',
    price: 24.99,
    rating: 4.9,
    category: 'Ebook'
  },
  {
    id: 3,
    name: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and user experience design.',
    price: 34.99,
    rating: 4.7,
    category: 'Ebook'
  }
];

const digitalProducts = [
  {
    id: 4,
    name: 'Data Analysis Toolkit',
    description: 'Comprehensive digital toolkit with templates, scripts, and visualization guides.',
    price: 39.99,
    rating: 4.9,
    category: 'Digital Product'
  },
  {
    id: 5,
    name: 'Full-Stack Masterclass',
    description: 'Video course bundle teaching end-to-end web application development.',
    price: 79.99,
    rating: 4.7,
    category: 'Digital Product'
  },
  {
    id: 6,
    name: 'UI/UX Design Templates',
    description: 'Premium collection of Figma templates and design system components.',
    price: 49.99,
    rating: 5.0,
    category: 'Digital Product'
  }
];

const allProducts = [...ebookProducts, ...digitalProducts];

export function Products({ isRegistered, userEmail }: ProductsProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product: typeof allProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`Added another ${product.name} to cart`);
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1 
      }]);
      toast.success(`${product.name} added to cart`);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowCheckout(false);
  };

  const renderProductCard = (product: typeof allProducts[0], index: number) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#FAF0E6]/60 backdrop-blur-sm rounded-lg overflow-hidden border border-[#D2B48C]/30 hover:border-[#8B7355]/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image Placeholder */}
      <div className="aspect-square bg-gradient-to-br from-[#E8D7C3] to-[#D2B48C] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#8B7355]/10" />
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,115,85,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="text-xs px-3 py-1 bg-[#FAF0E6]/90 backdrop-blur-sm rounded-full text-[#8B7355] border border-[#D2B48C]/40">
            {product.category}
          </span>
        </div>
        
        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-[#8B7355]/0 group-hover:bg-[#8B7355]/5 transition-all duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(product.rating) ? 'fill-[#8B7355] text-[#8B7355]' : 'text-[#D2B48C]'}
            />
          ))}
          <span className="text-xs text-[#A0826D] ml-2">{product.rating}</span>
        </div>

        <h3 
          className="text-[#3E2723] mb-2 text-xl md:text-2xl"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 600
          }}
        >
          {product.name}
        </h3>

        <p 
          className="text-[#6D4C41] text-sm mb-4"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            fontWeight: 300
          }}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span 
            className="text-[#3E2723] text-xl"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontWeight: 600
            }}
          >
            ${product.price}
          </span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-[#8B7355] text-[#FAF0E6] rounded-full text-sm hover:bg-[#A0826D] transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FAEBD7] to-[#FAF0E6]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(139,115,85,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl"
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
              className="text-[#3E2723] mb-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
            >
              My Products
            </h1>
            <p 
              className="text-[#8B7355] max-w-2xl mx-auto mb-4 text-lg"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Premium digital resources to accelerate your learning and development journey
            </p>

            {/* Cart Indicator */}
            {cart.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setShowCheckout(!showCheckout)}
                className="fixed top-20 right-4 z-50 bg-[#8B7355] text-[#FAF0E6] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#A0826D] transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-[#3E2723] text-[#FAF0E6] rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Ebook Section */}
      <section id="ebook" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 
              className="text-[#3E2723] mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700
              }}
            >
              Ebooks
            </h2>
            <p 
              className="text-[#8B7355] max-w-2xl mx-auto"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Comprehensive guides to master new skills at your own pace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ebookProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="digital-product" className="py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 
              className="text-[#3E2723] mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700
              }}
            >
              Digital Products
            </h2>
            <p 
              className="text-[#8B7355] max-w-2xl mx-auto"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Premium tools, templates, and courses for professional development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCheckout && cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setShowCheckout(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FAF0E6] shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-[#3E2723] text-2xl"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 700
                  }}
                >
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-[#8B7355] hover:text-[#6D4C41]"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-[#E8D7C3]/30 rounded-lg">
                    <div>
                      <h3 className="text-[#3E2723]">{item.name}</h3>
                      <p className="text-[#8B7355] text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#3E2723]">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A0826D] hover:text-[#8B7355]"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-[#D2B48C]/30 pt-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#3E2723]">Total:</span>
                  <span className="text-[#3E2723] text-2xl">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Portal */}
              <PaymentPortal
                isRegistered={isRegistered}
                userEmail={userEmail}
                amount={totalAmount}
                productName={`${cart.length} item(s)`}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
