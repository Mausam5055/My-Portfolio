import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import type { GalleryImage } from "../types";

// This would typically come from your data source
const galleryImages: GalleryImage[] = [
  {
    url: "/assets/gallery/1.jpg",
    title: "Himachal Pradesh",
    description: "Land of the Gods, nestled in the Himalayas with snow-capped peaks, pristine valleys, and ancient temples that showcase the rich cultural heritage of India's northern paradise.",
    subphotos: [
      {
        url: "/assets/gallery/1.jpg",
        title: "Desktop Setup",
        description: "Minimalist desk arrangement for maximum productivity",
      },
      {
        url: "/assets/gallery/2.jpg",
        title: "Code Editor",
        description: "Where the magic happens",
      },
      {
        url: "/assets/gallery/3.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "/assets/gallery/19.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "/assets/gallery/15.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "/assets/gallery/16.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      // {
      //   url: "/assets/gallery/17.jpg",
      //   title: "Creative Tools",
      //   description: "Essential tools for creative work",
      // },
      // {
      //   url: "/assets/gallery/18.jpg",
      //   title: "Creative Tools",
      //   description: "Essential tools for creative work",
      // },
    ],
  },
  {
    url: "/assets/gallery/4.jpg",
    title: "Amritsar",
    description: "The spiritual and cultural heart of Punjab, home to the magnificent Golden Temple, where devotion meets tradition in a city that resonates with historical significance and vibrant Punjabi culture.",
    subphotos: [
      {
        url: "/assets/gallery/4.jpg",
        title: "Morning Coffee",
        description: "Starting the day right",
      },
      {
        url: "/assets/gallery/5.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review",
      },
      {
        url: "/assets/gallery/6.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review",
      },
    ],
  },
  {
    url: "/assets/gallery/7.jpg",
    title: "Digital Art Setup",
    description: "A creative sanctuary equipped with cutting-edge tools and technology, where imagination flows freely and digital masterpieces come to life through artistic expression and technical precision.",
    subphotos: [
      {
        url: "/assets/gallery/7.jpg",
        title: "Drawing Tablet",
        description: "Essential tool for digital art",
      },
      {
        url: "/assets/gallery/9.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces",
      },
      {
        url: "/assets/gallery/8.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces",
      },
    ],
  },
  {
    url: "/assets/gallery/12.jpg",
    title: "Friends",
    description: "Friends are the family we choose, bringing joy, support, and unforgettable memories into our lives. They're the companions who share our journey, celebrate our victories, and stand by us through life's challenges.",
    subphotos: [
      {
        url: "/assets/gallery/12.jpg",
        title: "Color Palette",
        description: "Exploring color combinations",
      },
      {
        url: "/assets/gallery/11.jpg",
        title: "Design Process",
        description: "From inspiration to creation",
      },
      {
        url: "/assets/gallery/10.jpg",
        title: "Design Process",
        description: "From inspiration to creation",
      },
    ],
  },
];

export const GalleryDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSubphotoIndex, setCurrentSubphotoIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide navbar when component mounts and show it when unmounts
  useEffect(() => {
    // Hide navbar
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Cleanup function to show navbar when component unmounts
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  // Find the gallery image based on the ID
  const galleryImage = galleryImages.find((img) => img.url === `/assets/gallery/${id}.jpg`);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!galleryImage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image not found</h1>
          <button
            onClick={() => navigate("/#gallery")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const nextSubphoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryImage.subphotos) {
      setCurrentSubphotoIndex((prev) => (prev + 1) % galleryImage.subphotos!.length);
    }
  };

  const prevSubphoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (galleryImage.subphotos) {
      setCurrentSubphotoIndex((prev) =>
        prev === 0 ? galleryImage.subphotos!.length - 1 : prev - 1
      );
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryImage.subphotos) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevSubphoto();
          break;
        case 'ArrowRight':
          nextSubphoto();
          break;
        case 'Escape':
          handleBack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImage.subphotos]);

  const handleBack = () => {
    // Navigate with scroll state and replace the current history entry
    navigate('/', { 
      state: { 
        scrollToGallery: true
      },
      replace: true
    });
  };

  useEffect(() => {
    // Add a new history entry when the component mounts
    window.history.pushState({ scrollToGallery: true }, '', window.location.href);

    // Handle browser back button
    const handlePopState = () => {
      // Prevent default navigation
      window.history.pushState({ scrollToGallery: true }, '', window.location.href);
      
      // Directly navigate to home with scroll state
      navigate('/', { 
        state: { scrollToGallery: true },
        replace: true
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!imageError ? (
            <motion.img
              key={currentSubphotoIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={galleryImage.subphotos ? galleryImage.subphotos[currentSubphotoIndex].url : galleryImage.url}
              alt={galleryImage.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">Failed to load image</p>
            </div>
          )}
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleBack}
          className="absolute top-6 left-6 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white transition-all duration-300 flex items-center gap-2 group"
        >
          <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back to Gallery</span>
        </motion.button>

        {/* Navigation Arrows */}
        {galleryImage.subphotos && galleryImage.subphotos.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={prevSubphoto}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white transition-all duration-300 z-10 group"
            >
              <ChevronLeft className="w-8 h-8 transition-transform group-hover:-translate-x-1" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={nextSubphoto}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white transition-all duration-300 z-10 group"
            >
              <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </>
        )}

        {/* Title, Description, and Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
        >
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Text Content */}
              <div className="flex-1 space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                >
                  {galleryImage.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg md:text-xl opacity-90 leading-relaxed line-clamp-2 md:line-clamp-none"
                >
                  {galleryImage.description}
                </motion.p>
                {galleryImage.subphotos && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-3 text-white/80 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit"
                  >
                    <span className="text-sm font-medium">
                      {currentSubphotoIndex + 1} / {galleryImage.subphotos.length}
                    </span>
                    <span className="text-sm">•</span>
                    <span className="text-sm font-medium">
                      {galleryImage.subphotos[currentSubphotoIndex].title}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Thumbnail Gallery */}
      {galleryImage.subphotos && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white flex items-center gap-2"
          >
            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            Gallery Collection
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImage.subphotos.map((subphoto, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setCurrentSubphotoIndex(index)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden cursor-pointer group",
                  "transform transition-all duration-500",
                  "hover:scale-105",
                  currentSubphotoIndex === index
                    ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg"
                    : ""
                )}
              >
                <img
                  src={subphoto.url}
                  alt={subphoto.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{subphoto.title}</h3>
                    <p className="text-sm opacity-90">{subphoto.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 