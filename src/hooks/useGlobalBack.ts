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
        from: currentSection,
        forceSection: section,
        scrollPosition: 0
      },
      replace: true
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
      }, 100);
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

    // Special handling for blog detail pages
    if (path.startsWith('blog/')) {
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Navigate to blog section
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: 'blog',
          scrollToSection: 'blog',
          from: 'blog',
          scrollPosition: 0
        },
        replace: true
      });
      
      setCurrentSection('blog');
      
      // Find and scroll to blog section
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'instant' });
      }
      
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 100);
      return;
    }

    // Handle other detail pages
    if (path.includes('/')) {
      const [section] = path.split('/');
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      navigate('/', { 
        state: { 
          directNavigation: true,
          forceSection: section,
          scrollToSection: section,
          from: section,
          scrollPosition: 0
        },
        replace: true
      });
      
      setCurrentSection(section as SectionType);
      
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'instant' });
      }
      
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = scrollBehavior;
      }, 100);
      return;
    }

    // Default back navigation
    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      
      // Temporarily disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto';
      
      navigate(`/${previousSection}`, { 
        state: { 
          directNavigation: true,
          forceSection: previousSection,
          scrollToSection: previousSection,
          from: previousSection,
          scrollPosition: 0
        },
        replace: true
      });
      
      // Force scroll to top first
      window.scrollTo(0, 0);
      
      // Then scroll to target section
      requestAnimationFrame(() => {
        const sectionElement = document.getElementById(previousSection);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'instant' });
        }
      });
      
      // Restore smooth scrolling after navigation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 100);
    } else {
      navigate(-1);
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
      const state = location.state as { 
        from?: string;
        directNavigation?: boolean;
        forceSection?: string;
        scrollToSection?: string;
      } | null;
      
      // Handle blog detail page navigation
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
            scrollPosition: 0
          },
          replace: true
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to blog section
        requestAnimationFrame(() => {
          const blogSection = document.getElementById('blog');
          if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'instant' });
          }
        });
        
        // Restore smooth scrolling after navigation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
        return;
      }

      // Handle navigation from blog section
      if (state?.from === 'blog') {
        // Temporarily disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Navigate back to blog section
        navigate('/', { 
          state: { 
            directNavigation: true,
            forceSection: 'blog',
            scrollToSection: 'blog',
            from: 'blog',
            scrollPosition: 0
          },
          replace: true
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to blog section
        requestAnimationFrame(() => {
          const blogSection = document.getElementById('blog');
          if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'instant' });
          }
        });
        
        // Restore smooth scrolling after navigation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
        return;
      }

      // Handle other detail pages
      if (isDetailsPage) {
        if (state?.from) {
          const targetSection = state.from;
          if (!targetSection) return;
          
          // Temporarily disable smooth scrolling
          document.documentElement.style.scrollBehavior = 'auto';
          
          navigate('/', { 
            state: { 
              directNavigation: true,
              forceSection: targetSection,
              scrollToSection: targetSection,
              from: targetSection,
              scrollPosition: 0
            },
            replace: true
          });
          
          // Force scroll to top first
          window.scrollTo(0, 0);
          
          // Then scroll to target section
          requestAnimationFrame(() => {
            const sectionElement = document.getElementById(targetSection);
            if (sectionElement) {
              sectionElement.scrollIntoView({ behavior: 'instant' });
            }
          });
          
          // Restore smooth scrolling after navigation
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
          }, 100);
          return;
        }
      }
      
      // Default back navigation
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        
        // Temporarily disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';
        
        navigate(`/${previousSection}`, { 
          state: { 
            directNavigation: true,
            forceSection: previousSection,
            scrollToSection: previousSection,
            from: previousSection,
            scrollPosition: 0
          },
          replace: true
        });
        
        // Force scroll to top first
        window.scrollTo(0, 0);
        
        // Then scroll to target section
        requestAnimationFrame(() => {
          const sectionElement = document.getElementById(previousSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'instant' });
          }
        });
        
        // Restore smooth scrolling after navigation
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
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