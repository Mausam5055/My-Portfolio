import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Artwork as ArtworkType } from '../types';

const artworks: ArtworkType[] = [
  {
    title: "Digital Landscape",
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A vibrant digital landscape exploring the intersection of nature and technology.",
    medium: "Digital Art",
    year: "2024",
    dimensions: "3840 x 2160 px"
  },
  {
    title: "Abstract Composition",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    description: "An abstract composition featuring geometric shapes and organic forms.",
    medium: "Mixed Media",
    year: "2023",
    dimensions: "4000 x 3000 px"
  },
  {
    title: "Portrait Study",
    image: "https://images.unsplash.com/photo-1493210977798-4f655ac200a9?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A digital portrait study exploring light and shadow.",
    medium: "Digital Painting",
    year: "2024",
    dimensions: "2400 x 3200 px"
  }
];

export const Artwork: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkType | null>(null);

  const openModal = (artwork: ArtworkType) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="Artworks" className="py-20 bg-white dark:bg-gray-900">
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
                             className="text-4xl md:text-5xl font-bold text-black dark:text-white" // Set to black in light mode and white in dark mode
                           >
                            Artworks
                           </motion.h2>
                           <motion.div
                             initial={{ width: 0 }}
                             whileInView={{ width: "120px" }}
                             transition={{ duration: 0.8, delay: 0.2 }}
                             className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
                           />
                         </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
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
              onClick={() => openModal(artwork)}
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
                  src={artwork.image}
                  alt={artwork.title}
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
                  {artwork.title}
                </h3>
                <motion.p
                  whileHover={{ x: 5 }}
                  className="text-gray-700 dark:text-gray-300 line-clamp-2 transition-all"
                >
                  {artwork.description}
                </motion.p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium text-blue-500 dark:text-blue-400">Medium:</span> {artwork.medium} <br />
                  <span className="font-medium text-purple-500 dark:text-purple-400">Year:</span> {artwork.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 px-4"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full relative border-2 border-blue-500/20"
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
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition-all"
                >
                  <X size={24} className="text-gray-800 dark:text-gray-200" />
                </button>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative overflow-hidden"
                >
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </motion.div>

                <div className="p-8 space-y-4">
                  <motion.h3
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                  >
                    {selectedArtwork.title}
                  </motion.h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {selectedArtwork.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-blue-500 dark:text-blue-400 font-medium">Medium</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedArtwork.medium}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-purple-500 dark:text-purple-400 font-medium">Year</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedArtwork.year}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-pink-500 dark:text-pink-400 font-medium">Dimensions</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedArtwork.dimensions}</p>
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