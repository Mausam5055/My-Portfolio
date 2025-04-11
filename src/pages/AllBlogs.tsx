import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Search } from 'lucide-react';
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

const BlogPostSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="relative h-48 bg-gray-200 dark:bg-gray-700" />
    <div className="p-4">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="mt-4 h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

export const AllBlogs: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

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

  // Handle image loading
  const handleImageLoad = useCallback((postId: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [postId]: true
    }));
  }, []);

  // Preload images
  useEffect(() => {
    filteredPosts.forEach(post => {
      const img = new Image();
      img.src = post.image;
      img.onload = () => handleImageLoad(post.id);
    });
  }, [filteredPosts, handleImageLoad]);

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Enhanced Hero Section with Background Image */}
      <header className="relative">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMjUgMzUuMjVhMS4yNSAxLjI1IDAgMTAwLTIuNSAxLjI1IDEuMjUgMCAwMDAgMi41eiIgZmlsbD0iI2U1ZTdmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-10" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 md:py-16 z-10">
          {/* Back button and title */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={handleBack}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="text-gray-700 dark:text-white" />
              <span className="sr-only">Back to Home</span>
            </motion.button>
            
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              All Blog Posts
            </motion.h1>
            
            <div className="w-10" />
          </div>

          {/* Description */}
          <motion.p 
            className="text-gray-600 dark:text-white/80 text-center max-w-2xl mx-auto mb-8 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our collection of articles about web development, design, and technology.
          </motion.p>

          {/* Search and Filter Section */}
          <motion.div
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white/60" size={20} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-gray-100 text-gray-900 placeholder-gray-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-purple-500/50 backdrop-blur-sm"
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
                    "transition-all duration-200",
                    "backdrop-blur-sm",
                    selectedCategory === category
                      ? "bg-gray-900 text-white dark:bg-purple-500 shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative h-48">
                {!loadedImages[post.id] ? (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                ) : null}
                <img
                  src={post.image}
                  alt={post.title}
                  className={cn(
                    "w-full h-full object-cover",
                    !loadedImages[post.id] && "opacity-0"
                  )}
                  loading="lazy"
                  onLoad={() => handleImageLoad(post.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center text-gray-900 dark:text-purple-400 font-medium text-sm">
                  <span>Read More</span>
                  <ArrowLeft size={16} className="ml-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}; 