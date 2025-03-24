import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import type { BlogPost } from '../types';
import ReactMarkdown from 'react-markdown';

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
    title: 'Design Systems in Modern Web Development',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    excerpt: 'Building scalable and consistent design systems for the modern web...',
    content: `
# Design Systems in Modern Web Development

A comprehensive design system is the foundation of any successful digital product...

## Core Components

Every design system needs these essential building blocks...

## Implementation Strategies

Learn how to effectively implement your design system...
    `,
    date: '2024-03-10',
    author: 'Mausam Kar'
  }
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000_0%,_#111827_100%)]">
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
            Blogs
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100 }}
              className={cn(
                "bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm",
                "rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                "transform transition-all duration-300",
                "border border-white/20 dark:border-gray-700/50",
                "group relative cursor-pointer"
              )}
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
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {post.date} • {post.author}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <motion.button
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ x: 5 }}
                  className={cn(
                    "text-blue-600 dark:text-purple-400 font-medium",
                    "hover:text-blue-700 dark:hover:text-purple-300",
                    "transition-colors duration-300",
                    "group/link relative flex items-center gap-2"
                  )}
                >
                  <span className="relative z-10">Read More</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: 'spring' }}
                  >
                    <X size={18} className="transform rotate-45" />
                  </motion.span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover/link:w-full transition-all duration-300" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/50"
              >
                <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 p-4 border-b dark:border-gray-700 flex justify-between items-center backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent dark:text-white">
                    {selectedPost.title}
                  </h3>
                  <motion.button
                    onClick={() => setSelectedPost(null)}
                    whileHover={{ rotate: 90 }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                <div className="p-6 prose dark:prose-invert max-w-none">
                  <ReactMarkdown className="text-gray-700 dark:text-gray-300">
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated background elements */}
        <div className="absolute -top-10 sm:-top-20 left-1/4 sm:left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute -bottom-10 sm:-bottom-20 right-1/4 sm:right-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none" />
      </div>

      <style jsx global>{`
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