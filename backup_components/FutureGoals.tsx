import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Rocket, GraduationCap, Globe, Target,
  CheckCircle, Circle
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Goal } from '../types';

const goals: Goal[] = [
  {
    id: '1',
    title: 'Master Advanced Web Technologies',
    description: 'Deepen expertise in modern web frameworks and tools',
    timeline: '2025-2027',
    progress: 60,
    icon: 'Code2',
    milestones: [
      { title: 'Learn WebAssembly', completed: true },
      { title: 'Master Next.js 14', completed: true },
      { title: 'Explore Edge Computing', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Launch Tech Startup',
    description: 'Create innovative solutions for creative professionals',
    timeline: '2028',
    progress: 30,
    icon: 'Rocket',
    milestones: [
      { title: 'Market Research', completed: true },
      { title: 'MVP Development', completed: false },
      { title: 'Secure Funding', completed: false }
    ]
  },
  {
    id: '3',
    title: 'Advanced AI Certification',
    description: 'Specialize in AI and machine learning applications',
    timeline: '2028',
    progress: 45,
    icon: 'GraduationCap',
    milestones: [
      { title: 'Complete Core Courses', completed: true },
      { title: 'Build AI Projects', completed: false },
      { title: 'Final Certification', completed: false }
    ]
  }
];

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType } = {
    Code2, Rocket, GraduationCap, Globe, Target
  };
  return icons[iconName] || Target;
};

export const FutureGoals: React.FC = () => {
  return (
    <section
    id="Journey"
    className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
    style={{
      backgroundColor: "rgba(255, 255, 204, 0.2)" // Slightly more visible light yellow accent
    }}
  >
      <div className="container mx-auto px-6">
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
                   Future Goals
                 </motion.h2>
                 <motion.div
                   initial={{ width: 0 }}
                   whileInView={{ width: "180px" }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
                 />
               </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {goals.map((goal, index) => {
            const Icon = getIcon(goal.icon);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={cn(
                  "bg-blue-50 dark:bg-gray-900",
                  "rounded-xl p-6 shadow-lg hover:shadow-2xl",
                  "transform transition-all duration-300 border border-blue-300 dark:border-blue-600"
                )}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={cn(
                    "p-3 rounded-lg bg-purple-200 dark:bg-purple-800",
                    "text-purple-700 dark:text-purple-300"
                  )}>
                    <Icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {goal.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{goal.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${goal.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-blue-500 dark:bg-blue-400 rounded-full shadow-md"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Target: <span className="text-purple-600 dark:text-purple-400 font-medium">{goal.timeline}</span>
                  </p>
                </div>

                {/* Milestones */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Milestones
                  </h4>
                  {goal.milestones.map((milestone, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      {milestone.completed ? (
                        <CheckCircle size={16} className="text-blue-500 dark:text-blue-400" />
                      ) : (
                        <Circle size={16} className="text-gray-400 dark:text-gray-600" />
                      )}
                      <span>{milestone.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
