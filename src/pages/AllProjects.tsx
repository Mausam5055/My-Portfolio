import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaArrowLeft, FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';

export const AllProjects: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle browser back button
    const handlePopState = () => {
      // Direct navigation to projects section with instant scroll
      navigate('/projects', { 
        state: { 
          directNavigation: true,
          scrollToSection: 'projects'
        },
        replace: true
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const handleBack = () => {
    // Direct navigation to projects section with instant scroll
    navigate('/projects', { 
      state: { 
        directNavigation: true,
        scrollToSection: 'projects'
      },
      replace: true
    });
  };

  const handleProjectClick = (id: number) => {
    // Ensure we're at the top before navigation
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    
    navigate(`/projects/${id}`, {
      state: { 
        from: 'projects',
        directNavigation: true
      },
      replace: false
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
          }}
        >
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 dark:from-black/60 dark:via-black/40 dark:to-black/80" />
          {/* Bottom Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900" />
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBack}
          className="absolute top-6 left-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <FaArrowLeft className="w-4 h-4 text-white" />
        </motion.button>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              My Projects
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative -mt-20">
        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 cursor-pointer h-full flex flex-col"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 flex-shrink-0">
                <motion.img
                  src={project.outerPreviewImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Enhanced overlay with better gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white rounded-full font-semibold text-sm shadow-xl backdrop-blur-md border border-white/30 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <FaRocket className="w-3.5 h-3.5" />
                      View Details
                    </span>
                  </motion.button>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {project.name}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 