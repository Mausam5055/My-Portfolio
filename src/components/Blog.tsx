import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, Tag, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import type { BlogPost } from '../types';

// This would typically come from an API or database
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Creative Coding',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
    excerpt: 'Exploring the intersection of art and technology through creative coding...',
    content: `
# The Art of Creative Coding

Creative coding is where art meets technology, where expression finds form through algorithms and interactivity...

## Getting Started

The journey begins with understanding the basics of programming and visual arts...

## Advanced Techniques

As you progress, you'll discover more sophisticated ways to create digital art...
    `,
    date: '2024-03-15',
    author: 'Mausam Kar'
  },
  {
    id: '2',
    title: 'Design Systems in Modern Web Dev.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    excerpt: 'Building scalable and consistent design systems for the modern web...',
    content: `
# Design Systems in Modern Web Dev.

A comprehensive design system is the foundation of any successful digital product...

## Core Components

Every design system needs these essential building blocks...

## Implementation Strategies

Learn how to effectively implement your design system...
    `,
    date: '2024-03-10',
    author: 'Mausam Kar'
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    excerpt: 'Exploring emerging trends and technologies shaping the future of web development...',
    content: `
# The Future of Web Development

The web development landscape is constantly evolving...

## Emerging Technologies

From WebAssembly to Edge Computing...

## Future Trends

What's next in the world of web development...
    `,
    date: '2024-03-05',
    author: 'Mausam Kar'
  }
];

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (location.state?.scrollToBlog) {
      // Use requestAnimationFrame to ensure the DOM is ready
      requestAnimationFrame(() => {
        const blogSection = document.getElementById('blog');
        if (blogSection) {
          // Get the element's position relative to the viewport
          const rect = blogSection.getBoundingClientRect();
          // Calculate the target scroll position with offset for mobile
          const targetScroll = rect.top + window.pageYOffset - (window.innerWidth <= 768 ? 80 : 100);
          
          // Use smooth scrolling with a longer duration for mobile
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      });
      
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const categories = ['all', 'technology', 'web development', 'programming', 'design'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.content.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (postId: string) => {
    // Navigate immediately without scrolling first
    navigate(`/blog/${postId}`, { 
      state: { fromBlogDetail: true },
      replace: true // This replaces the current history entry instead of adding a new one
    });
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000_0%,_#111827_100%)] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            Blog
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-300",
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50"
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
              className={cn(
                "bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm",
                "rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                "transform transition-all duration-300",
                "border border-white/20 dark:border-gray-700/50",
                "group relative cursor-pointer"
              )}
              onClick={() => handlePostClick(post.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="overflow-hidden relative">
                <motion.div
                  className="h-48"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 10,
                        mass: 0.5
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>
              
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent dark:text-white mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <motion.div
                  className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>Read More</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Animated background elements */}
        <div className="absolute -top-10 sm:-top-20 left-1/4 sm:left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute -bottom-10 sm:-bottom-20 right-1/4 sm:right-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none" />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};