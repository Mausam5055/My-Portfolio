import React from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";
import { cn } from "../lib/utils";
import type { EducationalNote } from "../types";

const educationalNotes: EducationalNote[] = [
  {
    subject: "Physics",
    chapters: [
      {
        title: "Classical Mechanics",
        description: "Understanding Newton's laws and their applications",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        driveLink: "https://drive.google.com/example1",
      },
      {
        title: "Thermodynamics",
        description: "Heat, energy, and their transformations",
        image: "https://images.unsplash.com/photo-1612178537253-bccd437b730e",
        driveLink: "https://drive.google.com/example2",
      },
    ],
  },
  {
    subject: "Chemistry",
    chapters: [
      {
        title: "Organic Chemistry",
        description: "Study of carbon-based compounds",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
        driveLink: "https://drive.google.com/example3",
      },
      {
        title: "Chemical Bonding",
        description: "Understanding molecular structures",
        image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6",
        driveLink: "https://drive.google.com/example4",
      },
    ],
  },
  {
    subject: "Mathematics",
    chapters: [
      {
        title: "Calculus",
        description: "Derivatives and integrals",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
        driveLink: "https://drive.google.com/example5",
      },
      {
        title: "Linear Algebra",
        description: "Matrices and vector spaces",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
        driveLink: "https://drive.google.com/example6",
      },
    ],
  },
];

export const Notes: React.FC = () => {
  return (
    <section id="notes" className="py-20 bg-pink-50/50 dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 text-center mb-12"
        >
          Educational Notes
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationalNotes.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white dark:bg-gray-900",
                "rounded-lg overflow-hidden",
                "shadow-lg hover:shadow-xl",
                "transform transition-all duration-300",
              )}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-6">
                  {subject.subject}
                </h3>
                <div className="space-y-4">
                  {subject.chapters.map((chapter, chapterIndex) => (
                    <motion.a
                      key={chapter.title}
                      href={chapter.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="block group"
                    >
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={chapter.image}
                          alt={chapter.title}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={cn(
                            "absolute inset-0 bg-black/0 group-hover:bg-black/40",
                            "flex items-center justify-center",
                            "transition-all duration-200",
                          )}
                        >
                          <Book
                            size={40}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          />
                        </div>
                      </div>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                        {chapter.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {chapter.description}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
