import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useThemeStore } from './store/theme';
import SEO from './components/SEO';
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
import { CubingContent } from './components/CubingContent';
import { Blog } from './components/Blog';
import { BlogDetail } from './components/BlogDetail';
import { FutureGoals } from './components/FutureGoals';
import { FunFacts } from './components/FunFacts';
import { Gaming } from './components/Gaming';
import { Testimonials } from './components/Testimonials';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ThemeTransition from './components/ThemeTransition';
import { ProjectDetails } from './pages/ProjectDetails';
import { GameDetail } from './pages/GameDetail';
import { GalleryDetail } from './pages/GalleryDetail';
import { CubeDetails } from './pages/CubeDetails';
import { AllCubingContent } from './pages/AllCubingContent';

type SectionType = 'home' | 'about' | 'journey' | 'qualifications' | 'certifications' | 'skills' | 'education' | 'gallery' | 'cubing' | 'blog' | 'futureGoals' | 'funFacts' | 'Gaming' | 'projects' | 'testimonials' | 'contact';

function AppContent() {
  const { isDark, isChanging, toggleTheme } = useThemeStore();
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [navigationStack, setNavigationStack] = useState<SectionType[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.startsWith('/projects/') || 
                       location.pathname.startsWith('/games/') || 
                       location.pathname.startsWith('/blog/') ||
                       location.pathname.startsWith('/gallery/') ||
                       location.pathname.startsWith('/cube/');

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    journey: useRef<HTMLDivElement>(null),
    qualifications: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    cubing: useRef<HTMLDivElement>(null),
    blog: useRef<HTMLDivElement>(null),
    futureGoals: useRef<HTMLDivElement>(null),
    funFacts: useRef<HTMLDivElement>(null),
    Gaming: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Handle scroll position and section updates
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs) as Array<keyof typeof sectionRefs>;
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionRefs[sections[i]].current;
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i] as SectionType);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: SectionType) => {
    // Don't update if we're already in that section
    if (currentSection === section) return;

    // Update navigation stack
    setNavigationStack(prev => [...prev, currentSection]);

    // Update the URL with the section
    navigate(`/${section}`, { 
      state: { scrollToSection: section },
      replace: false
    });
    
    // Scroll to the section
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (sectionRefs[section]?.current) {
      sectionRefs[section].current?.scrollIntoView({ 
        behavior: 'instant',
        block: 'start'
      });
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (navigationStack.length > 0) {
      const previousSection = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      setCurrentSection(previousSection);
      
      // Update URL without triggering scroll
      navigate(`/${previousSection}`, { 
        state: { scrollToSection: previousSection },
        replace: true
      });
    }
  };

  // Handle navigation and scroll restoration
  useEffect(() => {
    const state = location.state as { scrollToSection?: SectionType } | null;
    
    if (state?.scrollToSection) {
      const targetSection = state.scrollToSection;
      setCurrentSection(targetSection);
      
      // Only scroll if this is a new navigation, not a back button press
      if (!location.key || location.key === 'default') {
        if (targetSection === 'home') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (sectionRefs[targetSection]?.current) {
          const targetScroll = sectionRefs[targetSection].current!.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetScroll,
            behavior: 'instant'
          });
        }
      }
    }
  }, [location.state, location.key]);

  // Handle back button
  useEffect(() => {
    const handlePopState = () => {
      if (navigationStack.length > 0) {
        const previousSection = navigationStack[navigationStack.length - 1];
        setNavigationStack(prev => prev.slice(0, -1));
        setCurrentSection(previousSection);
        
        // Prevent default scroll behavior
        if (previousSection === 'home') {
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (sectionRefs[previousSection]?.current) {
          const targetScroll = sectionRefs[previousSection].current!.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: targetScroll,
            behavior: 'instant'
          });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigationStack]);

  // Initialize AOS
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

  // Add section-specific SEO data
  const seoData = {
    home: {
      title: "Expert Web Developer & UI/UX Designer",
      description: "Award-winning web developer and UI/UX designer specializing in React, TypeScript, and modern web solutions. View my portfolio of responsive, user-centric designs and innovative web applications.",
      keywords: "Mausam Kar, React Developer, UI/UX Designer, Frontend Expert, TypeScript Developer, Web Development Portfolio, Modern Web Solutions, Creative Developer, Software Engineer India, React.js Expert, Next.js Developer"
    },
    about: {
      title: "About Me - Professional Background",
      description: "Learn about my journey as a web developer and UI/UX designer, my professional experience, and what drives me to create exceptional digital experiences.",
      keywords: "About Mausam Kar, Professional Background, Web Developer Experience, UI/UX Designer Portfolio, Career Journey"
    },
    journey: {
      title: "My Professional Journey",
      description: "Explore my career progression, key milestones, and the experiences that have shaped me into a skilled web developer and UI/UX designer.",
      keywords: "Career Journey, Professional Development, Web Development Career, UI/UX Design Experience, Career Growth"
    },
    qualifications: {
      title: "Professional Qualifications",
      description: "View my academic qualifications, certifications, and professional training that have contributed to my expertise in web development and UI/UX design.",
      keywords: "Professional Qualifications, Academic Background, Web Development Education, UI/UX Design Training, Technical Skills"
    },
    certifications: {
      title: "Professional Certifications",
      description: "Browse through my industry-recognized certifications in web development, UI/UX design, and related technologies that validate my expertise.",
      keywords: "Professional Certifications, Web Development Certifications, UI/UX Design Certifications, Technical Certifications, Industry Recognition"
    },
    skills: {
      title: "Technical Skills & Expertise",
      description: "Discover my comprehensive skill set in web development, UI/UX design, and modern technologies that enable me to create exceptional digital solutions.",
      keywords: "Technical Skills, Web Development Skills, UI/UX Design Skills, Programming Languages, Frontend Development, Modern Web Technologies"
    },
    education: {
      title: "Educational Background",
      description: "Learn about my academic journey, educational qualifications, and how they have contributed to my professional development in web development and design.",
      keywords: "Education, Academic Qualifications, Web Development Education, UI/UX Design Education, Professional Training"
    },
    gallery: {
      title: "Portfolio Gallery",
      description: "Explore a visual showcase of my web development and UI/UX design projects, demonstrating my creative approach and technical expertise.",
      keywords: "Portfolio Gallery, Web Design Gallery, UI/UX Design Portfolio, Project Showcase, Visual Portfolio"
    },
    cubing: {
      title: "Speed Cubing Achievements",
      description: "Discover my passion for speed cubing, achievements, and how this hobby has enhanced my problem-solving skills and analytical thinking.",
      keywords: "Speed Cubing, Rubik's Cube, Cube Solving, Problem Solving, Analytical Skills"
    },
    blog: {
      title: "Blog - Web Development & UI/UX Insights",
      description: "Explore my thoughts, insights, and experiences in web development, UI/UX design, and technology. Read about the latest trends, best practices, and creative solutions.",
      keywords: "Web Development Blog, UI/UX Design Blog, Tech Blog, Web Development Tips, UI/UX Design Tips, Technology Insights, Web Development Articles"
    },
    futureGoals: {
      title: "Future Goals & Aspirations",
      description: "Explore my vision for the future, professional goals, and how I plan to continue growing as a web developer and UI/UX designer.",
      keywords: "Future Goals, Professional Aspirations, Career Development, Web Development Goals, UI/UX Design Vision"
    },
    funFacts: {
      title: "Fun Facts About Me",
      description: "Get to know me better through interesting facts about my journey, interests, and what makes me unique as a web developer and designer.",
      keywords: "Fun Facts, Personal Background, Professional Journey, Web Developer Profile, UI/UX Designer Profile"
    },
    Gaming: {
      title: "Gaming & Interactive Development",
      description: "Explore my interest in gaming, interactive development, and how it influences my approach to web development and user experience design.",
      keywords: "Gaming, Interactive Development, Game Development, Web Gaming, Interactive Web Experiences"
    },
    projects: {
      title: "Portfolio Projects",
      description: "Explore my collection of web development and UI/UX design projects, showcasing my expertise in creating modern, responsive, and user-friendly applications.",
      keywords: "Web Development Projects, UI/UX Design Portfolio, React Projects, TypeScript Applications, Modern Web Solutions"
    },
    testimonials: {
      title: "Client Testimonials",
      description: "Read what clients and colleagues say about my work, professional approach, and the impact of my web development and UI/UX design solutions.",
      keywords: "Client Testimonials, Professional Reviews, Web Development Reviews, UI/UX Design Feedback, Client Success Stories"
    },
    contact: {
      title: "Contact Me",
      description: "Get in touch with me for collaboration opportunities, project inquiries, or to discuss how I can help bring your digital ideas to life.",
      keywords: "Contact Mausam Kar, Web Development Services, UI/UX Design Services, Project Collaboration, Freelance Developer"
    }
  };

  return (
    <>
      <SEO 
        title={seoData[currentSection as keyof typeof seoData]?.title || seoData.home.title}
        description={seoData[currentSection as keyof typeof seoData]?.description || seoData.home.description}
        keywords={seoData[currentSection as keyof typeof seoData]?.keywords || seoData.home.keywords}
        image="https://mausam03.vercel.app/preview.jpg"
        url={`https://mausam03.vercel.app/${currentSection === 'home' ? '' : currentSection}`}
      />
      {showIntro ? (
        <FlashIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          <ThemeTransition isChanging={isChanging} isDark={isDark} />
          <div className={`min-h-screen bg-white dark:bg-black transition-colors duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
            {!isDetailsPage && <Navbar isDark={isDark} toggleTheme={toggleTheme} scrollToSection={scrollToSection} onBack={handleBack} />}
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ContentBoxes refs={sectionRefs} />
                  <div ref={sectionRefs.about}><About /></div>
                  <div ref={sectionRefs.journey}><Journey /></div>
                  <div ref={sectionRefs.qualifications}><Qualifications /></div>
                  <div ref={sectionRefs.certifications}><Certifications /></div>
                  <div ref={sectionRefs.skills}><Skills /></div>
                  <div ref={sectionRefs.education}><Education /></div>
                  <div ref={sectionRefs.gallery}><Gallery /></div>
                  <div ref={sectionRefs.cubing}><CubingContent /></div>
                  <div ref={sectionRefs.blog}><Blog /></div>
                  <div ref={sectionRefs.Gaming}><Gaming /></div>
                  <div ref={sectionRefs.funFacts}><FunFacts /></div>
                  <div ref={sectionRefs.projects}><Projects /></div>
                  <div ref={sectionRefs.futureGoals}><FutureGoals /></div>
                  <div ref={sectionRefs.testimonials}><Testimonials /></div>
                  <div ref={sectionRefs.contact}><Contact /></div>
                  <Footer />
                </>
              } />
              <Route path="/:section" element={
                <>
                  <Hero />
                  <ContentBoxes refs={sectionRefs} />
                  <div ref={sectionRefs.about}><About /></div>
                  <div ref={sectionRefs.journey}><Journey /></div>
                  <div ref={sectionRefs.qualifications}><Qualifications /></div>
                  <div ref={sectionRefs.certifications}><Certifications /></div>
                  <div ref={sectionRefs.skills}><Skills /></div>
                  <div ref={sectionRefs.education}><Education /></div>
                  <div ref={sectionRefs.gallery}><Gallery /></div>
                  <div ref={sectionRefs.cubing}><CubingContent /></div>
                  <div ref={sectionRefs.blog}><Blog /></div>
                  <div ref={sectionRefs.Gaming}><Gaming /></div>
                  <div ref={sectionRefs.funFacts}><FunFacts /></div>
                  <div ref={sectionRefs.projects}><Projects /></div>
                  <div ref={sectionRefs.futureGoals}><FutureGoals /></div>
                  <div ref={sectionRefs.testimonials}><Testimonials /></div>
                  <div ref={sectionRefs.contact}><Contact /></div>
                  <Footer />
                </>
              } />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/games/:gameId" element={<GameDetail />} />
              <Route path="/gallery/:id" element={<GalleryDetail />} />
              <Route path="/cube/:id" element={<CubeDetails />} />
              <Route path="/all-cubing-content" element={<AllCubingContent />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;