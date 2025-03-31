import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: 'Client Portfolio',
    description: 'Showcasing the expertise and creativity of papiya, this portfolio highlights their skills, dedication.',
    detailedDescription: `A modern and responsive portfolio website built for a client, showcasing their professional journey and achievements. The site features:

• Responsive design that works seamlessly across all devices
• Smooth animations and transitions for enhanced user experience
• Dark mode support with elegant color schemes
• Interactive project showcase with detailed case studies
• Contact form with email integration
• Optimized performance and SEO-friendly structure

The portfolio effectively communicates the client's brand identity while maintaining a clean and professional aesthetic.`,
    videoPreview: 'https://www.youtube.com/embed/9z46-46o3CE',
    technologies: [
      { name: 'JavaScript', percentage: 80 },
      { name: 'React', percentage: 90 },
      { name: 'CSS', percentage: 70 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/papiya',
    liveDemo: 'https://papiya.vercel.app/',
  },
  {
    id: 2,
    name: 'My 2nd Portfolio',
    description: 'Showcasing my expertise in web dev., this portfolio highlights my creativity, skills, and dedication to delivering impactful solutions.',
    detailedDescription: `An enhanced version of my portfolio showcasing my growth as a web developer. Key features include:

• Modern UI/UX design with intuitive navigation
• Project showcase with interactive elements
• Skills visualization with animated progress bars
• Blog section for sharing technical insights
• Integration with various APIs and services
• Performance optimization and best practices

This portfolio demonstrates my commitment to creating engaging and efficient web applications.`,
    videoPreview: 'https://www.youtube.com/embed/sluWyngYKOI',
    technologies: [
      { name: 'HTML', percentage: 85 },
      { name: 'CSS', percentage: 75 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/My-Portfolio-1/tree/main/Protfolio-1/My-Portfolio-main',
    liveDemo: 'https://mausamkar.netlify.app/',
  },
  {
    id: 3,
    name: 'My 1st Portfolio',
    description: 'Welcome to my first portfolio, a showcase of my creativity, skills, and dedication in Web Dev. This collection highlights my journey, passion, and commitment to delivering impactful solutions.',
    detailedDescription: `My first portfolio website that marked the beginning of my web development journey. Features include:

• Clean and minimalist design approach
• Responsive layout for all screen sizes
• Project showcase with basic animations
• Contact section with form validation
• Social media integration
• Basic SEO implementation

This portfolio represents my initial steps in web development and my passion for creating digital experiences.`,
    videoPreview: "https://www.youtube.com/embed/TxX6PeCusWM",
    technologies: [
      { name: 'Node.js', percentage: 80 },
      { name: 'Express', percentage: 70 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/My-Portfolio-1/tree/main/Protfolio-1/My-Portfolio-main',
    liveDemo: 'https://mausamprotfolio.netlify.app/',
  },
];

const ITEMS_PER_PAGE = 3;

export const Projects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const openModal = useCallback((project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  }, []);

  // Optimize animations based on user preference
  const animationConfig = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section
      id="Journey"
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
              onClick={() => openModal(project)}
              className="group relative bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 cursor-pointer"
            >
              {/* Card background effects */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content wrapper */}
              <div className="relative z-10">
                {/* Image container with loading state */}
                <div className="overflow-hidden rounded-2xl mb-4 md:mb-6 relative aspect-video">
                  {isLoading ? (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl" />
                  ) : (
                    <motion.img
                      src={project.imagePreview}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                      <span className="text-white text-xs md:text-sm font-medium">Click to view video</span>
                    </div>
                  </div>
                </div>

                {/* Project title */}
                <motion.h3 
                  className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  {project.name}
                </motion.h3>
                
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
    
                {/* Action buttons */}
                <motion.div 
                  className="flex justify-between gap-2 md:gap-3 mb-4 md:mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a 
                    href={project.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <FaGithub className="text-base md:text-lg" />
                    GitHub
                  </a>
                  <a 
                    href={project.liveDemo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-medium rounded-xl border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <FaExternalLinkAlt className="text-base md:text-lg" />
                    Live Demo
                  </a>
                </motion.div>

                {/* Contributors */}
                <motion.div 
                  className="flex items-center -space-x-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.contributors.map((contributor) => (
                    <div 
                      key={contributor.name} 
                      className="relative group"
                      title={contributor.name}
                    >
                      <img 
                        src={contributor.profilePic} 
                        alt={contributor.name} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg" 
                        loading="lazy"
                      />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap">
                        {contributor.name}
                      </div>
                    </div>
                  ))}
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

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center backdrop-blur-sm z-10">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  >
                    {selectedProject.name}
                  </motion.h2>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    onClick={closeModal}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <FaTimes className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div 
                  className="overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {/* Video Preview */}
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={selectedProject.videoPreview}
                      title={selectedProject.name}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Overview
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </motion.div>

                  {/* Detailed Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Detailed Description
                    </h3>
                    <div className="prose dark:prose-invert max-w-none">
                      {selectedProject.detailedDescription.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                              paragraph.startsWith('•') ? 'flex items-start gap-2' : ''
                            }`}
                          >
                            {paragraph.startsWith('•') ? (
                              <>
                                <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                                <span>{paragraph.slice(1).trim()}</span>
                              </>
                            ) : (
                              paragraph
                            )}
                          </motion.p>
                        )
                      ))}
                    </div>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Technologies Used
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.technologies.map((tech) => (
                        <div key={tech.name} className="space-y-2">
                          <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                            <span>{tech.name}</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${tech.percentage}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Contributors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Contributors
                    </h3>
                    <div className="flex items-center -space-x-2">
                      {selectedProject.contributors.map((contributor) => (
                        <div
                          key={contributor.name}
                          className="relative group"
                          title={contributor.name}
                        >
                          <img
                            src={contributor.profilePic}
                            alt={contributor.name}
                            className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                          />
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            {contributor.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/95 dark:bg-gray-900/95 p-4 md:p-6 border-t border-gray-200 dark:border-gray-800 flex gap-3 md:gap-4 backdrop-blur-sm">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaGithub className="text-base md:text-lg" />
                    View on GitHub
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 px-3 md:px-4 text-xs md:text-sm font-medium rounded-xl border-2 border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaExternalLinkAlt className="text-base md:text-lg" />
                    Live Demo
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};