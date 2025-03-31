import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Play, Clock, User, ChevronRight, ChevronLeft, Share2, Bookmark, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";

type GameTimelineItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  videoUrl: string;
};

type GameDetail = {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  timeline: GameTimelineItem[];
};

// This would typically come from an API or database
const gameDetails: Record<string, GameDetail> = {
  "spider-man": {
    id: "1",
    title: "Spider-Man: Miles Morales ",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800",
    excerpt: "Watch my thrilling gameplay of Spider-Man: Miles Morales with epic web-swinging and combat!",
    content: `# Spider-Man: Miles Morales

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

Join me as I showcase the most exciting moments from my playthrough, including epic boss battles, stealth missions, and heart-pounding chase sequences. Get ready for an unforgettable Spider-Man experience! 🕷️🔥`,
    date: "2024-03-20",
    author: "Mausam Kar",
    timeline: [
      {
        id: "1",
        title: "Opening Sequence",
        description: "Experience the thrilling opening sequence as Miles Morales takes on his first major challenge.",
        timestamp: "0:00",
        videoUrl: "https://www.youtube.com/embed/26QPeXoWzLM?start=0"
      },
      {
        id: "2",
        title: "Web-Swinging Mastery",
        description: "Master the art of traversal across Manhattan with fluid web-swinging mechanics.",
        timestamp: "5:30",
        videoUrl: "https://www.youtube.com/embed/26QPeXoWzLM?start=330"
      },
      {
        id: "3",
        title: "Combat Showcase",
        description: "Witness electrifying combat sequences featuring Miles' unique Venom powers.",
        timestamp: "12:45",
        videoUrl: "https://www.youtube.com/embed/26QPeXoWzLM?start=765"
      }
    ]
  },
  "bgmi": {
    id: "2",
    title: "BGMI – Intense Battle Royale Action",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    excerpt: "Epic BGMI gameplay showcasing intense gunfights and survival tactics!",
    content: `# BGMI – Battlegrounds Mobile India

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

Experience the thrill of intense firefights, strategic gameplay, and those heart-stopping moments that make BGMI so addictive. From early game drops to final circle battles, this gameplay has it all! 🎯🔥`,
    date: "2024-03-18",
    author: "Mausam Kar",
    timeline: [
      {
        id: "1",
        title: "Early Game Drop",
        description: "Strategic landing and initial loot collection in high-risk zones.",
        timestamp: "0:00",
        videoUrl: "https://www.youtube.com/embed/W5ueSz1I9cY?start=0"
      },
      {
        id: "2",
        title: "Mid-Game Action",
        description: "Intense firefights and squad coordination during the mid-game phase.",
        timestamp: "3:45",
        videoUrl: "https://www.youtube.com/embed/W5ueSz1I9cY?start=225"
      },
      {
        id: "3",
        title: "Final Circle Battle",
        description: "Heart-pounding endgame scenarios and clutch victories.",
        timestamp: "8:30",
        videoUrl: "https://www.youtube.com/embed/W5ueSz1I9cY?start=510"
      }
    ]
  },
  "asphalt-9": {
    id: "3",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    excerpt: "Experience the adrenaline rush of Asphalt 9: Legends with breathtaking races and stunning visuals!",
    content: `# Asphalt 9: Legends

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

Join me as I push these incredible machines to their limits, pulling off insane drifts, perfect nitro boosts, and securing victory in the most intense races! 🏎️🔥`,
    date: "2024-03-15",
    author: "Mausam Kar",
    timeline: [
      {
        id: "1",
        title: "Race Start",
        description: "Perfect launch and initial acceleration techniques.",
        timestamp: "0:00",
        videoUrl: "https://www.youtube.com/embed/diznkP7_iEo?start=0"
      },
      {
        id: "2",
        title: "Drift Mastery",
        description: "Advanced drifting techniques and cornering strategies.",
        timestamp: "2:15",
        videoUrl: "https://www.youtube.com/embed/diznkP7_iEo?start=135"
      },
      {
        id: "3",
        title: "Nitro Boost",
        description: "Strategic nitro usage and overtaking maneuvers.",
        timestamp: "5:45",
        videoUrl: "https://www.youtube.com/embed/diznkP7_iEo?start=345"
      }
    ]
  }
};

