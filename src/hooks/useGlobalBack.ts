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

    // Ensure we're at the top before navigation
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });

    // Direct navigation without scroll
    navigate(`/${section}`, { 
      state: { 
        scrollToSection: section,
        directNavigation: true
      },
      replace: false
    });
    
    // Update section immediately
    setCurrentSection(section);
  };

  const handleBack = () => {
    // Special handling for AllCubingContent
    if (location.pathname === '/all-cubing-content') {
      // Ensure we're at the top before navigation
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      navigate('/cubing', { 
        state: { 
          scrollToSection: 'cubing',
          directNavigation: true
        },
        replace: true
      });
      setCurrentSection('cubing');
      return;
    }

    if (isDetailsPage) {
      // For detail pages, check if we have a specific "from" state
      const state = location.state as { from?: string } | null;
      if (state?.from) {
        // Ensure we're at the top before navigation
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });

        // Direct navigation to the previous section
        navigate(`/${state.from}`, { 
          state: { 
            scrollToSection: state.from as SectionType,
            directNavigation: true
          },
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
      
      // Ensure we're at the top before navigation
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Direct navigation to previous section
      navigate(`/${previousSection}`, { 
        state: { 
          scrollToSection: previousSection,
          directNavigation: true
        },
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
      directNavigation?: boolean;
    } | null;
    
    if (state?.scrollToSection) {
      setCurrentSection(state.scrollToSection);
      // If it's a direct navigation, scroll to the section immediately
      if (state.directNavigation && sectionRefs[state.scrollToSection]?.current) {
        // Ensure we're at the top before scrolling to section
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
        // Then scroll to the section
        sectionRefs[state.scrollToSection].current?.scrollIntoView({ behavior: 'instant' });
      }
    }
  }, [location.state, setCurrentSection, sectionRefs]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      // Special handling for AllCubingContent
      if (location.pathname === '/all-cubing-content') {
        // Ensure we're at the top before navigation
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });

        navigate('/cubing', { 
          state: { 
            scrollToSection: 'cubing',
            directNavigation: true
          },
          replace: true
        });
        setCurrentSection('cubing');
        return;
      }

      if (isDetailsPage) {
        // For detail pages, check if we have a specific "from" state
        const state = location.state as { from?: string } | null;
        if (state?.from) {
          // Ensure we're at the top before navigation
          window.scrollTo({
            top: 0,
            behavior: 'instant'
          });

          // Direct navigation to the previous section
          navigate(`/${state.from}`, { 
            state: { 
              scrollToSection: state.from as SectionType,
              directNavigation: true
            },
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
        
        // Ensure we're at the top before navigation
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });

        // Direct navigation to previous section
        navigate(`/${previousSection}`, { 
          state: { 
            scrollToSection: previousSection,
            directNavigation: true
          },
          replace: true
        });
        setCurrentSection(previousSection);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationStack, isDetailsPage, setCurrentSection, navigate, location.pathname, location.state]);

  return {
    navigationStack,
    scrollToSection,
    handleBack
  };
}; 