import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaUsers, FaTools, FaRocket, FaCheckCircle, FaExpand, FaImage, FaPlay, FaTimes, FaChartBar, FaCalendar, FaClock } from 'react-icons/fa';
import { projects } from '../data/projects';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || ''));
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Ensure scroll to top with instant behavior
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  useEffect(() => {
    // Add a new history entry when the component mounts
    window.history.pushState({ scrollToProjects: true }, '', window.location.href);

    // Handle browser back button
    const handlePopState = () => {
      navigate('/', { 
        state: { scrollToProjects: true },
        replace: true
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

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
    navigate('/', { 
      state: { scrollToProjects: true },
      replace: true
    });
  };

  // Get gallery images based on project
  const getGalleryImages = () => {
    switch (project.name) {
      case 'Weather App':
        return Array.from({ length: 6 }, (_, i) => `/assets/projects/weather/${i + 1}.png`);
      case 'Portfolio V3':
        return Array.from({ length: 6 }, (_, i) => `/assets/projects/portfolio v-03/${i + 1}.png`);
      case 'YouTube Downloader V2':
        return Array.from({ length: 5 }, (_, i) => `/assets/projects/you-tube-v-02/${i + 1}.jpeg`);
      case 'YouTube Downloader V1':
        return Array.from({ length: 5 }, (_, i) => `/assets/projects/You-tube-v01/${i + 1}.png`);
      case 'Client Portfolio':
        return Array.from({ length: 6 }, (_, i) => `/assets/projects/client-portfolio/${i + 1}.${i === 0 ? 'png' : 'jpeg'}`);
      case 'My 2nd Portfolio':
        return Array.from({ length: 5 }, (_, i) => `/assets/projects/portfoio-v02/${i + 1}.jpeg`);
      case 'My 1st Portfolio':
        return Array.from({ length: 6 }, (_, i) => `/assets/projects/portfolio-v01/${i + 1}.png`);
      default:
        return [project.outerPreviewImage];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)]">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.imagePreview}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          {/* Subtle top gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          {/* Main content gradient - Light theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 dark:from-[#111827]/80 via-transparent to-transparent" />
          {/* Bottom fade - Light theme */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/60 dark:from-[#111827]/90 via-white/10 dark:via-[#111827]/30 to-transparent" />
        </div>
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-8 md:pb-16 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl hidden sm:block"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  {project.name}
                </h1>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-black/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleBackClick}
                  className="fixed top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300 z-50"
                >
                  <FaArrowLeft className="text-base" />
                </motion.button>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base font-medium order-1 sm:order-2"
                >
                  <FaGithub className="text-lg sm:text-xl" />
                  GitHub
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-sm sm:text-base font-medium order-2 sm:order-3"
                >
                  <FaExternalLinkAlt className="text-lg sm:text-xl" />
                  Live Demo
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Title and Description */}
      <div className="sm:hidden container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {project.name}
          </h1>
          <p className="text-base text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8">
              {/* About This Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
                className="mb-10 md:mb-12"
          >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
              <FaRocket className="text-2xl text-blue-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">About This Project</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6"
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed"
                  >
                    {project.detailedDescription.split('\n\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-4">
                          {paragraph.replace(/•\s/g, '').trim()}
                        </p>
                      )
                    ))}
                  </motion.div>
            </div>
          </motion.div>

          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
                className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 cursor-pointer group relative"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img
                  src={project.outerPreviewImage}
                  alt={`${project.name} preview`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
              </motion.div>

              {/* Video Modal */}
              {isVideoModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setIsVideoModalOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                      onClick={() => setIsVideoModalOpen(false)}
                    >
                      <FaTimes className="text-xl" />
                    </button>
            <iframe
              src={project.videoPreview}
              title={project.name}
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>
                </motion.div>
              )}

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
                className="mb-10 md:mb-12"
          >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
              <FaRocket className="text-2xl text-blue-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Project Overview</h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {project.detailedDescription.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                        className={`text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed ${
                          paragraph.startsWith('•') ? 'flex items-start gap-3' : ''
                    }`}
                  >
                    {paragraph.startsWith('•') ? (
                      <>
                            <FaCheckCircle className="text-blue-500 dark:text-blue-400 mt-1.5 flex-shrink-0 text-lg" />
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

              {/* Key Features - Left Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-10 md:mb-12"
              >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <FaCode className="text-2xl text-blue-500" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Existing Features */}
                  {project.detailedDescription
                    .split('\n')
                    .filter(line => line.trim().startsWith('•'))
                    .slice(0, Math.ceil(project.detailedDescription.split('\n').filter(line => line.trim().startsWith('•')).length / 2))
                    .map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
                      >
                        <FaCheckCircle className="text-blue-500 dark:text-blue-400 mt-1.5 flex-shrink-0 text-lg" />
                        <span className="text-base sm:text-lg text-gray-800 dark:text-gray-100 leading-relaxed">
                          {feature.slice(1).trim()}
                        </span>
                      </motion.div>
                    ))}

                  {/* New Features Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="md:col-span-2 grid grid-cols-2 gap-4 mt-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-xl backdrop-blur-sm border border-blue-500/10 dark:border-blue-500/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaRocket className="text-blue-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Performance</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for speed and efficiency with modern best practices</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 rounded-xl backdrop-blur-sm border border-green-500/10 dark:border-green-500/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaCode className="text-green-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Code Quality</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Clean, maintainable code following industry standards</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-xl backdrop-blur-sm border border-purple-500/10 dark:border-purple-500/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaUsers className="text-purple-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">User Experience</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive interface with smooth animations and transitions</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/5 dark:to-red-500/5 rounded-xl backdrop-blur-sm border border-orange-500/10 dark:border-orange-500/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaTools className="text-orange-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Scalability</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Built to scale with modular architecture and efficient data handling</p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4">
          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
                className="mb-10 md:mb-12 bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm"
          >
                <div className="flex items-center gap-3 mb-4 md:mb-5">
              <FaTools className="text-2xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Technologies</h2>
            </div>
                <div className="space-y-4">
              {project.technologies.map((tech) => (
                    <div key={tech.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">
                      {tech.name}
                    </span>
                        <span className="text-sm sm:text-base text-blue-500">
                      {tech.percentage}%
                    </span>
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

              {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-10 md:mb-12"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaImage className="text-xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery</h2>
            </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getGalleryImages().map((image, index) => (
                  <motion.div
                    key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${project.name} preview ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-xs font-medium">
                              Preview {index + 1}
                    </span>
                            <button className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                              <FaExpand className="text-white text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

              {/* Project Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-10 md:mb-12 bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaRocket className="text-2xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Highlights</h2>
                </div>
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300">Performance Score</span>
                      <span className="text-blue-500 font-semibold">95%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">Optimized for all devices</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">Fast loading times</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">SEO friendly structure</span>
                    </div>
                  </div>

                  {/* Development Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">500+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Lines of Code</div>
                    </div>
                    <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">10+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Components</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contributors - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
                className="hidden lg:block bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm mb-8"
          >
                <div className="flex items-center gap-3 mb-4">
              <FaUsers className="text-2xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contributors</h2>
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
                        className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap">
                    {contributor.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaChartBar className="text-2xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Stats</h2>
                </div>
                <div className="space-y-6">
                  {/* Technologies Used */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Project Links</h3>
                    <div className="space-y-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        <FaGithub className="text-lg" />
                        <span className="text-sm">View Source Code</span>
                      </a>
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-lg" />
                          <span className="text-sm">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Project Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FaCalendar className="text-blue-500" />
                        <span>Started: {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <FaClock className="text-blue-500" />
                        <span>Last Updated: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributors - Mobile View (Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:hidden container mx-auto px-4 py-8"
      >
        <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="text-2xl text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contributors</h2>
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
                  className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-900 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap">
                  {contributor.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes className="text-xl" />
            </button>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}; 