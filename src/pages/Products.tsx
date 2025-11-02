import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

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

export function Products() {
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    // In a real app, this would trigger a toast notification
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
              className="text-gray-400 max-w-2xl mx-auto"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Tools and resources to support your mental wellness journey
            </p>

            {/* Cart Indicator */}
            {cart.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed top-20 right-4 z-50 bg-white text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              </motion.div>
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
                      onClick={() => addToCart(product.id)}
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

      {/* Payment Info Section */}
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
    </div>
  );
}
