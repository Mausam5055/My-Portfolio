import { useCallback, useEffect, useState } from "react";
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

const icons: { [key: string]: LucideIcon } = {
  Code2,
  Rocket,
  GraduationCap,
  Globe,
  Target,
};

const getIcon = (iconName: string): LucideIcon => icons[iconName] || Target;

export const FutureGoals: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = useCallback((goal: Goal) => {
    setSelectedGoal(goal);
    window.history.pushState({ modal: true }, '');
  }, []);

  const closeModal = useCallback(() => {
    setSelectedGoal(null);
    if (window.history.state?.modal) {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => setSelectedGoal(null);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  const GoalModal: React.FC<{ goal: Goal }> = ({ goal }) => {
    const Icon = getIcon(goal.icon);
    
    return (
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
        onClick={closeModal}
      >
        <motion.div
          variants={contentVariants}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl relative border border-white/20 transform-gpu"
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <X strokeWidth={1.5} />
          </button>
          
          <div className="flex items-start gap-4 mb-6">
            <div className={cn(
              "p-3 rounded-xl bg-purple-100 dark:bg-purple-900/50",
              "text-purple-700 dark:text-purple-300"
            )}>
              <Icon strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {goal.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {goal.description}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {goal.progress}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Timeline: <span className="font-medium text-purple-600 dark:text-purple-400">{goal.timeline}</span>
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Milestones
            </h4>
            {goal.milestones.map((milestone, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {milestone.completed ? (
                  <CheckCircle strokeWidth={1.5} className="text-green-500 dark:text-green-400 w-4 h-4" />
                ) : (
                  <Circle strokeWidth={1.5} className="text-gray-400 dark:text-gray-600 w-4 h-4" />
                )}
                <span>{milestone.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderGoalCard = useCallback((goal: Goal, index: number) => {
    const Icon = getIcon(goal.icon);
    return (
      <motion.div
        key={goal.id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.2 }}
        onClick={() => isMobile && openModal(goal)}
        className={cn(
          "group bg-white dark:bg-gray-900",
          "rounded-xl p-6 shadow-sm hover:shadow-md",
          "transform-gpu transition-all duration-200",
          "border border-gray-100 dark:border-gray-800",
          isMobile && "active:scale-[0.99] cursor-pointer"
        )}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            "p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50",
            "text-purple-700 dark:text-purple-300"
          )}>
            <Icon strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-2">
              {goal.title}
            </h3>
            {!isMobile && (
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                {goal.description}
              </p>
            )}
          </div>
        </div>

        {!isMobile && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-base mb-1.5">
                <span className="text-gray-600 dark:text-gray-400">
                  Progress
                </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {goal.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-base text-gray-600 dark:text-gray-400">
                Timeline: <span className="font-medium text-purple-600 dark:text-purple-400">{goal.timeline}</span>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Milestones
              </h4>
              {goal.milestones.map((milestone, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-400"
                >
                  {milestone.completed ? (
                    <CheckCircle strokeWidth={1.5} className="text-green-500 dark:text-green-400 w-5 h-5" />
                  ) : (
                    <Circle strokeWidth={1.5} className="text-gray-400 dark:text-gray-600 w-5 h-5" />
                  )}
                  <span>{milestone.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  }, [isMobile, openModal]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Future Goals
          </h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {goals.map((goal, index) => renderGoalCard(goal, index))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedGoal && <GoalModal goal={selectedGoal} />}
      </AnimatePresence>
    </section>
  );
};
