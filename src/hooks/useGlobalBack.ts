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

  // Handle scroll position and section updates
  useEffect(() => {
    if (!isDetailsPage) {
      const handleScroll = () => {
        const sections = Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>;
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sectionRefs[sections[i]].current;
          if (section && section.offsetTop <= scrollPosition) {
            setCurrentSection(sections[i] as SectionType);
            break;
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isDetailsPage, sectionRefs, setCurrentSection]);

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
    if (isDetailsPage) {
      // For detail pages, go back to the previous page
      window.history.back();
    } else if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      setCurrentSection(previousSection);
      
      // Direct navigation without scroll
      navigate(`/${previousSection}`, { 
        state: { scrollToSection: previousSection, instant: true, fromBack: true },
        replace: true
      });
    }
  };

  // Handle navigation and scroll restoration
  useEffect(() => {
    const state = location.state as { 
      scrollToSection?: SectionType; 
      instant?: boolean;
      fromBack?: boolean;
      from?: string;
    } | null;
    
    if (state?.scrollToSection) {
      const targetSection = state.scrollToSection;
      setCurrentSection(targetSection);
      
      // Only scroll if this is not a back navigation
      if (!state.fromBack) {
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
  }, [location.state, sectionRefs, setCurrentSection]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (isDetailsPage) {
        // For detail pages, let the browser handle the back navigation
        return;
      }
      
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        setCurrentSection(previousSection);
        
        // Direct navigation without scroll
        navigate(`/${previousSection}`, { 
          state: { scrollToSection: previousSection, instant: true, fromBack: true },
          replace: true
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationStack, isDetailsPage, setCurrentSection, navigate]);

  return {
    navigationStack,
    scrollToSection,
    handleBack
  };
}; 