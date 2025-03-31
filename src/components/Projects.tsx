import React, { useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ITEMS_PER_PAGE = 3;

export const Projects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (location.state?.scrollToProjects) {
      // First ensure we're at the top
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Then wait for the next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect();
          const targetScroll = rect.top + window.pageYOffset - (window.innerWidth <= 768 ? 60 : 100);
          window.scrollTo({
            top: targetScroll,
            behavior: 'instant'
          });
        }
      });
      
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Optimize image loading
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.map(project => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = project.imagePreview;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Optimize animations based on user preference
  const animationConfig = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-white to-gray-100 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,204,0.1)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,204,0.05)_0%,_transparent_100%)]" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          {...animationConfig}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            My Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={prefersReducedMotion ? {} : { y: -10 }}
              className="group relative bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800"
            >
              {/* Card background effects */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Image container with loading state */}
                <Link 
                  to={`/projects/${project.id}`} 
                  className="block"
                  onClick={(e) => {
                    e.preventDefault();
                    // Ensure smooth scroll to top before navigation
                    window.scrollTo({
                      top: 0,
                      behavior: 'instant'
                    });
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  <div className="overflow-hidden rounded-2xl mb-4 md:mb-6 relative aspect-video">
                    {isLoading ? (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl" />
                    ) : (
                      <motion.img
                        src={project.outerPreviewImage}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-2xl"
                        initial={{ scale: 1 }}
                        whileHover={prefersReducedMotion ? {} : { 
                          scale: 1.1,
                          transition: { duration: 0.5, ease: "easeOut" }
                        }}
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-sm px-4 py-2 md:px-6 md:py-2.5 rounded-full">
                        <span className="text-white text-sm md:text-base font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Project title */}
                <Link 
                  to={`/projects/${project.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Ensure smooth scroll to top before navigation
                    window.scrollTo({
                      top: 0,
                      behavior: 'instant'
                    });
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  <motion.h3 
                    className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  >
                    {project.name}
                  </motion.h3>
                </Link>
                
                {/* Project description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
    
                {/* Technologies */}
                <motion.div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech.name}
                        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                        whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 md:mt-16 flex items-center justify-center gap-3 md:gap-4"
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2 md:py-3 rounded-xl transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white/80 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
              }`}
            >
              <FaChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-medium">Previous</span>
            </motion.button>

            <motion.button
              whileHover={prefersReducedMotion ? {} : { x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 md:gap-2 px-4 md:px-8 py-2 md:py-3 rounded-xl transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white/80 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl"
              }`}
            >
              <span className="text-xs md:text-sm font-medium">Next</span>
              <FaChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};