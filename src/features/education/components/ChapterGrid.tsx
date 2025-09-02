import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ChapterCard } from './ChapterCard';
import { Pagination } from './Pagination';
import { LoadingSpinner } from '../../../components/ui';
import type { Subject, Chapter } from '../../../shared/types';

interface ChapterGridProps {
  selectedSubject: Subject;
  currentPage: number;
  totalPages: number;
  chapters: Chapter[];
  isLoading: boolean;
  onBack: () => void;
  onPageChange: (page: number) => void;
}

export const ChapterGrid: React.FC<ChapterGridProps> = ({
  selectedSubject,
  currentPage,
  totalPages,
  chapters,
  isLoading,
  onBack,
  onPageChange
}) => {
  const chaptersRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <motion.button
        onClick={onBack}
        className="mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        whileHover={{ x: -5 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Subjects</span>
      </motion.button>

      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8"
      >
        {selectedSubject.name}
      </motion.h3>

      <div ref={chaptersRef} className="transition-all duration-300 ease-in-out">
        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {chapters.map((chapter, index) => (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChapterCard chapter={chapter} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};