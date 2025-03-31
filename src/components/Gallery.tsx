import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import type { GalleryImage } from "../types";

const galleryImages: GalleryImage[] = [
  {
    url: "assets/gallery/1.jpg",
    title: "Himachal Pradesh",
    description: "Land of the Gods,",
    subphotos: [
      {
        url: "assets/gallery/1.jpg",
        title: "Desktop Setup",
        description: "Minimalist desk arrangement for maximum productivity",
      },
      {
        url: "assets/gallery/2.jpg",
        title: "Code Editor",
        description: "Where the magic happens",
      },
      {
        url: "assets/gallery/3.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "assets/gallery/19.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "assets/gallery/15.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "assets/gallery/16.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "assets/gallery/17.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
      {
        url: "assets/gallery/18.jpg",
        title: "Creative Tools",
        description: "Essential tools for creative work",
      },
    ],
  },
  {
    url: "assets/gallery/4.jpg",
    title: "Amritsar",
    description: "the spiritual and cultural heart of Punjab",
    subphotos: [
      {
        url: "assets/gallery/4.jpg",
        title: "Morning Coffee",
        description: "Starting the day right",
      },
      {
        url: "assets/gallery/5.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review",
      },
      {
        url: "assets/gallery/6.jpg",
        title: "Code Review",
        description: "Ensuring quality through careful review",
      },
    ],
  },
  {
    url: "assets/gallery/7.jpg",
    title: "Digital Art Setup",
    description: "Where digital artworks are created",
    subphotos: [
      {
        url: "assets/gallery/7.jpg",
        title: "Drawing Tablet",
        description: "Essential tool for digital art",
      },
      {
        url: "assets/gallery/9.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces",
      },
      {
        url: "assets/gallery/8.jpg",
        title: "Art Process",
        description: "Creating digital masterpieces",
      },
    ],
  },
  {
    url: "assets/gallery/12.jpg",
    title: "Friends",
    description:
      "Friends are the family we choose, bringing joy, support, and unforgettable memories into our lives.",
    subphotos: [
      {
        url: "assets/gallery/12.jpg",
        title: "Color Palette",
        description: "Exploring color combinations",
      },
      {
        url: "assets/gallery/11.jpg",
        title: "Design Process",
        description: "From inspiration to creation",
      },
      {
        url: "assets/gallery/10.jpg",
        title: "Design Process",
        description: "From inspiration to creation",
      },
    ],
  },
];

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scrolling to gallery section when returning from detail page
  useEffect(() => {
    if (location.state?.scrollToGallery) {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleImageClick = (imageId: string) => {
    // Prevent default scroll behavior
    window.scrollTo(0, 0);
    navigate(`/gallery/${imageId}`, { state: { fromGallery: true } });
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)",
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
                delayChildren: 0.2,
              },
            },
          }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleImageClick(image.url.split("/").pop()?.split(".")[0] || "")}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden",
                "shadow-xl group cursor-pointer",
                "transform transition-all duration-300",
                "border-2 border-white/10 dark:border-gray-700/50",
              )}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-t from-black/90 via-black/40 to-transparent",
                  "opacity-100 md:opacity-0 md:group-hover:opacity-100",
                  "transition-all duration-300",
                  "flex flex-col items-center justify-end p-2 sm:p-4",
                  "md:backdrop-blur-sm"
                )}
              >
                <h3 className="text-white font-semibold text-sm sm:text-lg text-center mb-0.5 sm:mb-2">
                  {image.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm text-center line-clamp-2">
                  {image.description}
                </p>
                {image.subphotos && (
                  <div className="mt-1 sm:mt-4 flex items-center justify-center space-x-1 sm:space-x-2 bg-black/30 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full">
                    <Search className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-white/90 text-xs sm:text-sm">
                      +{image.subphotos.length}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
