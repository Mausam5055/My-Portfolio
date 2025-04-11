import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SectionType } from '../types';

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
    if (sectionElement) {
      // Temporarily disable smooth scrolling
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      sectionElement.scrollIntoView({ behavior: 'instant' });
      
      // Restore scroll behavior
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 100); // Increased timeout to ensure scroll completes
    }
  };

  const handleBack = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    const state = location.state as { 
      directNavigation?: boolean;
      from?: string;
      forceSection?: string;
      scrollToSection?: string;
    } | null;

    // Special handling for all-cubing-content
    if (path === 'all-cubing-content') {
      // Store current scroll behavior
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Navigate to cubing section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'cubing',
          scrollToSection: 'cubing'
        },
        replace: true
      });
      
      // Update section immediately
      setCurrentSection('cubing');
      
      // Find and scroll to cubing section
      const cubingSection = document.getElementById('cubing');
      if (cubingSection) {
        cubingSection.scrollIntoView({ behavior: 'instant' });
      }
      
      // Restore scroll behavior with a delay
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 100); // Increased timeout to ensure scroll completes
      
      return;
    }

    // Handle detail pages
    if (path.includes('/')) {
      const [section] = path.split('/');
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      navigate(`/${section}`, { 
        state: { 
          directNavigation: true,
          forceSection: section,
          scrollToSection: section
        },
        replace: true
      });
      
      setCurrentSection(section as SectionType);
      
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 100);
      return;
    }

    // Default back navigation
    navigate(-1);
  };

  // Handle navigation state updates
  useEffect(() => {
    const state = location.state as { 
      scrollToSection?: SectionType;
      from?: string;
      directNavigation?: boolean;
      forceSection?: string;
    } | null;
    
    // Special handling for all-cubing-content
    if (location.pathname === '/all-cubing-content') {
      setCurrentSection('cubing');
      return;
    }
    
    // If we have a forceSection in the state, use that
    if (state?.forceSection) {
      setCurrentSection(state.forceSection as SectionType);
      
      // Find and scroll to the section
      const sectionElement = document.getElementById(state.forceSection);
      if (sectionElement) {
        const scrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        
        sectionElement.scrollIntoView({ behavior: 'instant' });
        
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = scrollBehavior;
        }, 100);
      }
      return;
    }
    
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
      contact: 'contact',
      profile: 'profile',
      'all-cubing-content': 'cubing'
    };

    // Find and scroll to the section element using the mapped ID
    const sectionElement = document.getElementById(sectionIdMap[state.scrollToSection]);
    if (sectionElement) {
      // Temporarily disable smooth scrolling
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      sectionElement.scrollIntoView({ behavior: 'instant' });
      
      // Restore scroll behavior
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 0);
    }
  }, [location.state, setCurrentSection, currentSection, location.pathname]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      // Special handling for AllCubingContent
      if (location.pathname === '/all-cubing-content') {
        // Direct navigation to cubing section
        navigate('/cubing', { 
          state: { 
            from: 'all-cubing-content',
            directNavigation: true,
            forceSection: 'cubing',
            scrollToSection: 'cubing'
          },
          replace: true
        });
        // Force set the current section to cubing
        setCurrentSection('cubing');
        return;
      }

      if (isDetailsPage) {
        // For detail pages, check if we have a specific "from" state
        const state = location.state as { from?: string } | null;
        if (state?.from) {
          // Direct navigation to the previous section
          navigate(`/${state.from}`, { 
            state: { 
              directNavigation: true,
              forceSection: state.from,
              scrollToSection: state.from
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
        
        // Direct navigation to previous section
        navigate(`/${previousSection}`, { 
          state: { 
            directNavigation: true,
            forceSection: previousSection,
            scrollToSection: previousSection
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