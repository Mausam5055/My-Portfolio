import React from 'react';
import { SubjectCard } from './SubjectCard';
import type { Subject } from '../../../shared/types';

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectClick: (subject: Subject) => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({ subjects, onSubjectClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onClick={onSubjectClick}
        />
      ))}
    </div>
  );
};