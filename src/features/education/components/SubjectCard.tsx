import React from 'react';
import { motion } from 'framer-motion';
import { Book, Atom, TestTube, Calculator, Code } from 'lucide-react';
import type { Subject } from '../../../shared/types';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

const getSubjectIcon = (iconName: string): React.ReactNode => {
  const Icon = (() => {
    switch (iconName) {
      case 'Book':
        return Book;
      case 'Atom':
        return Atom;
      case 'TestTube':
        return TestTube;
      case 'Calculator':
        return Calculator;
      case 'Code':
        return Code;
      default:
        return Book;
    }
  })();
  return (
    <div className="w-16 h-16 rounded-2xl bg-blue-100/80 dark:bg-[#1A1B4B] flex items-center justify-center shadow-sm">
      <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
    </div>
  );
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-[#0f172a] rounded-xl p-4 md:p-8 cursor-pointer border border-gray-200 dark:border-[#1e293b] hover:border-blue-500/30 transition-all duration-300"
      onClick={() => onClick(subject)}
    >
      <div className="flex flex-col items-center text-center">
        {getSubjectIcon(subject.icon)}
        <h3 className="mt-4 md:mt-6 text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">
          {subject.name}
        </h3>
        <p className="hidden md:block mt-2 text-gray-600 dark:text-gray-400 text-sm">
          {subject.description}
        </p>
      </div>
    </motion.div>
  );
};