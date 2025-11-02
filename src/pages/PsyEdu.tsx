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
              PsyEdu Blog
            </h1>
            <p 
              className="text-gray-400 max-w-2xl mx-auto"
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
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
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
                    className="text-white mb-3 group-hover:text-gray-300 transition-colors text-xl md:text-2xl"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600
                    }}
                  >
                    {post.title}
                  </h3>

                  <p 
                    className="text-gray-400 text-sm mb-4"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontWeight: 300
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <button className="flex items-center gap-2 text-white text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>

                <motion.div
                  className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg pointer-events-none"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
