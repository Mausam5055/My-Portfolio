import React from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  Plane,
  Coffee,
  Code2,
  Music,
  Camera,
  Book,
  Gamepad,
  Heart,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { FunFact } from "../types";

const funFacts: FunFact[] = [
  {
    id: "1",
    title: "Favorite Tech Stack",
    description: "TypeScript + React + Tailwind = ❤️",
    icon: "Code2",
    category: "tech",
  },
  {
    id: "2",
    title: "Travel Goals",
    description: "Visited 10 states, aiming for 28!",
    icon: "Plane",
    category: "travel",
  },
  {
    id: "3",
    title: "Coffee Addiction",
    description: "3 cups of coffee per day keeps the bugs away",
    icon: "Coffee",
    category: "personal",
  },
  {
    id: "4",
    title: "Gaming Setup",
    description: "Proud owner of a custom-built gaming PC",
    icon: "Gamepad",
    category: "hobby",
  },
  {
    id: "5",
    title: "Music While Coding",
    description: "Lo-fi beats are my coding companion",
    icon: "Music",
    category: "personal",
  },
  {
    id: "6",
    title: "Photography",
    description: "Amateur photographer with a love for landscapes",
    icon: "Camera",
    category: "hobby",
  },
];

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType } = {
    Laptop,
    Plane,
    Coffee,
    Code2,
    Music,
    Camera,
    Book,
    Gamepad,
    Heart,
  };
  return icons[iconName] || Heart;
};

export const FunFacts: React.FC = () => {
  return (
    <section
      id="Journey"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.2)", // Slightly more visible light yellow accent
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white" // Set to black in light mode and white in dark mode
          >
            Fun Facts About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {funFacts.map((fact, index) => {
            const Icon = getIcon(fact.icon);
            return (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className={cn(
                  "group bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-900",
                  "rounded-2xl p-6 border border-blue-200/30 dark:border-gray-700",
                  "shadow-xl hover:shadow-2xl backdrop-blur-sm",
                  "transform transition-all duration-300 relative",
                  "hover:border-blue-300/50 dark:hover:border-purple-500/30",
                )}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col items-center mb-4 relative z-10">
                  <div
                    className={cn(
                      "p-4 rounded-2xl mb-4",
                      "bg-gradient-to-br from-blue-500 to-purple-600",
                      "text-white shadow-lg",
                      "transition-transform duration-300",
                    )}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }} // Inner icon rotates on hover
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon size={28} className="stroke-[1.5]" />
                    </motion.div>
                  </div>
                </div>

                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 text-center"
                >
                  {fact.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1 }}
                  className="text-gray-600 dark:text-gray-300 text-sm text-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-medium"
                >
                  {fact.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
