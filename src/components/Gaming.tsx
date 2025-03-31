import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import ReactMarkdown from "react-markdown";

type GamingPost = {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
};

const gamingPosts: GamingPost[] = [
  {
    id: "1",
    title: "Spider-Man: Miles Morales – Ultimate Web-Swinging Experience",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/26QPeXoWzLM",
    excerpt:
      "Watch my thrilling gameplay of Spider-Man: Miles Morales with epic web-swinging and combat!",
    content: `
# Spider-Man: Miles Morales

Experience the ultimate web-swinging adventure as we dive into the streets of New York City in *Spider-Man: Miles Morales*! 

## Gameplay Highlights

* **Fluid Web-Swinging**
  * Master the art of traversal across Manhattan
  * Experience smooth, physics-based movement
  * Chain together impressive web-swinging combos

* **Electrifying Combat**
  * Unleash Miles' unique Venom powers
  * Execute stylish takedowns and finishers
  * Master stealth and combat mechanics

* **Stunning Visuals**
  * Marvel at the detailed city environment
  * Experience dynamic weather effects
  * Witness breathtaking sunset and night scenes

* **Open World Exploration**
  * Discover hidden collectibles
  * Complete side missions
  * Help citizens in need

## Watch the Action

Join me as I showcase the most exciting moments from my playthrough, including epic boss battles, stealth missions, and heart-pounding chase sequences. Get ready for an unforgettable Spider-Man experience! 🕷️🔥
    `,
    date: "2024-03-20",
    author: "Mausam Kar",
  },
  {
    id: "2",
    title: "BGMI – Intense Battle Royale Action",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/W5ueSz1I9cY",
    excerpt:
      "Epic BGMI gameplay showcasing intense gunfights and survival tactics!",
    content: `
# BGMI – Battlegrounds Mobile India

Get ready for intense battle royale action as we dive into the world of BGMI! 

## Gameplay Features

* **Tactical Combat**
  * Master different weapon types
  * Execute precise headshots
  * Perfect your recoil control

* **Survival Strategies**
  * Smart zone rotation tactics
  * Efficient looting routes
  * Team coordination essentials

* **Combat Styles**
  * Aggressive rushing techniques
  * Patient sniping gameplay
  * Close-quarter combat mastery

* **Match Highlights**
  * Epic squad wipeouts
  * Clutch moments
  * Victory celebrations

## Watch the Action

Experience the thrill of intense firefights, strategic gameplay, and those heart-stopping moments that make BGMI so addictive. From early game drops to final circle battles, this gameplay has it all! 🎯🔥
    `,
    date: "2024-03-18",
    author: "Mausam Kar",
  },
  {
    id: "3",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/diznkP7_iEo",
    excerpt:
      "Experience the adrenaline rush of Asphalt 9: Legends with breathtaking races and stunning visuals!",
    content: `
# Asphalt 9: Legends

Buckle up for an adrenaline-fueled racing experience in *Asphalt 9: Legends*! 

## Racing Experience

* **Exotic Cars**
  * Drive the latest supercars
  * Customize your vehicles
  * Master different car classes

* **Racing Mechanics**
  * Perfect nitro management
  * Master drift techniques
  * Execute perfect jumps

* **Visual Spectacle**
  * Stunning track environments
  * Dynamic weather effects
  * Realistic car damage

* **Game Modes**
  * Career mode challenges
  * Multiplayer races
  * Special events

## Watch the Action

Join me as I push these incredible machines to their limits, pulling off insane drifts, perfect nitro boosts, and securing victory in the most intense races! 🏎️🔥
    `,
    date: "2024-03-15",
    author: "Mausam Kar",
  },
  
];

const ITEMS_PER_PAGE = 3;

export const Gaming: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<GamingPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(gamingPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedPosts = gamingPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          {displayedPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
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
              onClick={() => setSelectedPost(post)}
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
                  <span className="relative z-10">Watch Gameplay</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring" }}
                  >
                    <X size={18} className="transform rotate-45" />
                  </motion.span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover/link:w-full transition-all duration-300" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedPost(null);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl w-full max-w-3xl mx-4 my-8 overflow-hidden border border-white/20 dark:border-gray-700/50 flex flex-col h-[90vh]"
              >
                <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 p-4 border-b dark:border-gray-700 flex justify-between items-center backdrop-blur-sm z-10">
                  <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent dark:text-white line-clamp-1 pr-4">
                    {selectedPost.title}
                  </h3>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(null);
                    }}
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6 max-h-screen scrollbar-hide">
                  <div className="aspect-video mb-6 sm:mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <iframe
                      src={selectedPost.videoUrl}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedPost.title}
                    />
                  </div>

                  <div className="prose dark:prose-invert max-w-none w-full text-gray-900 dark:text-white px-2 sm:px-0">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white break-words">
                            {children}
                          </h1>
                        ),
                        p: ({ children }) => (
                          <p className="mb-4 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 break-words">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="space-y-3 my-6 pl-5 list-outside">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="relative pl-6 mb-2 text-gray-700 dark:text-gray-300 break-words">
                            <span className="absolute left-0 text-blue-500">
                              •
                            </span>
                            <span className="text-base sm:text-lg leading-relaxed">
                              {children}
                            </span>
                          </li>
                        ),
                      }}
                    >
                      {selectedPost.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute -top-20 left-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000 pointer-events-none" />
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Gaming;
