import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, User, ChevronDown } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  scrollToSection: (section: string) => void;
}

export default function Navbar({
  isDark,
  toggleTheme,
  scrollToSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Updated to match sectionRefs keys from App.tsx
  const navItems = [
    "about",
    "journey",
    "skills",
    "gallery",
    "cubing",
    "projects",
    "gaming",
    "testimonials",
    "contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const getDisplayName = (section: string) => {
    const names: { [key: string]: string } = {
      about: "About",
      journey: "Journey",
      skills: "Skills",
      gallery: "Gallery",
      cubing: "Cubing",
      projects: "Projects",
      gaming: "Gaming",
      testimonials: "Testimonials",
      contact: "Contact",
    };
    return names[section] || section;
  };

  const handleLinkClick = (section: string) => {
    scrollToSection(section);
    setIsOpen(false);
    setActiveSection(section);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            className="flex-shrink-0 flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm shadow-lg"
            >
              <User className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              whileHover={{ scale: 1.05 }}
            >
              mausam
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1.5">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === item
                      ? "text-white bg-purple-500/20"
                      : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {getDisplayName(item)}
                  {activeSection === item && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-full bg-purple-400/10 rounded-full"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={toggleTheme}
              className="ml-4 p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/80 backdrop-blur-lg shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleLinkClick(item)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item
                      ? "text-white bg-purple-500/20"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ x: 5 }}
                >
                  {getDisplayName(item)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
