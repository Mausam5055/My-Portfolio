import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../../shared/utils';
import { LoadingImageSkeleton } from '../../../components/ui';
import type { Chapter } from '../../../shared/types';

interface ChapterCardProps {
  chapter: Chapter;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-[#1e293b] bg-white dark:bg-[#0f172a] transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative h-48 w-full">
        {!imageLoaded && <LoadingImageSkeleton className="absolute inset-0 h-full w-full" />}
        <img
          src={chapter.image}
          alt={chapter.title}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent dark:from-[#0f172a] to-transparent" />
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {chapter.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {chapter.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chapter.driveLinks?.map((link, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20 transition-colors duration-200 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Part {index + 1}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};