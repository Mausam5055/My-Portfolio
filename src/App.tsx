import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useThemeStore } from './store/theme';
import FlashIntro from './components/FlashIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentBoxes from './components/ContentBoxes';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Qualifications } from './components/Qualifications';
import { Certifications } from './components/Certifications';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Gallery } from './components/Gallery';
import { Artwork } from './components/Artwork';
import { Inspirations } from './components/Inspirations';
import { FutureGoals } from './components/FutureGoals';
import { FunFacts } from './components/FunFacts';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { isDark, toggleTheme } = useThemeStore();
  const [showIntro, setShowIntro] = useState(true);

  // Section refs
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    cubing: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    gaming: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Scroll to section function
  const scrollToSection = (section: string) => {
    const element = sectionRefs[section as keyof typeof sectionRefs]?.current;
    if (element) {
      const navbarHeight = 64; // Height of your fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      {showIntro ? (
        <FlashIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
          <Navbar 
            isDark={isDark} 
            toggleTheme={toggleTheme} 
            scrollToSection={scrollToSection}
          />
          <Hero />
          
          {/* Sections */}
          <div id="about" ref={sectionRefs.about}><About /></div>
          <div id="journey" ref={sectionRefs.journey}><Journey /></div>
          <div id="skills" ref={sectionRefs.skills}><Skills /></div>
          <div id="gallery" ref={sectionRefs.gallery}><Gallery /></div>
          <div id="cubing" ref={sectionRefs.cubing}><FunFacts /></div>
          <div id="projects" ref={sectionRefs.projects}><Projects /></div>
          <div id="gaming" ref={sectionRefs.gaming}><Artwork /></div>
          <div id="testimonials" ref={sectionRefs.testimonials}><Testimonials /></div>
          <div id="contact" ref={sectionRefs.contact}><Contact /></div>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
