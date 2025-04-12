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
      sectionElement.scrollIntoView({ behavior: 'smooth' });
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

    // Handle back navigation from blog detail to blog section
    if (location.pathname.startsWith('/blog/')) {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Navigate back to blog section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'blog',
          scrollToSection: 'blog',
          from: 'blog',
          scrollPosition: state?.scrollPosition ?? 0
        },
        replace: false
      });
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Then scroll to blog section
      requestAnimationFrame(() => {
        const blogSection = document.getElementById('blog');
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'instant' });
          // Restore the scroll position if available
          const scrollPosition = state?.scrollPosition ?? 0;
          window.scrollTo(0, scrollPosition);
        }
      });
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
      return;
    }

    // Handle back navigation from blog section to previous section
    if (location.pathname === '/' && currentSection === 'blog') {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        
        // Navigate to previous section
        navigate('/', { 
          state: { 
            directNavigation: true,
            forceSection: previousSection,
            scrollToSection: previousSection,
            from: 'blog',
            scrollPosition: state?.scrollPosition ?? 0
          },
          replace: false
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to previous section
        requestAnimationFrame(() => {
          const sectionElement = document.getElementById(previousSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'instant' });
            // Restore the scroll position if available
            const scrollPosition = state?.scrollPosition ?? 0;
            window.scrollTo(0, scrollPosition);
          }
        });
      } else {
        // Navigate to home section
        navigate('/', { 
          state: { 
            directNavigation: true,
            forceSection: 'home',
            scrollToSection: 'home',
            from: 'blog',
            scrollPosition: 0
          },
          replace: false
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to home section
        requestAnimationFrame(() => {
          const homeSection = document.getElementById('home');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'instant' });
          }
        });
      }
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
      return;
    }

    // Handle other back navigation cases
    if (state?.forceSection) {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      setCurrentSection(state.forceSection);
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Then scroll to target section
      requestAnimationFrame(() => {
        const sectionElement = document.getElementById(state.forceSection as string);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'instant' });
          // Restore the scroll position if available
          const scrollPosition = state?.scrollPosition ?? 0;
          window.scrollTo(0, scrollPosition);
        }
      });
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
    }
  }, [location.pathname, navigate, setCurrentSection, currentSection, navigationStack]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  const handleBack = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    const state = location.state as { 
      directNavigation?: boolean;
      from?: string;
      forceSection?: string;
      scrollToSection?: string;
      scrollPosition?: number;
    } | null;

    // Special handling for blog detail pages
    if (path.startsWith('blog/')) {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Navigate back to blog section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'blog',
          scrollToSection: 'blog',
          from: 'blog',
          scrollPosition: state?.scrollPosition ?? 0
        },
        replace: false
      });
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Then scroll to blog section
      requestAnimationFrame(() => {
        const blogSection = document.getElementById('blog');
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'instant' });
          // Restore the scroll position if available
          const scrollPosition = state?.scrollPosition ?? 0;
          window.scrollTo(0, scrollPosition);
        }
      });
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
      return;
    }

    // Handle blog section
    if (path === '' && currentSection === 'blog') {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        
        // Navigate to previous section
        navigate('/', { 
          state: { 
            directNavigation: true,
            forceSection: previousSection,
            scrollToSection: previousSection,
            from: 'blog',
            scrollPosition: state?.scrollPosition ?? 0
          },
          replace: false
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to previous section
        requestAnimationFrame(() => {
          const sectionElement = document.getElementById(previousSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'instant' });
            // Restore the scroll position if available
            const scrollPosition = state?.scrollPosition ?? 0;
            window.scrollTo(0, scrollPosition);
          }
        });
      } else {
        // Navigate to home section
        navigate('/', { 
          state: { 
            directNavigation: true,
            forceSection: 'home',
            scrollToSection: 'home',
            from: 'blog',
            scrollPosition: 0
          },
          replace: false
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to home section
        requestAnimationFrame(() => {
          const homeSection = document.getElementById('home');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'instant' });
          }
        });
      }
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
      return;
    }

    // Handle other detail pages
    if (path.includes('/')) {
      const [section] = path.split('/');
      
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: section,
          scrollToSection: section,
          from: section,
          scrollPosition: state?.scrollPosition ?? 0
        },
        replace: false
      });
      
      setCurrentSection(section as SectionType);
      
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Default back navigation
    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      
      navigate(`/${previousSection}`, { 
        state: { 
          directNavigation: true,
          forceSection: previousSection,
          scrollToSection: previousSection,
          from: previousSection,
          scrollPosition: state?.scrollPosition ?? 0
        },
        replace: false
      });
      
      // Scroll to target section
      const sectionElement = document.getElementById(previousSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no navigation stack, go back to home
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'home',
          scrollToSection: 'home',
          from: 'home',
          scrollPosition: 0
        },
        replace: false
      });
    }
  };

  return {
    navigationStack,
    scrollToSection,
    handleBack,
    handleSectionClick: useCallback((section: SectionType) => {
      setCurrentSection(section);
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, [setCurrentSection])
  };
}; 