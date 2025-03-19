import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";
import type { Chapter } from "../data/subjects";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById(`chapter-${chapter.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [chapter.id]);

  const links = chapter.driveLink || [];

  return (
    <motion.div
      id={`chapter-${chapter.id}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className={cn(
        "group relative bg-white dark:bg-gray-900",
        "rounded-2xl overflow-hidden",
        "shadow-xl hover:shadow-2xl dark:hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]",
        "transform transition-all duration-300",
        "border-2 border-transparent hover:border-blue-500/20 dark:border-gray-800",
      )}
    >
      <div className="relative h-48 overflow-hidden">
        {/* Blur placeholder */}
        <div
          className={cn(
            "absolute inset-0 bg-gray-200 dark:bg-gray-700",
            "transition-opacity duration-300",
            imageLoaded ? "opacity-0" : "opacity-100",
          )}
        />
        {/* Loading indicator */}
        {!imageLoaded && isInView && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
              Loading...
            </p>
          </div>
        )}
        {/* Actual image */}
        {isInView && (
          <motion.img
            src={chapter.image}
            alt={chapter.title}
            className={cn(
              "w-full h-full object-cover",
              "transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/20 to-transparent" />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {chapter.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {chapter.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {links.length > 0 ? (
            links.map((link, partIndex) => (
              <motion.a
                key={partIndex}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5",
                  "bg-blue-100 dark:bg-blue-900/30",
                  "text-blue-700 dark:text-blue-400",
                  "rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50",
                  "border border-blue-200 dark:border-blue-800",
                  "transition-colors duration-200",
                  "text-sm",
                )}
              >
                <span>Part {partIndex + 1}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            ))
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterCard;
