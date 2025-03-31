import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
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
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Reset index when switching between mobile and desktop
      if (mobile !== isMobile) {
        setCurrentIndex(0);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = isMobile ? testimonials.length - 1 : Math.ceil(testimonials.length / 3) - 1;
        return (prev + 1) % (maxIndex + 1);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = isMobile ? 10000 : 100000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => {
      const maxIndex = isMobile ? testimonials.length - 1 : Math.ceil(testimonials.length / 3) - 1;
      return (prev + newDirection + (maxIndex + 1)) % (maxIndex + 1);
    });
  };

  const getCurrentTestimonials = () => {
    if (isMobile) {
      return [testimonials[currentIndex]];
    }
    const startIndex = currentIndex * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-gray-50 dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.3 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex}
              custom={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: isMobile ? 200 : 300, damping: isMobile ? 20 : 30 },
                opacity: { duration: isMobile ? 0.2 : 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`${isMobile ? 'w-full max-w-2xl' : 'w-full max-w-6xl'} mx-4`}>
                <div className={`${isMobile ? 'flex-col' : 'flex-row'} flex gap-6 justify-center`}>
                  {getCurrentTestimonials().map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 transform transition-transform duration-300 hover:scale-[1.02] ${
                        isMobile ? 'w-full' : 'flex-1 max-w-md'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-blue-500/20">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-2">
                            <Quote size={16} />
                          </div>
                        </div>
                        <div className="text-center space-y-3">
                          <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={cn(
                                  "fill-current transition-all duration-300",
                                  i < testimonial.rating
                                    ? "text-yellow-400 drop-shadow-lg"
                                    : "text-gray-300 dark:text-gray-600"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg italic">
                            "{testimonial.content}"
                          </p>
                          <div className="space-y-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {Array.from({ length: isMobile ? testimonials.length : Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-4"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};