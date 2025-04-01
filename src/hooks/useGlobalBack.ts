import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SectionType = 'home' | 'about' | 'journey' | 'qualifications' | 'certifications' | 'skills' | 'education' | 'gallery' | 'cubing' | 'blog' | 'futureGoals' | 'funFacts' | 'Gaming' | 'projects' | 'testimonials' | 'contact';

interface UseGlobalBackProps {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  sectionRefs: {
    [K in SectionType]: React.RefObject<HTMLDivElement>;
  };
}

export const useGlobalBack = ({ currentSection, setCurrentSection, sectionRefs }: UseGlobalBackProps) => {
  const [navigationStack, setNavigationStack] = useState<SectionType[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (section: SectionType) => {
    // Don't update if we're already in that section
    if (currentSection === section) return;

    // Update navigation stack
    setNavigationStack(prev => [...prev, currentSection]);

    // Update the URL with the section
    navigate(`/${section}`, { 
      state: { scrollToSection: section },
      replace: false
    });
    
    // Scroll to the section
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (sectionRefs[section]?.current) {
      sectionRefs[section].current?.scrollIntoView({ 
        behavior: 'instant',
        block: 'start'
      });
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      setCurrentSection(previousSection);
      
      // Update URL without triggering scroll
      navigate(`/${previousSection}`, { 
        state: { scrollToSection: previousSection, instant: true },
        replace: true
      });
    }
  };

  // Handle navigation and scroll restoration
  useEffect(() => {
    const state = location.state as { scrollToSection?: SectionType; instant?: boolean } | null;
    
    if (state?.scrollToSection) {
      const targetSection = state.scrollToSection;
      setCurrentSection(targetSection);
      
      // Only scroll if this is not an instant navigation
      if (!state.instant) {
        if (targetSection === 'home') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (sectionRefs[targetSection]?.current) {
          const targetScroll = sectionRefs[targetSection].current!.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetScroll,
            behavior: 'instant'
          });
        }
      }
    }
  }, [location.state]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        setCurrentSection(previousSection);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationStack]);

  return {
    navigationStack,
    scrollToSection,
    handleBack
  };
}; 