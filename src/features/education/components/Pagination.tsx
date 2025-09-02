import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../shared/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;

  return (
    <motion.div 
      className="flex justify-center mt-8 space-x-2 overflow-x-auto px-4 py-2 -mx-4 sm:mx-0 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <motion.button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "px-4 py-2 rounded-md text-sm transition-all duration-200 min-w-[40px]",
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-200 dark:border-blue-500/20"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      ))}
    </motion.div>
  );
};