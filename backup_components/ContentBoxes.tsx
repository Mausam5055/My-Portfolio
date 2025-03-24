import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ContentBox } from '../types';

const boxes: ContentBox[] = [
  {
    id: 1,
    title: "About",
    description: "Learn more about me and my background.",
    image: "/assets/about3.jpg"
  },
  {
    id: 2,
    title: "Journey",
    description: "My professional journey and experiences.",
    image: "https://images.unsplash.com/photo-1508169351866-777fc0047ac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3MDY1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 3,
    title: "Qualifications",
    description: "My academic and professional qualifications.",
    image: "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "Certifications",
    description: "Certifications I have earned through dedicated learning.",
    image: "https://media.istockphoto.com/id/2164485793/photo/cropped-hands-of-businessman-holding-certificate.jpg?s=2048x2048&w=is&k=20&c=Vr0RidPPf0nca75MlWjSUgyd26-eDENomwsxIeIEDCk="
  },
  {
    id: 5,
    title: "Skills",
    description: "Technical and professional skills I've mastered.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ2ODQ1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 6,
    title: "Academic Resources",
    description: "Academic background and educational journey.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ2ODk1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 7,
    title: "Gallery",
    description: "Visual showcase of my projects and achievements.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ2OTQ1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 8,
    title: "Cubing Skills",
    description: "Speedcubing achievements and competition history.",
    image: "https://images.unsplash.com/photo-1567646303972-f7de3a9c0a05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJ1YmlrJTIwY3ViZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    title: "Projects",
    description: "Notable technical projects and implementations.",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3MTI1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 10,
    title: "Gaming",
    description: "Gameplay highlights and gaming achievements.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3MzA1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 11,
    title: "Fun Facts",
    description: "Interesting personal trivia and quirks.",
    image: "https://images.unsplash.com/photo-1489367874814-f5d040621dd8?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 12,
    title: "Inspirations",
    description: "People and ideas that drive my creativity.",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3MTI1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 13,
    title: "Future Goals",
    description: "Aspirations and roadmap for coming years.",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3MTg1&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    id: 14,
    title: "Testimonials",
    description: "Endorsements from colleagues and clients.",
    image: "https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 15,
    title: "Contact",
    description: "Let's connect and collaborate!",
    image: "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjM1ODQ3NDI1&ixlib=rb-1.2.1&q=80&w=400"
  }
];

export default function ContentBoxes({ refs }: { refs: any }) {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice = 'ontouchstart' in window;

  const handleBoxClick = (id: number) => {
    const sectionKeys = Object.keys(refs);
    if (sectionKeys[id - 1] && refs[sectionKeys[id - 1]].current) {
      refs[sectionKeys[id - 1]].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX: number = 0;
    let isSwiping: boolean = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseOver || !container) return;
      const { clientX } = event;
      const { left, right, width } = container.getBoundingClientRect();

      const scrollSpeed = 15;
      const scrollThreshold = width * 0.15;

      if (clientX < left + scrollThreshold) {
        container.scrollBy({ left: -scrollSpeed, behavior: 'smooth' });
      } else if (clientX > right - scrollThreshold) {
        container.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!container) return;
      startX = event.touches[0].clientX;
      isSwiping = true;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isMouseOver || !container || !isSwiping) return;
      event.preventDefault();
      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;

      container.scrollBy({ left: -deltaX, behavior: 'smooth' });
      startX = touch.clientX;
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    if (isTouchDevice) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (isTouchDevice) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [containerRef, isMouseOver]);

  return (
    <section 
      id="content-boxes"
      className="py-20 bg-white dark:bg-[radial-gradient(circle_at_center,_#000000_0%,_#111827_100%)] relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 204, 0.05)"
      }}
    >
      {/* Section Title */}
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
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
        >
          Explore My World
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "180px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"
        />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-48 h-48 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Content Boxes Container */}
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto px-4 py-2 no-scrollbar"
          style={{
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none'  /* IE and Edge */
          }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="flex gap-4 md:gap-6"
          >
            {boxes.map((box) => (
              <motion.div
                key={box.id}
                whileHover={{ 
                  scale: isTouchDevice ? 1 : 1.05, 
                  y: isTouchDevice ? 0 : -5,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => !isTouchDevice && setHoveredBox(box.id)}
                onHoverEnd={() => !isTouchDevice && setHoveredBox(null)}
                onClick={() => handleBoxClick(box.id)}
                className="flex-shrink-0 w-48 h-32 md:w-72 md:h-48 rounded-xl overflow-hidden relative group cursor-pointer scroll-snap-align-start transform transition-all duration-300"
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Image */}
                <img 
                  src={box.image} 
                  alt={box.title} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="transform transition-all duration-300">
                    <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                      {box.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base line-clamp-2 md:line-clamp-none">
                      {box.description}
                    </p>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="absolute -inset-[400%] animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Shine Animation and Scrollbar Hiding */}
      <style>{`
        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(45deg);
          }
          to {
            transform: translateX(100%) rotate(45deg);
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
}