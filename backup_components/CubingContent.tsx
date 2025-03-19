import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import type { CubingContent as CubingContentType } from '../types';

const cubingContent: CubingContentType[] = [
  {
    title: "2x2 Speed Solve",
    image: "/assets/cube2.jpg",
    description: "Quick 2x2 solve using Ortega method.",
    videoUrl: "",
    cubeType: "2x2 Cube",
    solveTime: "3.21 seconds"
  },
  {
    title: "3x3 Speed Solve",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=2048&auto=format&fit=crop",
    description: "Personal best solve on the 3x3 Rubik's cube using CFOP method.",
    videoUrl: "https://www.youtube.com/embed/ERZ5y3xPcWw",
    cubeType: "3x3 Rubik's Cube",
    solveTime: "10.45 seconds"
  },
  {
    title: "4x4 Solve",
    image: "/assets/cube4.webp",
    description: "4x4 cube solve demonstration with Yau method.",
    videoUrl: "",
    cubeType: "4x4 Cube",
    solveTime: "45.32 seconds"
  },
 
  {
    title: "5x5 Solve",
    image: "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "5x5 cube solve with reduction method.",
    videoUrl: "",
    cubeType: "5x5 Cube",
    solveTime: "1:45.67"
  },
];

export const CubingContent: React.FC = () => {
  const [selectedCube, setSelectedCube] = useState<CubingContentType | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const displayedContent = showAll ? cubingContent : cubingContent.slice(0, 3);

  const openModal = (cube: CubingContentType) => {
    setSelectedCube(cube);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCube(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedContent.map((cube, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 150,
                damping: 15
              }}
              onClick={() => openModal(cube)}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer relative"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
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
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {cube.title}
                </h3>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-700 dark:text-gray-300 line-clamp-2 transition-all"
                >
                  {cube.description}
                </motion.p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium text-blue-500 dark:text-blue-400">Cube:</span> {cube.cubeType} <br />
                  <span className="font-medium text-purple-500 dark:text-purple-400">Time:</span> {cube.solveTime}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {cubingContent.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
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
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-4xl w-full relative"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 20
                }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition-all z-10"
                >
                  <X size={24} className="text-gray-800 dark:text-gray-200" />
                </button>

                <div className="aspect-video w-full">
                  <iframe
                    src={selectedCube.videoUrl}
                    title={selectedCube.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-8 space-y-4">
                  <motion.h3
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                  >
                    {selectedCube.title}
                  </motion.h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {selectedCube.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-blue-500 dark:text-blue-400 font-medium">Cube Type</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedCube.cubeType}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-purple-500 dark:text-purple-400 font-medium">Solve Time</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedCube.solveTime}</p>
                    </div>
                  </div>
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