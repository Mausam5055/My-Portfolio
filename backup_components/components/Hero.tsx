import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Instagram, Linkedin, Send } from "lucide-react";
import { useThemeStore } from "../store/theme";

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
    label: "GitHub Profile",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/_mausam__kar___/",
    color: "#E1306C",
    label: "Instagram Profile",
  },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/mausam-kar-6388861a7/",
    color: "#0077B5",
    label: "LinkedIn Profile",
  },
  {
    icon: Send,
    url: "https://t.me/yourusername",
    color: "#0088cc",
    label: "Telegram Contact",
  },
];

export default function Hero() {
  const { isDark } = useThemeStore();
  const [currentName, setCurrentName] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);

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
    <header className="relative min-h-screen" role="banner">
      {/* Background with Theme Support */}
      <div className="absolute inset-0 overflow-hidden">
        {isDark ? (
          !videoError ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/assets/video-poster.jpg"
              onError={() => setVideoError(true)}
            >
              <source src="/assets/video3.webm" type="video/webm" />
              <source src="/assets/video3.mp4" type="video/mp4" />
              <p>Your browser doesn't support HTML5 video.</p>
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
              aria-hidden="true"
            />
          )
        ) : (
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574302833650-e91c6ec31969?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'normal',
            }}
            aria-hidden="true"
          />
        )}
        <div 
          className={`absolute inset-0 ${
            isDark 
              ? "bg-black/60"
              : "bg-white/40"
          }`} 
          aria-hidden="true"
        />
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
                boxShadow: isDark 
                  ? "0 0 30px rgba(59, 130, 246, 0.3)"
                  : "0 0 30px rgba(59, 130, 246, 0.2)",
              }}
            >
              <img
                src="/assets/profile.jpg"
                alt="Mausam Kar - Web Developer and UI/UX Designer"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/fallback-profile.jpg";
                }}
              />
            </motion.div>

            {/* Name and Language */}
            <div className="text-center space-y-3 z-10">
              <motion.h1
                key={`${currentName}-${isDark ? 'dark' : 'light'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-6xl md:text-7xl font-bold inline-block"
              >
                <span
                  className="inline-block relative"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    backgroundImage: isDark
                      ? "linear-gradient(to right, #60A5FA, #A78BFA)"
                      : "linear-gradient(to right, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    textShadow: "none",
                    zIndex: 20,
                  }}
                >
                  {names[currentName].text}
                </span>
              </motion.h1>
              <motion.p
                key={`lang-${isDark ? 'dark' : 'light'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`text-lg tracking-wide font-medium ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {names[currentName].lang}
              </motion.p>
            </div>
          </div>

          {/* Quote Section */}
          <motion.figure
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl text-center space-y-4"
          >
            <blockquote className={`text-2xl md:text-3xl italic tracking-wide leading-relaxed ${isDark ? "text-white" : "text-gray-800"}`}>
              "{quotes[currentQuote].text}"
            </blockquote>
            <figcaption className="flex items-center justify-center space-x-4">
              <div className={`w-12 h-px ${isDark ? "bg-gray-400" : "bg-gray-300"}`} aria-hidden="true" />
              <p className={isDark ? "text-white" : "text-gray-700"}>
                {quotes[currentQuote].author}
              </p>
              <div className={`w-12 h-px ${isDark ? "bg-gray-400" : "bg-gray-300"}`} aria-hidden="true" />
            </figcaption>
          </motion.figure>

          {/* Social Icons */}
          <nav className="flex gap-8" aria-label="Social Links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`relative p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                }`}
                whileHover={{ scale: 1.15 }}
                onHoverStart={() => setHoveredIcon(index)}
                onHoverEnd={() => setHoveredIcon(null)}
                style={{
                  boxShadow:
                    hoveredIcon === index
                      ? `0 0 30px ${social.color}`
                      : isDark
                      ? "0 0 20px rgba(255,255,255,0.1)"
                      : "0 0 20px rgba(0,0,0,0.1)",
                }}
              >
                <social.icon
                  size={28}
                  style={{
                    color: hoveredIcon === index ? social.color : isDark ? "white" : "#333",
                  }}
                />
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
