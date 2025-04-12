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

    // Handle back navigation from blog detail to AllBlogs
    if (location.pathname.startsWith('/blog/')) {
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Navigate back to AllBlogs
      navigate('/blogs/all', { 
        state: { 
          directNavigation: true,
          from: 'blog-detail',
          forceSection: 'blog' as SectionType,
          scrollPosition: state?.scrollPosition ?? 0
        },
        replace: false
      });
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Then restore scroll position if available
      const scrollPosition = state?.scrollPosition ?? 0;
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
      return;
    }

    // Handle back navigation from AllBlogs to blog section
    if (location.pathname === '/blogs/all') {
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
      // Navigate to blog section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'blog',
          scrollToSection: 'blog',
          from: 'blog',
          scrollPosition: state?.scrollPosition || 0
        },
        replace: false
      });
      
      setCurrentSection('blog');
      
      // Find and scroll to blog section
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
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
          scrollPosition: state?.scrollPosition || 0
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
          scrollPosition: state?.scrollPosition || 0
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
        sectionElement.scrollIntoView({ behavior: 'smooth' });
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
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state, setCurrentSection, currentSection, location.pathname]);

  const handleSectionClick = useCallback((section: SectionType) => {
    if (section === 'blog') {
      navigate('/blogs/all', { 
        state: { 
          directNavigation: true,
          from: 'blog-section',
          forceSection: 'blog' as SectionType
        }
      });
    } else {
      setCurrentSection(section);
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [navigate, setCurrentSection]);

  return {
    navigationStack,
    scrollToSection,
    handleBack,
    handleSectionClick
  };
}; 