import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import type { Journey } from "../types";

const journeyEvents: Journey[] = [
  {
    date: "2025",
    title: " DevOps",
    description:
      "I am exploring DevOps to integrate development and operations seamlessly, focusing on streamlining workflows, automating processes, and enhancing delivery cycles through Continuous Integration (CI) and Continuous Deployment (CD).Working with tools like Docker, Kubernetes, Jenkins, and Git, I aim to improve collaboration, system reliability, and scalability. My goal is to optimize the software development lifecycle, ensuring high-quality, secure, and scalable products.",
    image: "assets/born.jpg",
  },
  {
    date: "2024",
    title: " Creative web Developer",
    description:
      "I specialize in creating user-friendly and visually appealing websites. With a deep understanding of both front-end and back-end development, I work to bridge the gap between functionality and design. My expertise lies in HTML, CSS, JavaScript, and frameworks like React, ensuring that every website I build is not only responsive and efficient but also aligned with the latest industry trends.",
    image:
      "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    date: "2005-infinity",
    title: "Hobby : Gaming",
    description:
      " Gaming not only serves as a hobby but also inspires my approach to challenges in real life—whether it’s staying focused, adapting to new strategies, or thinking outside the box. It has helped me develop quick decision-making skills and a strong sense of perseverance, which I apply both in gaming and my professional life.",
    image: "assets/gallery/7.jpg",
  },
  {
    date: "22/03/2005",
    title: "Born In: Assam",
    description:
      " A moment in time that holds a special place in my story. Every year since has been a chapter filled with growth, learning, and new experiences. My journey began on this day, and it continues to unfold as I embrace each new challenge and opportunity that comes my way.",
    image: "assets/me.jpg",
  },
];

export const Journey: React.FC = () => {
  return (
    <section
      id="Journey"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)", // Light yellow accent in light theme
      }}
    >
      <div className="container mx-auto">
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
            className="text-4xl md:text-5xl font-bold text-black dark:text-white"
          >
            My Journey
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-500 md:-translate-x-1/2 z-0"
          />

          <div className="space-y-16">
            {journeyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative grid grid-cols-1 md:grid-cols-2 gap-8",
                  index % 2 === 0 ? "md:text-right" : "md:text-left",
                )}
              >
                {/* Content Column with spacing and z-index */}
                <div
                  className={cn(
                    "flex flex-col justify-center md:px-8 pl-12 z-10", // Added z-10 here
                    index % 2 === 0 ? "md:order-1" : "md:order-2",
                  )}
                >
                  <div className="space-y-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {event.date}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Image Column */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "relative rounded-lg overflow-hidden shadow-lg z-10",
                    index % 2 === 0 ? "md:order-2" : "md:order-1",
                  )}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
