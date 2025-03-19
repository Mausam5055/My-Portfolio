import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import type { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mangal Singh",
    role: "Creative Director",
    company: "Design Studio Co.",
    image: "/assets/testimonials/mangal.jpg",
    content:
      "✔️Working with Mausam was an absolute pleasure. his attention to detail and creative approach brought our vision to life in ways we couldn't have imagined.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sauvik kar",
    role: "Tech Lead",
    company: "Innovation Labs",
    image: "/assets/testimonials/sauvik.jpg",
    content:
      "✔️Mausam's technical expertise combined with his artistic flair produced exceptional results. He's a true professional who delivers beyond expectations.",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Priyanka Nath",
    role: "Product Manager",
    company: "Tech Innovations",
    image: "/assets/testimonials/priyanka.jpg",
    content:
      "✔️The level of creativity and technical skill Mausam brings to projects is remarkable. He has a unique ability to transform complex ideas into beautiful, functional solutions.",
    rating: 3.8,
  },
  {
    id: "4",
    name: "Papiya Nath",
    role: "Marketing Specialist",
    company: "Creative Agency",
    image: "/assets/testimonials/papiya.jpg ",
    content:
      "✔️Mausam has a knack for understanding client needs and delivering results that exceed expectations. Highly recommended!",
    rating: 3,
  },
  {
    id: "5",
    name: "Ashish Sharma",
    role: "UX Designer",
    company: "Design Hub",
    image: "/assets/testimonials/asish.jpg",
    content:
      "✔️his designs are not only visually stunning but also user-friendly. Mausam is a true asset to any team.",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Nobojyoti Sinha",
    role: "Software Engineer",
    company: "Tech Solutions",
    image: "/assets/testimonials/nobojyoti.jpg",
    content:
      "✔️Working with Mausam was a game-changer for our project. his insights and creativity made a significant impact.",
    rating: 4.1,
  },
  {
    id: "7",
    name: "Abhijeet Sharma",
    role: "Content Strategist",
    company: "Media Group",
    image: "/assets/testimonials/abhijit.jpg",
    content:
      "✔️Mausam’s ability to blend storytelling with design is exceptional. He brings ideas to life in a unique way.",
    rating: 4,
  },
  {
    id: "8",
    name: "Sharmee Roy",
    role: "Business Analyst",
    company: "Consulting Firm",
    image: "/assets/testimonials/sharmee.jpg",
    content:
      "✔️His analytical skills combined with creativity make his a valuable team member. I look forward to working with his again.",
    rating: 4.7,
  },
  {
    id: "9",
    name: "Raj Kumar",
    role: "Project Coordinator",
    company: "Global Enterprises",
    image: "/assets/testimonials/raj.webp",
    content:
      "✔️Mausam’s professionalism and dedication to his work are truly inspiring. He consistently delivers high-quality results.",
    rating: 3.9,
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    autoScrollTimer.current = setInterval(() => {
      if (isAutoScrolling) {
        setCurrentIndex(
          (prev) => (prev + 1) % Math.ceil(testimonials.length / 3),
        );
      }
    }, 5000);
    return () => clearInterval(autoScrollTimer.current);
  }, [isAutoScrolling]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1,
    );
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3,
  );

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)", // Light yellow accent in light theme
      }}
    >
      <div className="container mx-auto">
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
            className="text-4xl md:text-5xl font-bold text-black dark:text-white" // Set to black in light mode and white in dark mode
          >
            Testimonials
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white hidden md:block"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex transition-transform duration-500 ease-in-out">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50/50 dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transform transition-all duration-300 relative"
                  >
                    <Quote
                      size={40}
                      className="text-blue-300 dark:text-blue-700 absolute top-4 right-4 opacity-20"
                    />
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={cn(
                            "fill-current",
                            i < testimonial.rating
                              ? "text-blue-500 dark:text-blue-400"
                              : "text-gray-300 dark:text-gray-600",
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
