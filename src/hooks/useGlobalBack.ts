import { useState, useEffect, useCallback } from 'react';
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

// Function to detect if the device is mobile
const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

export const useGlobalBack = ({ currentSection, setCurrentSection, sectionRefs, isDetailsPage = false }: UseGlobalBackProps) => {
  const [navigationStack, setNavigationStack] = useState<SectionType[]>([]);
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

    // Update navigation stack
    setNavigationStack(prev => [...prev, currentSection]);

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

  // Handle back button
  const handlePopState = useCallback((event: PopStateEvent) => {
    const state = event.state as { 
      directNavigation?: boolean;
      from?: string;
      forceSection?: SectionType;
      scrollToSection?: string;
      scrollPosition?: number;
    } | null;

    // Always disable scroll animations first
    disableScrollAnimations();

    if (state?.forceSection) {
      // Update section immediately
      setCurrentSection(state.forceSection);
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the section element instantly
      const sectionElement = document.getElementById(state.forceSection as string);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'instant' });
      }

      // Restore scroll animations only for desktop
      restoreScrollAnimations();
      return;
    }

    // Handle back navigation from detail pages
    if (location.pathname.startsWith('/blog/') || 
        location.pathname.startsWith('/projects/') || 
        location.pathname.startsWith('/games/') || 
        location.pathname.startsWith('/gallery/') || 
        location.pathname.startsWith('/cube/')) {
      
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: currentSection,
          scrollToSection: currentSection,
          from: 'detail',
          scrollPosition: 0
        },
        replace: false
      });
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the section element instantly
      const sectionElement = document.getElementById(currentSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'instant' });
      }

      // Restore scroll animations only for desktop
      restoreScrollAnimations();
      return;
    }

    // Handle back navigation between sections
    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      
      // Navigate to previous section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: previousSection,
          scrollToSection: previousSection,
          from: currentSection,
          scrollPosition: 0
        },
        replace: false
      });
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the section element instantly
      const sectionElement = document.getElementById(previousSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'instant' });
      }

      // Restore scroll animations only for desktop
      restoreScrollAnimations();
    } else {
      // Navigate to home section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'home',
          scrollToSection: 'home',
          from: currentSection,
          scrollPosition: 0
        },
        replace: false
      });
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the home section instantly
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'instant' });
      }

      // Restore scroll animations only for desktop
      restoreScrollAnimations();
    }
  }, [location.pathname, navigate, setCurrentSection, currentSection, navigationStack]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const handleBack = () => {
    // Always disable scroll animations first
    disableScrollAnimations();

    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: previousSection,
          scrollToSection: previousSection,
          from: currentSection,
          scrollPosition: 0
        },
        replace: false
      });
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the section element instantly
      const sectionElement = document.getElementById(previousSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'instant' });
      }
    } else {
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'home',
          scrollToSection: 'home',
          from: currentSection,
          scrollPosition: 0
        },
        replace: false
      });
      
      // Force instant scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });

      // Find and scroll to the home section instantly
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'instant' });
      }
    }

    // Restore scroll animations only for desktop
    restoreScrollAnimations();
  };

  return { scrollToSection, handleBack };
}; 