import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, Clock, Target, Award, Box, Brain, Star, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import type { CubingContent as CubingContentType } from "../types";

const cubingContent: CubingContentType[] = [
  {
    title: "2x2 Speed Solve",
    image: "/assets/cube2.jpg",
    description: "Quick 2x2 solve using Ortega method.",
    videoUrl: "",
    cubeType: "2x2 Cube",
    solveTime: "3.21 seconds",
    method: "Ortega",
    difficulty: "intermediate",
    personalBest: "2.89 seconds"
  },
  {
    title: "3x3 Speed Solve",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=2048&auto=format&fit=crop",
    description: "Personal best solve on the 3x3 Rubik's cube using CFOP method.",
    videoUrl: "https://www.youtube.com/embed/ERZ5y3xPcWw",
    cubeType: "3x3 Rubik's Cube",
    solveTime: "10.45 seconds",
    method: "CFOP",
    difficulty: "advanced",
    personalBest: "9.87 seconds"
  },
  {
    title: "4x4 Solve",
    image: "/assets/cube4.webp",
    description: "4x4 cube solve demonstration with Yau method.",
    videoUrl: "",
    cubeType: "4x4 Cube",
    solveTime: "45.32 seconds",
    method: "Yau",
    difficulty: "advanced",
    personalBest: "42.15 seconds"
  },
  {
    title: "5x5 Solve",
    image: "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "5x5 cube solve with reduction method.",
    videoUrl: "",
    cubeType: "5x5 Cube",
    solveTime: "1:45.67",
    method: "Reduction",
    difficulty: "advanced",
    personalBest: "1:40.23"
  },
];

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
  const [selectedCube, setSelectedCube] = useState<CubingContentType | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cubingContent.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedContent = cubingContent.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openModal = (cube: CubingContentType) => {
    setSelectedCube(cube);
    setIsVideoLoading(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCube(null);
    document.body.style.overflow = "unset";
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              onClick={() => openModal(cube)}
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
          {selectedCube && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 px-4"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/90 dark:bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition-all z-10"
                >
                  <X size={24} className="text-gray-800 dark:text-gray-200" />
                </button>

                <div className="aspect-video w-full relative">
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  {selectedCube.videoUrl ? (
                    <iframe
                      src={selectedCube.videoUrl}
                      title={selectedCube.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={handleVideoLoad}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <p className="text-gray-500 dark:text-gray-400">No video available</p>
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <motion.h3
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                    >
                      {selectedCube.title}
                    </motion.h3>
                    {selectedCube.difficulty && (
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${difficultyColors[selectedCube.difficulty]}`}>
                        {selectedCube.difficulty.charAt(0).toUpperCase() + selectedCube.difficulty.slice(1)}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {selectedCube.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-blue-500 dark:text-blue-400 font-medium flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Cube Type
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedCube.cubeType}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-purple-500 dark:text-purple-400 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Solve Time
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedCube.solveTime}
                      </p>
                    </div>
                    {selectedCube.method && (
                      <div className="space-y-1">
                        <p className="text-green-500 dark:text-green-400 font-medium flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Method
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedCube.method}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {selectedCube.personalBest && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-blue-500 dark:text-blue-400 font-medium flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Personal Best
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {selectedCube.personalBest}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CubingContent;
