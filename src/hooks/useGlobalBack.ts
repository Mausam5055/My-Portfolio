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

    // Update URL without triggering a scroll
    navigate(`/${section}`, { 
      state: { 
        scrollToSection: section,
        directNavigation: true,
        from: currentSection
      },
      replace: false
    });
    
    // Update section immediately
    setCurrentSection(section);
    
    // Find and scroll to the section element
    const sectionElement = document.getElementById(section);
    console.log('Looking for section:', section);
    console.log('Found element:', sectionElement);
    
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element not found, try with lowercase
      const lowerSectionElement = document.getElementById(section.toLowerCase());
      console.log('Trying lowercase:', section.toLowerCase());
      console.log('Found element:', lowerSectionElement);
      
      if (lowerSectionElement) {
        lowerSectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
    
    // Skip if state is null or no scrollToSection
    if (!state?.scrollToSection) return;
    
    // Skip if we're already in the target section
    if (currentSection === state.scrollToSection) return;
    
    setCurrentSection(state.scrollToSection);
    
    // Map section names to their correct IDs
    const sectionIdMap: Record<SectionType, string> = {
      home: 'home',
      about: 'about',
      journey: 'journey',
      qualifications: 'qualifications',
      certifications: 'certifications',
      skills: 'skills',
      education: 'education',
      gallery: 'gallery',
      cubing: 'cubing',
      blog: 'blog',
      futureGoals: 'future-goals',
      funFacts: 'fun-facts',
      Gaming: 'gaming',
      projects: 'projects',
      testimonials: 'testimonials',
      contact: 'contact'
    };

    // Find and scroll to the section element using the mapped ID
    const sectionElement = document.getElementById(sectionIdMap[state.scrollToSection]);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state, setCurrentSection, currentSection]);

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