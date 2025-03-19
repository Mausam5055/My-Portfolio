import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import type { GalleryImage } from '../types';

const galleryImages: GalleryImage[] = [
  {
    "url": "assets/gallery/1.jpg",
    "title": "Himachal Pradesh",
    "description": "Land of the Gods,",
    "subphotos": [
        {
            "url": "assets/gallery/1.jpg",
            "title": "Desktop Setup",
            "description": "Minimalist desk arrangement for maximum productivity"
        },
        {
            "url": "assets/gallery/2.jpg",
            "title": "Code Editor",
            "description": "Where the magic happens"
        },
        {
            "url": "assets/gallery/3.jpg",
            "title": "Creative Tools",
            "description": "Essential tools for creative work"
        },
        {
          "url": "assets/gallery/19.jpg",
          "title": "Creative Tools",
          "description": "Essential tools for creative work"
      },
      {
        "url": "assets/gallery/15.jpg",
        "title": "Creative Tools",
        "description": "Essential tools for creative work"
    },
    {
      "url": "assets/gallery/16.jpg",
      "title": "Creative Tools",
      "description": "Essential tools for creative work"
  },
  {
    "url": "assets/gallery/17.jpg",
    "title": "Creative Tools",
    "description": "Essential tools for creative work"
},
{
  "url": "assets/gallery/18.jpg",
  "title": "Creative Tools",
  "description": "Essential tools for creative work"
}
    ]
  },
  {
    url: "assets/gallery/4.jpg",
    title: "Amritsar",
    description: "the spiritual and cultural heart of Punjab",
    subphotos: [
      {
        url: "assets/gallery/4.jpg",
        title: "Morning Coffee",
        description: "Starting the day right"
      },
      {
        url: "assets/gallery/5.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review"
      },
      {
        url: "assets/gallery/6.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review"
      }
    ]
  },
  {
    url: "assets/gallery/7.jpg",
    title: "Digital Art Setup",
    description: "Where digital artworks are created",
    subphotos: [
      {
        url: "assets/gallery/7.jpg",
        title: "Drawing Tablet",
        description: "Essential tool for digital art"
      },
      {
        url: "assets/gallery/9.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces"
      }, {
        url: "assets/gallery/8.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces"
      }
    ]
  },
  {
    url: "assets/gallery/12.jpg",
    title: "Friends",
    description: "Friends are the family we choose, bringing joy, support, and unforgettable memories into our lives.",
    subphotos: [
      {
        url: "assets/gallery/12.jpg",
        title: "Color Palette",
        description: "Exploring color combinations"
      },
      {
        url: "assets/gallery/11.jpg",
        title: "Design Process",
        description: "From inspiration to creation"
      },
      {
        url: "assets/gallery/10.jpg",
        title: "Design Process",
        description: "From inspiration to creation"
      }
    ]
  }
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentSubphotoIndex, setCurrentSubphotoIndex] = useState(0);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentSubphotoIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentSubphotoIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextSubphoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage?.subphotos) {
      setCurrentSubphotoIndex((prev) => 
        (prev + 1) % selectedImage.subphotos!.length
      );
    }
  };

  const prevSubphoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage?.subphotos) {
      setCurrentSubphotoIndex((prev) => 
        prev === 0 ? selectedImage.subphotos!.length - 1 : prev - 1
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedImage) return;

    switch (event.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevSubphoto(event as any);
        break;
      case 'ArrowRight':
        nextSubphoto(event as any);
        break;
    }
  };

  return (
    <section 
      id="gallery" 
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)" // Light yellow accent in light theme
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
            Gallery
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => openModal(image)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden",
                "shadow-xl group cursor-pointer",
                "transform transition-all duration-300",
                "border-2 border-white/10 dark:border-gray-700/50"
              )}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className={cn(
  "absolute inset-0",
  "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
  "opacity-100 md:opacity-0 md:group-hover:opacity-100", // Changed here
  "transition-opacity duration-300",
  "flex flex-col items-center justify-end p-4"
)}>
                <h3 className="text-white font-semibold text-lg text-center mb-2">
                  {image.title}
                </h3>
                <p className="text-white/80 text-sm text-center line-clamp-2">
                  {image.description}
                </p>
                {image.subphotos && (
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <Search className="text-white w-5 h-5" />
                    <span className="text-white/80 text-sm">
                      +{image.subphotos.length}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className={cn(
                "fixed inset-0 z-50",
                "bg-black/95 backdrop-blur-md",
                "flex items-center justify-center",
                "p-4 md:p-8"
              )}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-white dark:bg-gray-900",
                  "rounded-xl overflow-hidden",
                  "max-w-6xl w-full",
                  "relative shadow-2xl",
                  "flex flex-col"
                )}
                style={{ maxHeight: '90vh' }}
              >
                <div className="relative flex-1">
                  <motion.div
                    key={currentSubphotoIndex}
                    initial={{ opacity: 0, x: selectedImage.subphotos ?  50 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: selectedImage.subphotos ? -50 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex items-center justify-center"
                  >
                    <img
                      src={selectedImage.subphotos 
                        ? selectedImage.subphotos[currentSubphotoIndex].url 
                        : selectedImage.url}
                      alt={selectedImage.subphotos
                        ? selectedImage.subphotos[currentSubphotoIndex].title
                        : selectedImage.title}
                      className="w-full max-h-[70vh] object-contain"
                      loading="lazy"
                    />
                  </motion.div>

                  {selectedImage.subphotos && selectedImage.subphotos.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSubphoto}
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2",
                          "p-2 md:p-3 rounded-full",
                          "bg-black/50 hover:bg-black/70",
                          "text-white",
                          "transition-all duration-200"
                        )}
                      >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSubphoto}
                        className={cn(
                          "absolute right-4 top-1/2 -translate-y-1/2",
                          "p-2 md:p-3 rounded-full",
                          "bg-black/50 hover:bg-black/70",
                          "text-white",
                          "transition-all duration-200"
                        )}
                      >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                      </motion.button>
                    </>
                  )}
                </div>

                {selectedImage.subphotos && (
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex overflow-x-auto pb-2 space-x-3 snap-x">
                      {selectedImage.subphotos.map((subphoto, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentSubphotoIndex(index)}
                          className={cn(
                            "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden",
                            "focus:outline-none focus:ring-2 focus:ring-green-500",
                            "border-2 transition-all duration-200",
                            currentSubphotoIndex === index 
                              ? "ring-2 ring-green-500 dark:ring-green-400 border-transparent scale-105"
                              : "border-white/10 dark:border-gray-700/50"
                          )}
                        >
                          <img
                            src={subphoto.url}
                            alt={subphoto.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};