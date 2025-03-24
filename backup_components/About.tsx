import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)", // Light yellow accent to match Journey
      }}
    >
      <div className="container mx-auto px-4">
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-48 h-48 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center pt-12">
          {/* Text Content */}
          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/90 dark:to-gray-800/90 rounded-2xl shadow-xl p-8 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30"
            >
              <div className="mb-6 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Who Am I?
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 dark:text-gray-300 text-lg mb-8 text-center leading-relaxed"
              >
                Hello! I'm{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                  Mausam Kar
                </span>
                , a passionate first-year B.Tech student specializing in{" "}
                <span className="italic text-purple-600 dark:text-purple-400">
                  Computer Science & AI/ML
                </span>{" "}
                at VIT Bhopal. Hailing from Assam, my academic journey began at
                Saint Vianney High School and continued at Ramanuj Gupta Junior
                College.
              </motion.p>

              {/* Animated Underline for Interests */}
              <div className="mb-6 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Passions
                </h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-500"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 dark:text-gray-300 text-lg text-center leading-relaxed"
              >
                When I'm not{" "}
                <span className="text-blue-600 dark:text-blue-400">coding</span>
                , I'm either refining my{" "}
                <span className="text-purple-600 dark:text-purple-400">
                  gaming skills
                </span>{" "}
                or exploring{" "}
                <span className="italic text-pink-600 dark:text-pink-400">
                  creative technologies
                </span>
                . Let's collaborate and create something{" "}
                <span className="underline decoration-wavy decoration-purple-500">
                  extraordinary
                </span>
                !
              </motion.p>
            </motion.div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-6 relative z-10">
            {/* Coding Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex flex-col group"
            >
              <motion.div
                initial={{ rotate: -5 }}
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-purple-500/20 mix-blend-overlay" />
                <img
                  src="assets/about1.jpeg"
                  alt="Coding"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 border-2 border-blue-400/20 rounded-2xl pointer-events-none" />
              </motion.div>
              <motion.p
                whileHover={{ x: 5 }}
                className="text-center text-lg font-medium mt-4 text-gray-900 dark:text-white"
              >
                "Code is art
                <br />
                in motion"
              </motion.p>
            </motion.div>

            {/* Art Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex flex-col group mt-12 md:mt-0"
            >
              <motion.div
                initial={{ rotate: 5 }}
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-blue-500/20 mix-blend-overlay" />
                <img
                  src="assets/about2.webp"
                  alt="Art"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 border-2 border-purple-400/20 rounded-2xl pointer-events-none" />
              </motion.div>
              <motion.p
                whileHover={{ x: 5 }}
                className="text-center text-lg font-medium mt-4 text-gray-900 dark:text-white"
              >
                "Creativity is
                <br />
                intelligence having fun"
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
