import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SubjectGrid, ChapterGrid } from './components';
import { subjects, ITEMS_PER_PAGE } from '../../shared/constants/education';
import type { Subject } from '../../shared/types';

export const Education = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Add effect to handle browser back button for subject view
  useEffect(() => {
    if (selectedSubject) {
      // Push a new history entry when subject is selected
      window.history.pushState({ subjectSelected: true }, '', window.location.href);

      // Handle browser back button
      const handlePopState = () => {
        // Close the subject view when back button is pressed
        handleBack();
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [selectedSubject]);

  const handleSubjectClick = async (subject: Subject) => {
    setIsLoading(true);
    setSelectedSubject(subject);
    setCurrentPage(1);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handleBack = () => {
    setSelectedSubject(null);
    setCurrentPage(1);
  };

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
  };

  const getPaginatedChapters = () => {
    if (!selectedSubject) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return selectedSubject.chapters.slice(startIndex, endIndex);
  };

  const totalPages = selectedSubject 
    ? Math.ceil(selectedSubject.chapters.length / ITEMS_PER_PAGE) 
    : 0;

  return (
    <section
      id="Journey"
      className="py-20 bg-gray-50 dark:bg-[#020817] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            Academic Resources
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>
        
        {!selectedSubject ? (
          <SubjectGrid 
            subjects={subjects} 
            onSubjectClick={handleSubjectClick} 
          />
        ) : (
          <ChapterGrid
            selectedSubject={selectedSubject}
            currentPage={currentPage}
            totalPages={totalPages}
            chapters={getPaginatedChapters()}
            isLoading={isLoading}
            onBack={handleBack}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};