import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Rocket,
  GraduationCap,
  Globe,
  Target,
  CheckCircle,
  Circle,
  X,
  LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { Goal } from "../types";

const goals: Goal[] = [
  {
    id: "1",
    title: "Master Advanced Web Technologies",
    description: "Deepen expertise in modern web frameworks and tools",
    timeline: "2025-2027",
    progress: 60,
    icon: "Code2",
    milestones: [
      { title: "Learn WebAssembly", completed: true },
      { title: "Master Next.js 14", completed: true },
      { title: "Explore Edge Computing", completed: false },
    ],
  },
  {
    id: "2",
    title: "Launch Tech Startup",
    description: "Create innovative solutions for creative professionals",
    timeline: "2028",
    progress: 30,
    icon: "Rocket",
    milestones: [
      { title: "Market Research", completed: true },
      { title: "MVP Development", completed: false },
      { title: "Secure Funding", completed: false },
    ],
  },
  {
    id: "3",
    title: "Advanced AI Certification",
    description: "Specialize in AI and machine learning applications",
    timeline: "2028",
    progress: 45,
    icon: "GraduationCap",
    milestones: [
      { title: "Complete Core Courses", completed: true },
      { title: "Build AI Projects", completed: false },
      { title: "Final Certification", completed: false },
    ],
  },
];

const getIcon = (iconName: string): LucideIcon => {
  const icons: { [key: string]: LucideIcon } = {
    Code2,
    Rocket,
    GraduationCap,
    Globe,
    Target,
  };
  return icons[iconName] || Target;
};

export const FutureGoals: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const handlePopState = () => {
      setSelectedGoal(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openModal = (goal: Goal) => {
    setSelectedGoal(goal);
    window.history.pushState({ modal: true }, '');
  };

  const closeModal = () => {
    setSelectedGoal(null);
    if (window.history.state?.modal) {
      window.history.back();
    }
  };

  const GoalModal: React.FC<{ goal: Goal }> = ({ goal }) => {
    const Icon = getIcon(goal.icon);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ 
            type: "tween", 
            duration: 0.2,
            ease: "easeOut"
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative border border-white/20 will-change-transform"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <X strokeWidth={1.5} />
          </motion.button>
          
          <div className="flex items-start gap-4 mb-8">
            <div className={cn(
              "p-4 rounded-2xl bg-gradient-to-br from-purple-400/20 to-purple-600/20 dark:from-purple-500/20 dark:to-purple-800/20",
              "text-purple-700 dark:text-purple-300 backdrop-blur-sm"
            )}>
              <Icon strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-2">
                {goal.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {goal.description}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {goal.progress}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-full shadow-lg"
              />
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Target Timeline:{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 font-medium">
                {goal.timeline}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Milestones
            </h4>
            {goal.milestones.map((milestone, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {milestone.completed ? (
                  <CheckCircle strokeWidth={1.5} className="text-green-500 dark:text-green-400" />
                ) : (
                  <Circle strokeWidth={1.5} className="text-gray-400 dark:text-gray-600" />
                )}
                <span>{milestone.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section
      id="Journey"
      className="py-20 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_center,_rgba(25,25,25,0.8)_0%,_transparent_100%)]" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="mb-16 text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-700 to-blue-900 dark:from-white dark:via-purple-400 dark:to-blue-400">
            Future Goals
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.3 }}
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goals.map((goal, index) => {
            const Icon = getIcon(goal.icon);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                onClick={() => isMobile && openModal(goal)}
                className={cn(
                  "group bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm",
                  "rounded-2xl p-6 shadow-lg hover:shadow-2xl",
                  "transform transition-all duration-200",
                  "border border-white/20 dark:border-gray-800",
                  "hover:border-purple-500/20 dark:hover:border-purple-500/20",
                  "will-change-transform",
                  isMobile && "cursor-pointer active:scale-98"
                )}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={cn(
                      "p-4 rounded-2xl bg-gradient-to-br from-purple-400/20 to-purple-600/20 dark:from-purple-500/20 dark:to-purple-800/20",
                      "text-purple-700 dark:text-purple-300 backdrop-blur-sm",
                      "group-hover:from-purple-400/30 group-hover:to-purple-600/30",
                      "transition-colors duration-300"
                    )}
                  >
                    <Icon strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-1">
                      {goal.title}
                    </h3>
                    {!isMobile && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {goal.description}
                      </p>
                    )}
                  </div>
                </div>

                {!isMobile && (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          Progress
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${goal.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 rounded-full shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Target:{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 font-medium">
                          {goal.timeline}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Milestones
                      </h4>
                      {goal.milestones.map((milestone, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          {milestone.completed ? (
                            <CheckCircle
                              strokeWidth={1.5}
                              className="text-green-500 dark:text-green-400"
                            />
                          ) : (
                            <Circle
                              strokeWidth={1.5}
                              className="text-gray-400 dark:text-gray-600"
                            />
                          )}
                          <span>{milestone.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedGoal && <GoalModal goal={selectedGoal} />}
      </AnimatePresence>
    </section>
  );
};
