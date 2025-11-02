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

const products = [
  {
    id: 1,
    name: 'Mindfulness Journal',
    description: 'A guided journal for daily reflection and mental wellness tracking.',
    price: 29.99,
    rating: 4.8,
    category: 'Journals'
  },
  {
    id: 2,
    name: 'Self-Care Workbook',
    description: 'Comprehensive exercises and activities for building healthy habits.',
    price: 39.99,
    rating: 4.9,
    category: 'Workbooks'
  },
  {
    id: 3,
    name: 'Anxiety Relief Bundle',
    description: 'Complete kit including breathing exercises guide and calming techniques.',
    price: 49.99,
    rating: 4.7,
    category: 'Bundles'
  },
  {
    id: 4,
    name: 'Mental Wellness Cards',
    description: 'Deck of 52 cards with daily affirmations and mindfulness prompts.',
    price: 24.99,
    rating: 4.9,
    category: 'Cards'
  },
  {
    id: 5,
    name: 'Therapy Session Package',
    description: '5 sessions bundle with flexible scheduling options.',
    price: 499.99,
    rating: 5.0,
    category: 'Sessions'
  },
  {
    id: 6,
    name: 'Digital Course: CBT Basics',
    description: 'Self-paced online course on Cognitive Behavioral Therapy fundamentals.',
    price: 79.99,
    rating: 4.8,
    category: 'Courses'
  }
];

export function Products({ isRegistered, userEmail }: ProductsProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product: typeof products[0]) => {
    // Check if user is registered before allowing to add to cart
    if (!isRegistered) {
      toast.error('Please register to receive updates before making a purchase', {
        description: 'Click the "Get Updates" button in the navigation to register'
      });
      return;
    }

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

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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
              className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
            >
              My Products
            </h1>
            <p 
              className="text-gray-400 max-w-2xl mx-auto mb-4"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Tools and resources to support your mental wellness journey
            </p>

            {/* Registration Notice */}
            {!isRegistered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm"
              >
                <Lock size={16} />
                <span 
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontWeight: 300
                  }}
                >
                  Register to unlock purchasing
                </span>
              </motion.div>
            )}

            {/* Cart Indicator */}
            {cart.length > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setShowCheckout(!showCheckout)}
                className="fixed top-20 right-4 z-50 bg-white text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'fill-white text-white' : 'text-gray-600'}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">{product.rating}</span>
                  </div>

                  <h3 
                    className="text-white mb-2 text-xl md:text-2xl"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    {product.name}
                  </h3>

                  <p 
                    className="text-gray-400 text-sm mb-4"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span 
                      className="text-white"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 500
                      }}
                    >
                      ${product.price}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm hover:bg-gray-200 transition-colors"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                        fontWeight: 500
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add
                    </motion.button>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-white/0 group-hover:border-white/30 transition-all" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-white/0 group-hover:border-white/30 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCheckout && cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCheckout(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-black border-l border-white/20 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 
                  className="text-white"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: 600
                  }}
                >
                  Shopping Cart
                </h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 
                          className="text-white text-sm"
                          style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                            fontWeight: 500
                          }}
                        >
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">${item.price} each</span>
                      <span 
                        className="text-white"
                        style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          fontWeight: 500
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span 
                    className="text-gray-400"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    Total
                  </span>
                  <span 
                    className="text-white text-xl"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Payment Section */}
      {cart.length > 0 && showCheckout && (
        <section className="py-24 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PaymentPortal
              isRegistered={isRegistered}
              userEmail={userEmail}
              amount={getTotalPrice()}
              productName={`${cart.length} item(s)`}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </section>
      )}

      {/* Payment Info Section */}
      {cart.length === 0 && (
        <section className="py-24 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 
                className="text-white mb-6 text-3xl md:text-4xl lg:text-5xl"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 700
                }}
              >
                Secure Checkout
              </h2>
              <p 
                className="text-gray-400 mb-8"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontWeight: 300
                }}
              >
                All transactions are encrypted and secure. We accept all major payment methods.
              </p>
              <div className="flex justify-center gap-4 text-gray-500 text-sm">
                <span>Visa</span>
                <span>•</span>
                <span>Mastercard</span>
                <span>•</span>
                <span>PayPal</span>
                <span>•</span>
                <span>Apple Pay</span>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
