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
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`fixed inset-0 z-[9999] pointer-events-none ${
            isDark 
              ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" 
              : "bg-gradient-to-br from-white via-gray-50 to-white"
          }`}
        />
      )}
    </AnimatePresence>
  );
} 