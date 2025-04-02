import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, ChevronDown } from "lucide-react";

type SectionType = 'about' | 'journey' | 'qualifications' | 'certifications' | 'skills' | 'education' | 'gallery' | 'cubing' | 'blog' | 'futureGoals' | 'funFacts' | 'Gaming' | 'projects' | 'testimonials' | 'contact';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  scrollToSection: (section: SectionType) => void;
  onBack: () => void;
}

export default function Navbar({
  isDark,
  toggleTheme,
  scrollToSection,
  onBack,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Updated to match sectionRefs keys from App.tsx
  const navItems: SectionType[] = [
    "about",
    "journey",
    "skills",
    "gallery",
    "cubing",
    "projects",
    "Gaming",
    "testimonials",
    "contact"
  ];

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isThemeChanging = false;
    
    const handleScroll = () => {
      if (isThemeChanging) return; // Skip scroll handling during theme change
      
      setIsScrolling(true);
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Improved scroll position detection
      const sections = navItems.map((item) => document.getElementById(item));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setActiveSection(navItems[i]);
            break;
          }
        }
      }

      // Clear the timeout
      clearTimeout(scrollTimeout);
      
      // Set a new timeout
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [navItems]);

  const getDisplayName = (section: SectionType) => {
    const names: Record<SectionType, string> = {
      about: "About",
      journey: "Journey",
      qualifications: "Qualifications",
      certifications: "Certifications",
      skills: "Skills",
      education: "Education",
      gallery: "Gallery",
      cubing: "Cubing",
      blog: "Blog",
      futureGoals: "Future Goals",
      funFacts: "Fun Facts",
      Gaming: "Gaming",
      projects: "Projects",
      testimonials: "Testimonials",
      contact: "Contact"
    };
    return names[section] || section;
  };

  const handleLinkClick = useCallback((section: SectionType) => {
    // Close mobile menu if open
    setIsOpen(false);
    
    // Update active section
    setActiveSection(section);
    
    // Find the section element
    const sectionElement = document.getElementById(section);
    console.log('Looking for section:', section);
    console.log('Found element:', sectionElement);
    
    if (sectionElement) {
      // Scroll to the section
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
    
    // Update URL and navigation state
    scrollToSection(section);
  }, [scrollToSection]);

  const handleThemeToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store current scroll position and path
    const currentScroll = window.scrollY;
    const currentPath = window.location.pathname;
    
    // Toggle theme
    toggleTheme();
    
    // Restore state after theme change
    setTimeout(() => {
      // Restore scroll position
      window.scrollTo(0, currentScroll);
      
      // Ensure we're on the same path
      if (window.location.pathname !== currentPath) {
        window.history.replaceState(null, '', currentPath);
      }
    }, 0);
  }, [toggleTheme]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isDark 
            ? "bg-black/90 backdrop-blur-xl shadow-lg" 
            : "bg-white/90 backdrop-blur-xl shadow-md"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            className="flex-shrink-0 flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`p-2 rounded-xl ${
                isDark 
                  ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30" 
                  : "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              } backdrop-blur-sm shadow-lg`}
            >
              <User className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-800"}`} aria-hidden="true" />
            </motion.div>
            <motion.h1
              className={`text-2xl font-bold bg-gradient-to-r ${
                isDark 
                  ? "from-purple-400 via-pink-400 to-purple-400" 
                  : "from-purple-600 via-pink-600 to-purple-600"
              } bg-clip-text text-transparent`}
              style={{ fontFamily: "'Dancing Script', cursive" }}
              whileHover={{ opacity: 0.8 }}
            >
              mausam
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className={`flex items-center ${
              isDark 
                ? "bg-white/5" 
                : "bg-white/80"
              } backdrop-blur-sm rounded-full p-1.5 shadow-lg`} role="menubar">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === item
                      ? isDark 
                        ? "text-white bg-purple-500/30"
                        : "text-purple-900 bg-purple-100 shadow-sm"
                      : isDark
                        ? "text-white/70 hover:text-white"
                        : "text-gray-700 hover:text-purple-900"
                  }`}
                  whileHover={{ opacity: 0.8 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  role="menuitem"
                  aria-current={activeSection === item ? "page" : undefined}
                >
                  {getDisplayName(item)}
                  {activeSection === item && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-full rounded-full ${
                        isDark 
                          ? "bg-purple-400/20" 
                          : "bg-purple-100/80"
                      }`}
                      layoutId="activeSection"
                      transition={{
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={handleThemeToggle}
              className={`ml-4 p-2.5 rounded-xl ${
                isDark 
                  ? "text-white" 
                  : "text-purple-900"
              }`}
              whileHover={{ opacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              onClick={handleThemeToggle}
              className={`p-2.5 rounded-xl ${
                isDark 
                  ? "text-white" 
                  : "text-purple-900"
              }`}
              whileHover={{ opacity: 0.8 }}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl ${
                isDark 
                  ? "text-white" 
                  : "text-purple-900"
              }`}
              whileHover={{ opacity: 0.8 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden fixed top-16 left-4 right-4 overflow-hidden ${
              isDark 
                ? "bg-black/95 backdrop-blur-xl border border-purple-500/20" 
                : "bg-white/95 backdrop-blur-xl border border-purple-200"
            } rounded-2xl shadow-xl`}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <motion.div
              className="p-4 space-y-2"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              role="menu"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 capitalize ${
                    activeSection === item
                      ? isDark
                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg"
                        : "bg-white text-purple-900 shadow-sm border border-purple-100"
                      : isDark
                        ? "hover:bg-white/5 text-white/70 hover:text-white"
                        : "hover:bg-purple-50 text-gray-900 hover:text-purple-900"
                  }`}
                  variants={{
                    open: {
                      opacity: 1,
                      transition: { duration: 0.2 },
                    },
                    closed: {
                      opacity: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
                  whileHover={{ opacity: 0.8 }}
                  role="menuitem"
                  aria-current={activeSection === item ? "page" : undefined}
                >
                  <span className="font-semibold">{getDisplayName(item)}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
