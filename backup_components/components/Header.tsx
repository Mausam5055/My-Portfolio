import React, { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useThemeStore } from "../store/theme";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#qualifications", label: "Qualifications" },
  { href: "#education", label: "Education" },
  { href: "#gallery", label: "Gallery" },
  { href: "#artwork", label: "Artwork" },
  { href: "#journey", label: "Journey" },
  { href: "#blog", label: "Blog" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group"
          >
            <motion.span
              className={cn(
                "font-signature text-2xl",
                "text-white",
                "group-hover:text-pink-400",
                "transition-all duration-300",
                "relative",
              )}
              style={{
                fontFamily: "Dancing Script",
                textShadow: "0 0 10px rgba(244,114,182,0.3)",
              }}
            >
              Mausam Kar
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "text-sm text-white/80",
                  "hover:text-pink-400",
                  "transition-colors duration-200",
                )}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              onClick={toggleTheme}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "p-2 rounded-full",
                "bg-white/10",
                "text-white",
                "hover:bg-white/20",
                "transition-colors duration-200",
              )}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-white/80",
                      "hover:text-pink-400",
                      "transition-colors duration-200",
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
