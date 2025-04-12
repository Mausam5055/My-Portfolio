import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Grid } from "lucide-react";
import { cn } from "../lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

type GamingPost = {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string;
  slug: string;
};

const gamingPosts: GamingPost[] = [
  {
    id: "1",
    title: "Spider-Man: Miles Morales – Ultimate Web-Swinging Experience",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-20",
    author: "Mausam Kar",
    slug: "spider-man"
  },
  {
    id: "2",
    title: "BGMI – Intense Battle Royale Action",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-18",
    author: "Mausam Kar",
    slug: "bgmi"
  },
  {
    id: "3",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-15",
    author: "Mausam Kar",
    slug: "asphalt-9"
  },
  {
    id: "4",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-15",
    author: "Mausam Kar",
    slug: "asphalt-9"
  },
];

const ITEMS_TO_SHOW = 3;

export const Gaming: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToGaming) {
      requestAnimationFrame(() => {
        const gamingSection = document.getElementById('gaming');
        if (gamingSection) {
          const targetScroll = gamingSection.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetScroll,
            behavior: 'instant'
          });
        }
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handlePostClick = (slug: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    navigate(`/games/${slug}`, { state: { fromGameDetail: true } });
  };

  const handleViewAll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    navigate('/games', { state: { fromGaming: true } });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <section
      id="gaming"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.2)",
      }}
    >
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
            Gaming
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamingPosts.slice(0, ITEMS_TO_SHOW).map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
              className={cn(
                "bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm",
                "aspect-square rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                "transform transition-all duration-300",
                "border border-white/20 dark:border-gray-700/50",
                "group relative cursor-pointer z-10",
              )}
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="h-full w-full overflow-hidden relative">
                <motion.div
                  className="h-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {post.date} • {post.author}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={cn(
                    "text-blue-400 font-medium",
                    "hover:text-blue-300",
                    "transition-colors duration-300",
                    "group/link relative flex items-center gap-2",
                  )}
                >
                  <span className="relative z-10">View Details</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring" }}
                  >
                    <ChevronRight size={18} />
                  </motion.span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover/link:w-full transition-all duration-300" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {gamingPosts.length > ITEMS_TO_SHOW && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAll}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full",
                "bg-white dark:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                "hover:bg-blue-50 dark:hover:bg-gray-700",
                "transition-all duration-300",
                "group"
              )}
            >
              <Grid className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                View All Games
              </span>
            </motion.button>
          </motion.div>
        )}

        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none" />
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

export default Gaming;
