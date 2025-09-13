import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionType } from '../shared/types';

interface UseGlobalBackProps {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  sectionRefs: {
    [K in SectionType]: React.RefObject<HTMLDivElement>;
  };
  isDetailsPage?: boolean;
}

// Function to detect if the device is mobile
const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

export const useGlobalBack = ({ currentSection, setCurrentSection, sectionRefs, isDetailsPage = false }: UseGlobalBackProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to disable scroll animations
  const disableScrollAnimations = () => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.overscrollBehavior = 'none';
  };

  // Helper function to restore scroll animations (only for desktop)
  const restoreScrollAnimations = () => {
    if (!isMobileDevice()) {
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
        document.documentElement.style.overscrollBehavior = '';
      }, 100);
    }
  };

  const scrollToSection = (section: SectionType) => {
    // Don't update if we're already in that section
    if (currentSection === section) return;

    // Update URL without triggering a scroll
    navigate(`/${section}`, { 
      state: { 
        scrollToSection: section,
        directNavigation: true,
        from: currentSection,
        forceSection: section
      },
      replace: true
    });
    
    // Update section immediately
    setCurrentSection(section);
    
    // Find and scroll to the section element
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      // Always use instant scroll on mobile, smooth on desktop
      if (isMobileDevice()) {
        disableScrollAnimations();
        sectionElement.scrollIntoView({ behavior: 'instant' });
      } else {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    // For now, we'll just scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { scrollToSection, handleBack };
};