import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const greetings = [
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'Hello', lang: 'English' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Ciao', lang: 'Italian' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: '你好', lang: 'Chinese' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Olá', lang: 'Portuguese' }
];

interface FlashIntroProps {
  onComplete: () => void;
}

export default function FlashIntro({ onComplete }: FlashIntroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= greetings.length) {
          onComplete();
        }
        return next % greetings.length;
      });
    }, 250); // Faster interval

    const timeout = setTimeout(() => {
      onComplete();
    }, 2500); // Shorter total duration

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  const variants = {
    enter: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)"
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      filter: "blur(10px)",
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-48 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute flex flex-col items-center justify-center"
          >
            <motion.h2 
              className="text-white text-7xl md:text-8xl font-bold mb-4"
              animate={{ 
                opacity: [1, 0.7, 1],
                scale: [1, 1.05, 1],
                transition: { 
                  duration: 0.25,
                  times: [0, 0.5, 1],
                  repeat: 0
                }
              }}
            >
              {greetings[currentIndex].text}
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-2xl"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              {greetings[currentIndex].lang}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
