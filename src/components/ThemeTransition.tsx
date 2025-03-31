import { motion, AnimatePresence } from "framer-motion";

interface ThemeTransitionProps {
  isChanging: boolean;
  isDark: boolean;
}

export default function ThemeTransition({ isChanging, isDark }: ThemeTransitionProps) {
  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 z-[9999] pointer-events-none ${
            isDark 
              ? "bg-black" 
              : "bg-white"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.1
                }}
                className={`text-4xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {isDark ? "🌙" : "☀️"}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 