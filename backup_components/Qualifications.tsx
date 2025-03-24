import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";
import type { Qualification } from "../types";

const qualifications: Qualification[] = [
  {
    id: "Bachelor of Technology ",
    degree: "💡BACHELOR OF TECHNOLOGY (AIML)",
    institution: "VIT Bhopal University",
    year: "2024-2028",
    image: "/assets/vit.webp",
    driveLink:
      "https://drive.google.com/file/d/1cWYlZHI0jWXxv-yEPpMEhR_nqZw9Ip7n/view?usp=drive_link",
    description:
      "Currently, I am pursuing a B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at VIT Bhopal University. This journey has been an exciting blend of theoretical learning and hands-on experience, allowing me to explore cutting-edge technologies in AI and ML. The dynamic curriculum, combined with practical projects and research opportunities, is shaping my technical expertise and problem-solving skills.",
  },
  {
    id: "Secondary Education",
    degree: "💡SECONDARY EDUCATION",
    institution: "Ramanuj Gupta Senior Secondary School",
    year: "2021-2023",
    image: "/assets/ramanuj.jpg",
    driveLink:
      "https://drive.google.com/file/d/1MMU-WngFawAeJ-nUddp-DgIeafcJxo_W/view?usp=drive_link",
    description:
      "At Ramanuj Gupta Senior Secondary School, I pursued my higher secondary education with a focus on Science(PCM). These two years were a transformative phase, where I honed my analytical and problem-solving abilities through Physics, Chemistry, and Mathematics. The challenging curriculum, along with engaging practical applications, nurtured my curiosity and deepened my passion for technology.",
  },
  {
    id: "PRIMARY EDUCATION",
    degree: "💡PRIMARY EDUCATION",
    institution: "Saint Vianney High School",
    year: "2008-2020",
    image: "/assets/education1.jpg",
    driveLink:
      "https://drive.google.com/file/d/1ff4lMpsiaKbLUqjNJV608wMbNPRc9K1f/view?usp=drive_link",
    description:
      "I began my educational journey at Saint Vianney School, where I studied from KG1 to Class10. During these formative years, I built a strong academic foundation, developed essential skills, and actively participated in various extracurricular activities. My time at Saint Vianney School played a crucial role in shaping my curiosity, discipline, and passion for learning, setting the stage for my future academic and personal growth.",
  },
];

export const Qualifications: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-yellow-50 dark:bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#1e293b_100%)] relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
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
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            Qualifications
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="flex flex-col gap-12">
          {qualifications.map((qualification) => (
            <motion.div
              key={qualification.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row-reverse gap-6 p-8">
                <motion.div
                  className="md:w-1/3 relative overflow-hidden rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="relative h-48 md:h-56 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={qualification.image}
                      alt={qualification.institution}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-300"
                    />
                  </motion.div>
                </motion.div>

                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-purple-400">
                      {qualification.degree}
                    </h3>
                    <div className="pl-4 space-y-1">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {qualification.institution}
                      </p>
                      <p className="text-blue-500 dark:text-purple-400 text-sm font-medium">
                        {qualification.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide text-justify border-l-2 border-blue-500 dark:border-purple-400 pl-4">
                    {qualification.description}
                  </p>

                  <div className="flex justify-end">
                    <a
                      href={qualification.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-blue-500 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 transition-colors"
                    >
                      <span className="font-medium">Credentials</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
