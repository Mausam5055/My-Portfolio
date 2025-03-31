import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Play, Clock, User } from "lucide-react";
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
    title: "Spider-Man: Miles Morales – Ultimate Web-Swinging Experience",
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
  const isNavigating = useRef(false);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  const handleBackClick = () => {
    // Store current scroll position
    const currentScroll = window.scrollY;
    // Navigate to home with hash
    navigate('/#gaming', { 
      state: { 
        scrollPosition: currentScroll,
        fromGameDetail: true 
      }
    });
  };

  useEffect(() => {
    if (isNavigating.current) {
      const gamingSection = document.getElementById('gaming');
      if (gamingSection) {
        const yOffset = -100; // Adjust this value to account for any fixed headers
        const y = gamingSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
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
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl"
            >
              <motion.button
                whileHover={{ x: -5 }}
                onClick={handleBackClick}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-8"
              >
                <ArrowLeft size={20} />
                <span>Back to Games</span>
              </motion.button>

              <div className="flex items-center gap-6 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{game.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{game.author}</span>
                </div>
              </div>

              <p className="text-lg text-white/90 max-w-2xl">
                {game.excerpt}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gameplay Videos Sidebar - Now larger on desktop */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                <Play className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                Gameplay Highlights
              </h2>
              <div className="space-y-8">
                {game.timeline.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div 
                      className="aspect-video relative group cursor-pointer"
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
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-20 h-20 text-white" />
                          </div>
                          <img
                            src={`https://img.youtube.com/vi/${item.videoUrl.split('/').pop()?.split('?')[0]}/maxresdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </>
                      )}
                    </div>

                    <div className="p-4 lg:p-6 lg:pl-8">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                          {item.timestamp}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content - Now more compact and right-aligned on desktop */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose dark:prose-invert max-w-none lg:max-w-xl lg:ml-auto"
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-gray-900 dark:text-white tracking-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl lg:text-2xl font-semibold mt-8 lg:mt-10 mb-4 lg:mb-6 text-gray-900 dark:text-white tracking-tight">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed text-base lg:text-lg font-light">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-4 lg:space-y-5 my-6 lg:my-8 pl-5 list-outside">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="relative pl-6 mb-2 lg:mb-3 text-gray-700 dark:text-gray-300">
                      <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                      <span className="text-base lg:text-lg leading-relaxed font-light">{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-gray-900 dark:text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-700 dark:text-gray-300 italic">
                      {children}
                    </em>
                  ),
                }}
              >
                {game.content}
              </ReactMarkdown>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail; 