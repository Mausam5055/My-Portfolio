import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "../shared/utils";

type GamingPost = {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string;
  slug: string;
};

const gamingPosts: GamingPost[] = [
  {
    id: "1",
    title: "Spider-Man: Miles Morales – Ultimate Web-Swinging Experience",
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-20",
    author: "Mausam Kar",
    slug: "spider-man"
  },
  {
    id: "2",
    title: "BGMI – Intense Battle Royale Action",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-18",
    author: "Mausam Kar",
    slug: "bgmi"
  },
  {
    id: "3",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-15",
    author: "Mausam Kar",
    slug: "asphalt-9"
  },
  {
    id: "4",
    title: "Asphalt 9: Legends – High-Speed Racing Action",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    date: "2024-03-15",
    author: "Mausam Kar",
    slug: "asphalt-9"
  },
];

export const Games: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar when component mounts and show it when unmounts
  useEffect(() => {
    // Hide navbar
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Cleanup function to show navbar when component unmounts
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  useEffect(() => {
    // Add a new history entry when the component mounts
    window.history.pushState({ fromGames: true }, '', window.location.href);

    // Handle browser back button
    const handlePopState = () => {
      // Prevent default navigation
      window.history.pushState({ fromGames: true }, '', window.location.href);
      
      // Navigate back to home with scroll state
      navigate('/', { 
        state: { scrollToGaming: true },
        replace: true
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/', { 
      state: { scrollToGaming: true },
      replace: true
    });
  };

  const handlePostClick = (slug: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    navigate(`/games/${slug}`, { state: { fromGames: true } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative">
      {/* Hero Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Gaming Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent dark:from-[#111827] via-transparent dark:via-[#111827]/80 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMjUgMzUuMjVhMS4yNSAxLjI1IDAgMTAwLTIuNSAxLjI1IDEuMjUgMCAwMDAgMi41eiIgZmlsbD0iI2U1ZTdmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-30">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackClick}
              className={cn(
                "p-2 rounded-full",
                "bg-white/80 dark:bg-gray-800/80",
                "border border-gray-200 dark:border-gray-700",
                "hover:bg-blue-50 dark:hover:bg-gray-700",
                "transition-all duration-300",
                "group"
              )}
              aria-label="Back to Home"
            >
              <ArrowLeft 
                size={20} 
                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:-translate-x-1 transition-all duration-300" 
              />
            </motion.button>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              All Games
            </h1>
          </div>
          <p className="text-xl text-white">
            Explore all our gaming content and experiences
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamingPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm",
                "aspect-square rounded-xl overflow-hidden",
                "shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                "transform transition-all duration-300",
                "border border-white/20 dark:border-gray-700/50",
                "group relative cursor-pointer z-10",
              )}
              onClick={() => handlePostClick(post.slug)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="h-full w-full overflow-hidden relative">
                <motion.div
                  className="h-full"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {post.date} • {post.author}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={cn(
                    "text-blue-400 font-medium",
                    "hover:text-blue-300",
                    "transition-colors duration-300",
                    "group/link relative flex items-center gap-2",
                  )}
                >
                  <span className="relative z-10">View Details</span>
                  <motion.span
                    className="inline-block"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover/link:w-full transition-all duration-300" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games; 