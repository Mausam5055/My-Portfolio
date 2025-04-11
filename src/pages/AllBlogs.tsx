import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Search } from 'lucide-react';
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
  },
  {
    id: '4',
    title: 'Building Responsive Web Applications',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    excerpt: 'Learn the best practices for creating responsive web applications that work seamlessly across all devices...',
    content: `
# Building Responsive Web Applications

Responsive design is no longer optional in today's digital landscape...

## Mobile-First Approach

Start with mobile and scale up for larger screens...

## Performance Optimization

Ensure your responsive sites load quickly and efficiently...
    `,
    date: '2024-03-01',
    author: 'Mausam Kar'
  },
  {
    id: '5',
    title: 'The Power of CSS Grid',
    image: 'https://images.unsplash.com/photo-1555066931-bf19f8e1083d',
    excerpt: 'Master CSS Grid layout system for creating complex, responsive web layouts...',
    content: `
# The Power of CSS Grid

CSS Grid is a powerful layout system that revolutionized web design...

## Grid Basics

Understanding the fundamentals of CSS Grid...

## Advanced Grid Techniques

Take your layouts to the next level with advanced Grid features...
    `,
    date: '2024-02-28',
    author: 'Mausam Kar'
  },
  {
    id: '6',
    title: 'JavaScript Best Practices',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    excerpt: 'Essential JavaScript practices for writing clean, maintainable, and efficient code...',
    content: `
# JavaScript Best Practices

Writing good JavaScript code is an art that requires practice and knowledge...

## Code Organization

Learn how to structure your JavaScript code effectively...

## Performance Tips

Optimize your JavaScript code for better performance...
    `,
    date: '2024-02-25',
    author: 'Mausam Kar'
  }
];

export const AllBlogs: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize filtered posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            post.content.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Memoize handlers
  const handleBack = useCallback(() => {
    navigate('/', { 
      state: { scrollToBlog: true },
      replace: true
    });
  }, [navigate]);

  const handlePostClick = useCallback((postId: string) => {
    navigate(`/blog/${postId}`, { 
      state: { fromBlogDetail: true },
      replace: true
    });
  }, [navigate]);

  // Optimize background image loading
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643";
  }, []);

  // Hide navbar when component mounts and show it when unmounts
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/', { 
        state: { scrollToBlog: true },
        replace: true
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const categories = ['all', 'technology', 'web development', 'programming', 'design'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-[radial-gradient(circle_at_center,_#000_0%,_#111827_100%)] relative"
    >
      {/* Optimized Hero Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Hero Background"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111827] via-white/90 dark:via-[#111827]/90 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-30 pt-20">
        {/* Back Button and Title Section */}
        <div className="mb-16 text-center relative">
          <div className="flex items-center justify-center relative">
            <motion.button
              onClick={handleBack}
              className="absolute left-0 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft 
                size={20} 
                className="text-gray-700 dark:text-gray-300 group-hover:text-[#8B31FF] dark:group-hover:text-[#8B31FF] transition-colors"
              />
              <span className="sr-only">Back to Home</span>
            </motion.button>

            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white px-12"
            >
              All Blog Posts
            </motion.h2>
          </div>

          <div className="space-y-6 mt-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full"
            />
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              Explore our collection of articles about web development, design, and technology.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-6 relative z-30"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "transition-all duration-200 ease-out",
                  "relative overflow-hidden",
                  "active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2",
                  "hover:shadow-md",
                  selectedCategory === category
                    ? "bg-[#8B31FF] text-white shadow-lg transform scale-105"
                    : "bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#8B31FF]/30 dark:hover:border-[#8B31FF]/30 hover:bg-[#8B31FF]/5"
                )}
              >
                <span className="relative z-10">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-3.5",
                  "rounded-full",
                  "bg-white dark:bg-gray-800",
                  "border-2 border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-100",
                  "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                  "shadow-sm",
                  "transition-all duration-200 ease-out",
                  "focus:outline-none focus:border-[#8B31FF] dark:focus:border-[#8B31FF]",
                  "focus:ring-2 focus:ring-[#8B31FF]/20 dark:focus:ring-[#8B31FF]/20",
                  "hover:border-gray-300 dark:hover:border-gray-600",
                  "hover:shadow-md"
                )}
              />
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20">
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={isMobile ? undefined : { opacity: 0, y: 10 }}
                animate={isMobile ? undefined : { opacity: 1, y: 0 }}
                exit={isMobile ? undefined : { opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.2,
                  delay: isMobile ? 0 : index * 0.05,
                  ease: [0.4, 0, 0.2, 1]
                }}
                layout={!isMobile}
                className={cn(
                  "bg-white dark:bg-gray-800",
                  "rounded-xl overflow-hidden",
                  "shadow-md hover:shadow-lg",
                  "transform transition-all duration-200",
                  "border border-gray-100 dark:border-gray-700",
                  "group relative cursor-pointer",
                  isMobile ? "opacity-100" : "will-change-transform"
                )}
                onClick={() => handlePostClick(post.id)}
              >
                <div className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
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

                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm md:text-base">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm md:text-base">
                    <span>Read More</span>
                    <ArrowLeft size={16} className="transform transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}; 