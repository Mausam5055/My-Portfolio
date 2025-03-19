import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useThemeStore } from './store/theme';
import FlashIntro from './components/FlashIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentBoxes from './components/ContentBoxes';
import { About } from './components/About';
import { Journey } from './components/Journey'; // Moved Journey below About
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

  const aboutRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const qualificationsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const inspirationsRef = useRef<HTMLDivElement>(null);
  const futureGoalsRef = useRef<HTMLDivElement>(null);
  const funFactsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <Hero />
          <ContentBoxes 
            refs={{
              about: aboutRef,
              journey: journeyRef,
              qualifications: qualificationsRef,
              certifications: certificationsRef,
              skills: skillsRef,
              education: educationRef,
              gallery: galleryRef,
              artwork: artworkRef,
              inspirations: inspirationsRef,
              futureGoals: futureGoalsRef,
              funFacts: funFactsRef,
              blog: blogRef,
              testimonials: testimonialsRef,
              contact: contactRef,
            }}
          />
          <div ref={aboutRef}><About /></div>
          <div ref={journeyRef}><Journey /></div> {/* Moved Journey below About */}
          <div ref={qualificationsRef}><Qualifications /></div>
          <div ref={certificationsRef}><Certifications /></div>
          <div ref={skillsRef}><Skills /></div>
          <div ref={educationRef}><Education /></div>
          <div ref={galleryRef}><Gallery /></div>
          <div ref={artworkRef}><Artwork /></div>
          <div ref={inspirationsRef}><Inspirations /></div>
          <div ref={futureGoalsRef}><FutureGoals /></div>
          <div ref={funFactsRef}><FunFacts /></div>
          <div ref={blogRef}><Blog /></div>
          <div ref={testimonialsRef}><Testimonials /></div>
          <Projects />
          <div ref={contactRef}><Contact /></div>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
