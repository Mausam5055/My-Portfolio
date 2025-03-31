import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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

Creative coding is where art meets technology, where expression finds form through algorithms and interactivity. It's a fascinating realm where programmers become artists, and artists become programmers. This unique blend of disciplines opens up endless possibilities for creating engaging and interactive experiences.

## Getting Started

The journey begins with understanding the basics of programming and visual arts. As you dive into creative coding, you'll discover that it's not just about writing code, but about expressing ideas through digital mediums. The fundamentals of both programming and design principles become your building blocks for creating compelling digital experiences.

## Advanced Techniques

As you progress, you'll discover more sophisticated ways to create digital art. From particle systems to procedural generation, from interactive installations to generative art, the possibilities are endless. Each technique adds a new dimension to your creative toolkit, allowing you to craft increasingly complex and engaging experiences.
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

A comprehensive design system is the foundation of any successful digital product. It serves as a single source of truth that helps teams build better products faster by providing consistent, reusable components and clear guidelines. In today's fast-paced development environment, a well-structured design system is not just a luxury but a necessity.

## Core Components

Every design system needs these essential building blocks. Design tokens form the atomic elements of your system, defining colors, typography, spacing, and other visual properties. These tokens ensure consistency across your entire product. The component library brings these tokens to life, creating reusable UI elements that maintain both consistency and accessibility. The pattern library then takes these components and shows how they work together to solve common design problems.

## Implementation Strategies

Learn how to effectively implement your design system. Start small with basic components and expand gradually as your needs grow. Maintain consistency by ensuring all components follow the same patterns and principles. Use version control to track changes systematically, and implement thorough testing procedures for all components. Keep documentation up-to-date and easily accessible to your team.

## Best Practices

When building and maintaining a design system, follow these best practices. Use semantic versioning for releases to track changes effectively. Establish a clear contribution process that makes it easy for team members to contribute while maintaining quality. Conduct regular audits and updates to keep the system fresh and relevant. Ensure cross-browser and device testing for consistent experiences. Focus on performance optimization and accessibility compliance to create inclusive, fast-loading components.

## Tools and Technologies

Popular tools for building design systems include Storybook for component documentation, Figma for design files, CSS-in-JS solutions for styling, component testing frameworks for quality assurance, and version control systems for change management. These tools work together to create a robust ecosystem for your design system.

Remember that a design system is never truly finished - it should evolve with your product and team needs while maintaining consistency and quality.
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

The web development landscape is constantly evolving, driven by technological advancements and changing user expectations. As we look ahead, several key trends and technologies are shaping the future of how we build and experience the web.

## Emerging Technologies

From WebAssembly to Edge Computing, new technologies are revolutionizing web development. WebAssembly is enabling high-performance applications to run in the browser, while Edge Computing is bringing processing power closer to users for faster, more responsive experiences. These technologies, along with others like Progressive Web Apps and Web Components, are creating new possibilities for web applications.

## Future Trends

What's next in the world of web development? We're seeing a shift towards more intelligent, personalized experiences powered by AI and machine learning. The rise of immersive technologies like WebXR is creating new opportunities for interactive web experiences. As we move forward, the focus is increasingly on creating more accessible, performant, and user-centric web applications that work seamlessly across all devices and platforms.
    `,
    date: '2024-03-05',
    author: 'Mausam Kar'
  }
];

export const BlogDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900 py-20"
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-8"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Blogs</span>
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 md:mb-12"
        >
          <motion.img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight"
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm md:text-base">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                <Calendar size={16} className="md:w-5 md:h-5" />
                <span>{post.date}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                <User size={16} className="md:w-5 md:h-5" />
                <span>{post.author}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                <Clock size={16} className="md:w-5 md:h-5" />
                <span>5 min read</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:hidden text-3xl font-bold text-gray-900 dark:text-white mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="prose dark:prose-invert max-w-none mx-auto md:text-lg lg:text-xl leading-relaxed"
        >
          <ReactMarkdown className="text-gray-700 dark:text-gray-300 [&>h1]:text-4xl md:[&>h1]:text-5xl lg:[&>h1]:text-6xl [&>h1]:font-bold [&>h1]:mb-8 [&>h2]:text-2xl md:[&>h2]:text-3xl lg:[&>h2]:text-4xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-6 [&>p]:text-base md:[&>p]:text-lg lg:[&>p]:text-xl [&>p]:leading-relaxed">
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          <Tag className="text-gray-500 dark:text-gray-400" size={20} />
          <span className="text-gray-500 dark:text-gray-400">Tags:</span>
          {['Technology', 'Web Development', 'Programming'].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-3 py-1 rounded-full text-sm",
                "bg-purple-100 dark:bg-purple-900/30",
                "text-purple-600 dark:text-purple-400",
                "hover:bg-purple-200 dark:hover:bg-purple-900/50",
                "transition-colors duration-200"
              )}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};