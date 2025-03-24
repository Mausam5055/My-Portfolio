import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    name: 'Client Portfolio',
    description: 'Showcasing the expertise and creativity of papiya, this portfolio highlights their skills, dedication.',
    videoPreview: 'https://www.youtube.com/embed/9z46-46o3CE', // Replace with the actual YouTube video ID
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
    videoPreview: 'https://www.youtube.com/embed/sluWyngYKOI', // Replace with the actual YouTube video ID
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
    videoPreview: "https://www.youtube.com/embed/TxX6PeCusWM", // Replace with the actual YouTube video ID
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

export const Projects: React.FC = () => {
  return (
    <section
    id="Journey"
    className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
    style={{
      backgroundColor: "rgba(255, 255, 204, 0.2)" // Slightly more visible light yellow accent
    }}
  >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            My Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/10 dark:bg-gray-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-lg border border-white/20 dark:border-gray-600/30 hover:shadow-2xl transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="overflow-hidden rounded-xl mb-4 relative">
                <iframe
                  src={project.videoPreview}
                  title={project.name}
                  className="w-full h-48 object-cover rounded-xl"
                  allowFullScreen
                />
              </div>

              <motion.h3 
                className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                {project.name}
              </motion.h3>
              
              <p className="text-black dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
  
              <motion.div className="mb-4 space-y-3">
                {project.technologies.map((tech) => (
                  <div key={tech.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
                      <span>{tech.name}</span>
                      <span>{tech.percentage}%</span>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ 
                        delay: 0.2,
                        duration: 1.2,
                        ease: "easeOut"
                      }}
                      className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${tech.percentage}%` }}
                        transition={{
                          duration: 1.5,
                          ease: [0.34, 1.56, 0.64, 1],
                          delay: 0.3
                        }}
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
  
              <motion.div 
                className="flex justify-between mb-4 gap-2 z-10 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a 
                  href={project.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <FaGithub className="text-lg" />
                  GitHub
                </a>
                <a 
                  href={project.liveDemo} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <FaExternalLinkAlt className="text-lg" />
                  Live Demo
                </a>
              </motion.div>

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
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 hover:border-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg" 
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {contributor.name}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};