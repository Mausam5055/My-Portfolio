import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaUsers, FaTools, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { projects } from '../data/projects';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || ''));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.imagePreview}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <button
                  onClick={handleBackClick}
                  className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base"
                >
                  <FaArrowLeft className="text-sm sm:text-base" />
                  Back to Projects
                </button>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                  >
                    <FaGithub className="text-lg sm:text-xl" />
                    GitHub
                  </a>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base"
                  >
                    <FaExternalLinkAlt className="text-lg sm:text-xl" />
                    Live Demo
                  </a>
                </div>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-2xl leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Concise Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaRocket className="text-2xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About This Project</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                {project.detailedDescription.split('\n').find(p => !p.trim().startsWith('•')) || 
                "This project showcases a comprehensive web application built with modern technologies and best practices. It demonstrates expertise in front-end development, user experience design, and responsive layouts. The implementation includes advanced features, smooth animations, and optimized performance, making it a standout example of professional web development."}
              </p>
            </div>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16"
          >
            <iframe
              src={project.videoPreview}
              title={project.name}
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaRocket className="text-2xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Project Overview</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {project.detailedDescription.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`text-gray-700 dark:text-gray-200 leading-relaxed ${
                      paragraph.startsWith('•') ? 'flex items-start gap-2' : ''
                    }`}
                  >
                    {paragraph.startsWith('•') ? (
                      <>
                        <FaCheckCircle className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
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
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaTools className="text-2xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Technologies Used</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.technologies.map((tech) => (
                <div key={tech.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
                      {tech.name}
                    </span>
                    <span className="text-sm font-medium text-blue-500">
                      {tech.percentage}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
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

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaCode className="text-2xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.detailedDescription
                .split('\n')
                .filter(line => line.trim().startsWith('•'))
                .map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
                  >
                    <FaCheckCircle className="text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-100">
                      {feature.slice(1).trim()}
                    </span>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Contributors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaUsers className="text-2xl text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Contributors</h2>
            </div>
            <div className="flex items-center -space-x-4">
              {project.contributors.map((contributor) => (
                <div
                  key={contributor.name}
                  className="relative group"
                  title={contributor.name}
                >
                  <img
                    src={contributor.profilePic}
                    alt={contributor.name}
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-900 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap">
                    {contributor.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 