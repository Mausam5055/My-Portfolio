import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SectionType = 'home' | 'about' | 'journey' | 'qualifications' | 'certifications' | 'skills' | 'education' | 'gallery' | 'cubing' | 'blog' | 'futureGoals' | 'funFacts' | 'Gaming' | 'projects' | 'testimonials' | 'contact';

interface UseGlobalBackProps {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  sectionRefs: {
    [K in SectionType]: React.RefObject<HTMLDivElement>;
  };
  isDetailsPage?: boolean;
}

export const useGlobalBack = ({ currentSection, setCurrentSection, sectionRefs, isDetailsPage = false }: UseGlobalBackProps) => {
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
    
    // Direct navigation without scroll
    setCurrentSection(section);
  };

  const handleBack = () => {
    if (isDetailsPage) {
      // For detail pages, check if we have a specific "from" state
      const state = location.state as { from?: string } | null;
      if (state?.from) {
        // Direct navigation to the previous section
        navigate(state.from, { 
          state: { scrollToSection: state.from as SectionType },
          replace: true
        });
        setCurrentSection(state.from as SectionType);
      } else {
        // Fallback to browser back
        window.history.back();
      }
    } else if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      
      // Direct navigation to previous section
      navigate(`/${previousSection}`, { 
        state: { scrollToSection: previousSection },
        replace: true
      });
      setCurrentSection(previousSection);
    }
  };

  // Handle navigation state updates
  useEffect(() => {
    const state = location.state as { 
      scrollToSection?: SectionType;
      from?: string;
    } | null;
    
    if (state?.scrollToSection) {
      setCurrentSection(state.scrollToSection);
    }
  }, [location.state, setCurrentSection]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (isDetailsPage) {
        // For detail pages, check if we have a specific "from" state
        const state = location.state as { from?: string } | null;
        if (state?.from) {
          // Direct navigation to the previous section
          navigate(state.from, { 
            state: { scrollToSection: state.from as SectionType },
            replace: true
          });
          setCurrentSection(state.from as SectionType);
        } else {
          // Fallback to browser back
          window.history.back();
        }
        return;
      }
      
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        
        // Direct navigation to previous section
        navigate(`/${previousSection}`, { 
          state: { scrollToSection: previousSection },
          replace: true
        });
        setCurrentSection(previousSection);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationStack, isDetailsPage, setCurrentSection, navigate, location.state]);

  return {
    navigationStack,
    scrollToSection,
    handleBack
  };
}; 