import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sentences = [
  "front-end developer",
  "back-end developer",
  "full-stack developer"
];

export default function TypewriterText() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const sentence = sentences[currentSentence];
    const totalDuration = 3000; // Total time for each sentence (3 seconds)
    const typingDuration = 1500; // Time to type the sentence (1.5 seconds)
    const pauseDuration = 1000; // Time to pause before transitioning (1 second)
    
    if (isTyping) {
      const charInterval = typingDuration / sentence.length;
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= sentence.length) {
          setDisplayText(sentence.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      }, charInterval);

      return () => clearInterval(typingInterval);
    } else {
      // Smooth fade out and transition to next sentence
      setTimeout(() => {
        setCurrentSentence((prev) => (prev + 1) % sentences.length);
        setDisplayText('');
        setIsTyping(true);
      }, 500); // Quick transition to next sentence
    }
  }, [currentSentence, isTyping]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-light text-white" // Changed to white
      >
        I am into...
      </motion.p>
      <div className="h-12 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSentence}
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <motion.p
              className="text-3xl font-medium text-white" // Changed to white
              style={{
                background: 'linear-gradient(to right, #60A5FA, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.3))'
              }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ 
                  duration: 0.7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="inline-block ml-1 font-light"
              >
                ｜
              </motion.span>
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
