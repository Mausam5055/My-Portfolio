import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, Target, Award, Box, Brain, Star, Zap, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { CubingContent as CubingContentType } from "../types";
import { cubingContent } from "../data/cubingContent";

const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
};

const methodIcons = {
  CFOP: <Brain className="w-5 h-5 text-purple-500" />,
  Ortega: <Zap className="w-5 h-5 text-blue-500" />,
  Yau: <Star className="w-5 h-5 text-yellow-500" />,
  Reduction: <Box className="w-5 h-5 text-green-500" />,
};

const ITEMS_PER_PAGE = 3;

export const CubingContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(cubingContent.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedContent = cubingContent.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCubeClick = (id: string) => {
    navigate(`/cube/${id}`, {
      state: { from: '/all-cubing-content' },
      replace: false
    });
  };

  const handleShowMore = () => {
    // Scroll to top instantly before navigation
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    // Navigate to the new page
    navigate('/all-cubing-content', { 
      state: { scrollToTop: true },
      replace: false
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,204,0.1)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,204,0.05)_0%,_transparent_100%)]" />
      
      <div className="container mx-auto px-4 relative">
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
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Cubing Skills
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedContent.map((cube, index) => (
            <motion.div
              key={cube.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              onClick={() => handleCubeClick(cube.id)}
              className="group bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer relative h-full"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  src={cube.image}
                  alt={cube.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
                {cube.difficulty && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${difficultyColors[cube.difficulty]}`}>
                    {cube.difficulty.charAt(0).toUpperCase() + cube.difficulty.slice(1)}
                  </div>
                )}
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {cube.title}
                  </h3>
                  {cube.method && methodIcons[cube.method as keyof typeof methodIcons] && (
                    <div className="p-1.5 bg-white dark:bg-gray-700 rounded-full shadow-md">
                      {methodIcons[cube.method as keyof typeof methodIcons]}
                    </div>
                  )}
                </div>
                
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-700 dark:text-gray-300 line-clamp-2 transition-all mb-4"
                >
                  {cube.description}
                </motion.p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Clock className="w-4 h-4 text-blue-500" />
                      </div>
                      <span>Solve Time</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-500 dark:text-blue-400">
                      {cube.solveTime}
                    </p>
                  </div>

                  {cube.personalBest && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <Award className="w-4 h-4 text-green-500" />
                        </div>
                        <span>Personal Best</span>
                      </div>
                      <p className="text-lg font-semibold text-green-500 dark:text-green-400">
                        {cube.personalBest}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            {isMobile ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShowMore}
                className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                      : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                      : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CubingContent;
