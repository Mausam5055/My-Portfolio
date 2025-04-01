import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Target, Award, Brain, Star, Box, Zap, Play, X } from 'lucide-react';
import type { CubingContent } from '../types';
import { cubingContent } from '../data/cubingContent';

const methodIcons = {
  CFOP: <Brain className="w-5 h-5 text-purple-500" />,
  Ortega: <Zap className="w-5 h-5 text-blue-500" />,
  Yau: <Star className="w-5 h-5 text-yellow-500" />,
  Reduction: <Box className="w-5 h-5 text-green-500" />,
};

const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
};

export const CubeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const cube = cubingContent.find(c => c.id === id);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    // Store the current state in history
    const currentState = {
      from: location.state?.from || '/',
      scrollPosition: location.state?.scrollPosition || 0
    };

    // Replace the current history state
    window.history.replaceState(currentState, '', window.location.href);

    // Ensure we start at the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });

    return () => {
      // Clean up any stored state when leaving the page
      sessionStorage.removeItem('cubeDetailsScroll');
    };
  }, [location.state?.from, location.state?.scrollPosition]);

  useEffect(() => {
    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state?.scrollPosition) {
        window.scrollTo(0, state.scrollPosition);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use browser's history to go back
    window.history.back();
  };

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
  };

  if (!cube) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cube not found</h1>
          <button
            onClick={() => navigate('/', { state: { scrollToCubing: true } })}
            className="text-blue-500 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={cube.image}
            alt={cube.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-white dark:to-gray-900" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              {cube.title}
            </h1>
            <div className={`inline-block px-6 py-3 rounded-full text-white text-lg font-medium ${difficultyColors[cube.difficulty]} drop-shadow-lg`}>
              {cube.difficulty.charAt(0).toUpperCase() + cube.difficulty.slice(1)}
            </div>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBackClick}
          className="absolute top-4 md:top-8 left-4 md:left-8 flex items-center gap-1 md:gap-2 text-white hover:text-blue-200 transition-colors bg-black/20 backdrop-blur-sm px-2 md:px-4 py-1.5 md:py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
          <span className="text-sm md:text-lg">Back</span>
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Video and Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tutorial Video
              </h2>
              <div 
                onClick={handleVideoClick}
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
              >
                <img
                  src={cube.image}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-gray-900" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {cube.content.description}
              </p>
            </motion.div>
          </div>

          {/* Sidebar - Stats and Tips */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {cube.method && methodIcons[cube.method as keyof typeof methodIcons]}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Method</p>
                  <p className="font-medium text-gray-900 dark:text-white">{cube.method}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Clock className="w-4 h-4 text-blue-500" />
                    </div>
                    <span>Solve Time</span>
                  </div>
                  <p className="text-2xl font-semibold text-blue-500 dark:text-blue-400">
                    {cube.solveTime}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Award className="w-4 h-4 text-green-500" />
                    </div>
                    <span>Personal Best</span>
                  </div>
                  <p className="text-2xl font-semibold text-green-500 dark:text-green-400">
                    {cube.personalBest}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Tips
              </h2>
              <ul className="space-y-4">
                {cube.content.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mt-1">
                      <Target className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Algorithms Section - Full Width */}
          <div className="lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Algorithms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cube.content.algorithms.map((algo, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {algo.name}
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="font-mono text-lg text-blue-500 dark:text-blue-400">
                        {algo.notation}
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {algo.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden bg-black"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${cube.videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CubeDetails; 