export const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const game = gameDetails[gameId || ""];
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const isNavigating = useRef(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const isDetailsPage = location.pathname.startsWith('/projects/') || location.pathname.startsWith('/games/') || location.pathname.startsWith('/blog/');

  const handleVideoClick = (videoId: string) => {
    setPlayingVideoId(videoId);
    setIsVideoExpanded(true);
  };

  const handleBackClick = () => {
    // Ensure instant navigation without any scroll effects
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    navigate('/', { 
      state: { 
        scrollToGaming: true
      },
      replace: true
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: game.excerpt,
        url: window.location.href
      });
    }
  };

  useEffect(() => {
    if (isNavigating.current) {
      const gamingSection = document.getElementById('gaming');
      if (gamingSection) {
        // Simple scroll to gaming section
        const yOffset = -100;
        const y = gamingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }, 100);
      }
      isNavigating.current = false;
    }
  }, [location.pathname]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Game not found</h1>
          <motion.button
            whileHover={{ x: -5 }}
            onClick={handleBackClick}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mx-auto"
          >
            <ArrowLeft size={20} />
            <span>Back to Games</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="container mx-auto px-4">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <motion.button
                  whileHover={{ x: -5 }}
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-white/80 hover:text-white mb-8"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Games</span>
                </motion.button>

                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <Clock size={18} />
                      <span>{game.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span>{game.author}</span>
                    </div>
                  </div>

                  <p className="text-xl text-white/90">
                    {game.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(0)}
                      className={`px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
                        activeSection === 0
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      <Play size={20} className={activeSection === 0 ? "animate-pulse" : ""} />
                      <span className="font-medium tracking-wide">Watch Gameplay</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(1)}
                      className={`px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center gap-2 ${
                        activeSection === 1
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      <BookOpen size={20} className={activeSection === 1 ? "animate-pulse" : ""} />
                      <span className="font-medium tracking-wide">Read More</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-end justify-between">
              {/* Left side content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl"
              >
                <motion.button
                  whileHover={{ x: -5 }}
                  onClick={handleBackClick}
                  className="flex items-center gap-2 text-white/80 hover:text-white mb-12 group"
                >
                  <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-sm font-medium tracking-wide uppercase">Back to Games</span>
                </motion.button>

                <div className="space-y-8">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold text-white tracking-tight leading-tight"
                  >
                    {game.title}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-white/90 leading-relaxed font-light"
                  >
                    {game.excerpt}
                  </motion.p>
                </div>
              </motion.div>

              {/* Right side content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-8 text-white/80"
              >
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Clock size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-wide uppercase opacity-60">Date</span>
                    <span className="text-lg">{game.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <User size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-wide uppercase opacity-60">Author</span>
                    <span className="text-lg">{game.author}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        {/* Content Area */}
        <div className="container mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            {/* Desktop View - Always show gameplay with overview */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-8"
              >
                {/* Video Grid */}
                <div className="space-y-8">
                  {game.timeline.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                    >
                      <div 
                        className="aspect-video relative cursor-pointer"
                        onClick={() => handleVideoClick(item.id)}
                      >
                        {playingVideoId === item.id ? (
                          <iframe
                            src={item.videoUrl}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={item.title}
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                              <Play className="w-20 h-20 text-white transform group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <img
                              src={`https://img.youtube.com/vi/${item.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                              alt={item.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                            {item.timestamp}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Game Overview - Always visible on desktop */}
                <div className="sticky top-24">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-transparent dark:bg-transparent p-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Game Overview
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight flex items-center gap-3">
                              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                              {children}
                            </h2>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="space-y-4 my-8">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-lg group">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 group-hover:scale-150 transition-transform duration-300" />
                              <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{children}</span>
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-gray-900 dark:text-white font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="text-gray-600 dark:text-gray-300 italic">
                              {children}
                            </em>
                          ),
                        }}
                      >
                        {game.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Mobile View - Toggle between gameplay and details */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                {activeSection === 0 ? (
                  <motion.div
                    key="gameplay"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {game.timeline.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                      >
                        <div 
                          className="aspect-video relative cursor-pointer"
                          onClick={() => handleVideoClick(item.id)}
                        >
                          {playingVideoId === item.id ? (
                            <iframe
                              src={item.videoUrl}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={item.title}
                            />
                          ) : (
                            <>
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                                <Play className="w-20 h-20 text-white transform group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <img
                                src={`https://img.youtube.com/vi/${item.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                              {item.timestamp}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-4xl mx-auto"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="prose dark:prose-invert max-w-none"
                    >
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight flex items-center gap-3">
                              <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                              {children}
                            </h2>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="space-y-4 my-8">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-lg group">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 group-hover:scale-150 transition-transform duration-300" />
                              <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">{children}</span>
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="text-gray-900 dark:text-white font-semibold">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="text-gray-600 dark:text-gray-300 italic">
                              {children}
                            </em>
                          ),
                        }}
                      >
                        {game.content}
                      </ReactMarkdown>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded Video Modal */}
      <AnimatePresence>
        {isVideoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoExpanded(false)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <span className="sr-only">Close</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <iframe
                src={game.timeline.find(item => item.id === playingVideoId)?.videoUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Gameplay Video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDetail; 