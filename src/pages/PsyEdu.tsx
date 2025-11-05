import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Cognitive Behavioral Therapy',
    excerpt: 'Explore how CBT can help reshape negative thought patterns and improve mental well-being.',
    date: 'Oct 20, 2025',
    author: 'Jolie',
    category: 'Therapy'
  },
  {
    id: 2,
    title: 'The Science of Mindfulness',
    excerpt: 'Discover the neurological benefits of mindfulness practices and meditation.',
    date: 'Oct 15, 2025',
    author: 'Jolie',
    category: 'Wellness'
  },
  {
    id: 3,
    title: 'Managing Anxiety in Modern Life',
    excerpt: 'Practical strategies for coping with anxiety in our fast-paced world.',
    date: 'Oct 10, 2025',
    author: 'Jolie',
    category: 'Mental Health'
  }
];

export function PsyEdu() {
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

        {/* Animated Glow */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#D2B48C]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
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
              PsyEdu Blog
            </h1>
            <p 
              className="text-[#8B7355] max-w-2xl mx-auto text-lg"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontWeight: 300
              }}
            >
              Insights, research, and practical guidance for mental wellness
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#FAF0E6]/60 backdrop-blur-sm rounded-lg overflow-hidden border border-[#D2B48C]/30 hover:border-[#8B7355]/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-[#E8D7C3] to-[#D2B48C] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#8B7355]/10" />
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(139,115,85,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,115,85,0.2) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1 bg-[#FAF0E6]/90 backdrop-blur-sm rounded-full text-[#8B7355] border border-[#D2B48C]/40">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-xs text-[#A0826D]">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h3 
                    className="text-[#3E2723] mb-3 group-hover:text-[#6D4C41] transition-colors text-xl md:text-2xl"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    {post.title}
                  </h3>

                  <p 
                    className="text-[#6D4C41] text-sm mb-4"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-[#8B7355] text-sm group-hover:gap-3 transition-all">
                    <span style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 500
                    }}>
                      Read More
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t border-r border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b border-l border-[#8B7355]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
