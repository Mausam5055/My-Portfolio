import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock, Tag, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import type { BlogPost } from '../types';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    image: 'https://images.unsplash.com/photo-1634634465913-5bb5600942f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Preload images
  useEffect(() => {
    const loadImage = (src: string, id: string) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [id]: true }));
      };
      img.onerror = () => {
        setLoadedImages(prev => ({ ...prev, [id]: true })); // Mark as loaded even if error
      };
    };

    blogPosts.forEach(post => {
      loadImage(post.image, post.id);
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset showAllPosts when category or search changes
  useEffect(() => {
    setShowAllPosts(false);
  }, [selectedCategory, searchQuery]);

  // Handle section visibility
  useEffect(() => {
    if (location.state?.scrollToBlog) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate');
            }
          });
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
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

  const displayedPosts = isMobile && !showAllPosts ? filteredPosts.slice(0, 3) : filteredPosts;

  const handlePostClick = (postId: string) => {
    const currentScrollPosition = window.pageYOffset;
    navigate(`/blog/${postId}`, { 
      state: { 
        from: 'blog',
        directNavigation: true,
        forceSection: 'blog',
        scrollToSection: 'blog',
        scrollPosition: currentScrollPosition
      },
      replace: false
    });
  };

  const handleShowMore = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowAllPosts(true);
    setIsAnimating(false);
  };

  const handleShowLess = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowAllPosts(false);
    setIsAnimating(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="blog" 
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000_0%,_#111827_100%)] relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div 
          className="mb-16 text-center space-y-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Blog
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full w-20" />
        </div>

        {/* Search and Filter Section */}
        <div 
          className="mb-12 space-y-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "transition-colors duration-200",
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50"
                )}
                data-aos="fade-up"
                data-aos-delay={300 + (index * 50)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <article
              key={post.id}
              className={cn(
                "blog-post",
                "bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm",
                "rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                "transform transition-all duration-200",
                "border border-white/20 dark:border-gray-700/50",
                "group relative cursor-pointer",
                "min-h-[400px]" // Ensure consistent height
              )}
              onClick={() => handlePostClick(post.id)}
              data-aos="fade-up"
              data-aos-delay={400 + (index * 100)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              <div className="overflow-hidden relative">
                <div className="h-48">
                  {!loadedImages[post.id] ? (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-t-xl" />
                  ) : (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
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

                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                  <span>Read More</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show More/Less Buttons */}
        {isMobile && filteredPosts.length > 3 && (
          <div 
            className="mt-8 text-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {!showAllPosts ? (
              <button
                onClick={handleShowMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-[#24283b] text-gray-700 dark:text-white rounded-full font-medium border border-gray-200/50 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={isAnimating}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                  <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14H20V20H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Show More Posts
              </button>
            ) : (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-[#24283b] text-gray-700 dark:text-white rounded-full font-medium border border-gray-200/50 dark:border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={isAnimating}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                  <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Show Less
              </button>
            )}
          </div>
        )}

        {/* Animated background elements */}
        <div 
          className="absolute -top-10 sm:-top-20 left-1/4 sm:left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none"
          data-aos="fade"
          data-aos-delay="100"
        />
        <div 
          className="absolute -bottom-10 sm:-bottom-20 right-1/4 sm:right-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none"
          data-aos="fade"
          data-aos-delay="200"
        />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .blog-post {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
};