import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Instagram, Linkedin, Send } from "lucide-react";

const names = [{ text: "Mausam Kar", lang: "English" }];

const quotes = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
];

const socialLinks = [
  {
    icon: Github,
    url: "https://github.com/Mausam5055",
    color: "#333",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/_mausam__kar___/",
    color: "#E1306C",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/mausam-kar-6388861a7/",
    color: "#0077B5",
  },
  {
    icon: Send,
    url: "https://t.me/yourusername",
    color: "#0088cc",
  },
];

export default function Profile() {
  const [currentName, setCurrentName] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  useEffect(() => {
    const nameInterval = setInterval(() => {
      setCurrentName((prev) => (prev + 1) % names.length);
    }, 3000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(nameInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Video Background with Overlay Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/video3.webm" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center space-y-16">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-8">
            {/* Profile Picture */}
            <motion.div
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              style={{
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              }}
            >
              <img
                src="/assets/profile.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Name and Language */}
            <div className="text-center space-y-3">
              <motion.h2
                key={currentName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-6xl md:text-7xl font-bold text-white"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  background: "linear-gradient(to right, #60A5FA, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {names[currentName].text}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                className="text-lg text-white tracking-wide"
              >
                {names[currentName].lang}
              </motion.p>
            </div>
          </div>

          {/* Quote Section */}
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl text-center space-y-4"
          >
            <p className="text-2xl md:text-3xl italic tracking-wide leading-relaxed text-white">
              "{quotes[currentQuote].text}"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-px bg-gray-400" />
              <p className="text-white tracking-wider">
                {quotes[currentQuote].author}
              </p>
              <div className="w-12 h-px bg-gray-400" />
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.15 }}
                onHoverStart={() => setHoveredIcon(index)}
                onHoverEnd={() => setHoveredIcon(null)}
                style={{
                  boxShadow:
                    hoveredIcon === index
                      ? `0 0 30px ${social.color}`
                      : "0 0 20px rgba(255,255,255,0.1)",
                }}
              >
                <social.icon
                  size={28}
                  style={{
                    color: hoveredIcon === index ? social.color : "white",
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
