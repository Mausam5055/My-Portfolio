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
      "✔️Mausam's ability to blend storytelling with design is exceptional. He brings ideas to life in a unique way.",
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
      "✔️Mausam's professionalism and dedication to his work are truly inspiring. He consistently delivers high-quality results.",
    rating: 3.9,
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [direction, setDirection] = useState(0);
  const autoScrollTimer = useRef<NodeJS.Timeout>();
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }

    const startAutoScroll = () => {
      if (!isTransitioning.current && isAutoScrolling) {
        isTransitioning.current = true;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
        
        setTimeout(() => {
          isTransitioning.current = false;
        }, 1500);
      }
    };

    autoScrollTimer.current = setInterval(startAutoScroll, 5000);
    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [isAutoScrolling]);

  const handleNext = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
      setIsAutoScrolling(false);
      
      setTimeout(() => {
        isTransitioning.current = false;
        setIsAutoScrolling(true);
      }, 1500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning.current) {
      isTransitioning.current = true;
      setDirection(-1);
      setCurrentIndex((prev) =>
        prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1,
      );
      setIsAutoScrolling(false);
      
      setTimeout(() => {
        isTransitioning.current = false;
        setIsAutoScrolling(true);
      }, 1500);
    }
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * 3,
    currentIndex * 3 + 3,
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)",
      }}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            Testimonials
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hidden md:block transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hidden md:block transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight size={24} />
          </motion.button>

          <div className="flex transition-transform duration-500 ease-in-out">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35,
                    mass: 1
                  },
                  opacity: { 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  scale: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                      boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
                      y: -10,
                    }}
                    className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transform transition-all duration-500 relative overflow-hidden"
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-center space-x-4 mb-6 relative z-10"
                    >
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/20"
                        >
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm"
                        />
                      </div>
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
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-gray-700 dark:text-gray-300 mb-6 relative z-10 text-left whitespace-normal break-words"
                      style={{ 
                        textAlign: 'left',
                        lineHeight: '1.6',
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {testimonial.content}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-center space-x-1 relative z-10"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={cn(
                            "fill-current transition-all duration-300",
                            i < testimonial.rating
                              ? "text-yellow-400 drop-shadow-lg"
                              : "text-gray-300 dark:text-gray-600",
                          )}
                        />
                      ))}
                    </motion.div>
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