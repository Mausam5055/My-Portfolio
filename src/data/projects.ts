export interface Technology {
  name: string;
  percentage: number;
}

export interface Contributor {
  name: string;
  profilePic: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  detailedDescription: string;
  videoPreview: string;
  imagePreview: string;
  outerPreviewImage: string;
  technologies: Technology[];
  contributors: Contributor[];
  github: string;
  liveDemo: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Portfolio V3',
    description: 'My current portfolio showcasing my latest projects and skills with a modern, responsive design and smooth animations.',
    detailedDescription: `A sophisticated portfolio website built with React and TypeScript, featuring:

• Modern UI with dark/light mode support
• Responsive design for all devices
• Smooth animations and transitions
• Project showcase with detailed case studies
• Interactive components and UI elements
• Performance optimized with code splitting
• SEO-friendly structure

This portfolio represents my current skills and expertise in modern web development.`,
    videoPreview: '',
    imagePreview: '/assets/projects/portfolio v-03/1.png',
    outerPreviewImage: '/assets/projects/portfolio v-03/1.png',
    technologies: [
      { name: 'React', percentage: 90 },
      { name: 'TypeScript', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 80 },
      { name: 'Framer Motion', percentage: 75 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/portfolio-v3',
    liveDemo: 'https://mausam.vercel.app/',
  },
  {
    id: 2,
    name: 'Weather App',
    description: 'A beautiful weather application built with React that provides real-time weather data with stunning animations and intuitive UI.',
    detailedDescription: `A feature-rich weather application that offers:

• Real-time weather data from OpenWeather API
• Location-based weather information
• 5-day weather forecast
• Beautiful weather animations
• Responsive design for all devices
• Search functionality for any location
• Temperature unit conversion (Celsius/Fahrenheit)

This app demonstrates my ability to integrate external APIs and create engaging user experiences.`,
    videoPreview: '',
    imagePreview: '/assets/projects/weather/1.png',
    outerPreviewImage: '/assets/projects/weather/1.png',
    technologies: [
      { name: 'React', percentage: 90 },
      { name: 'JavaScript', percentage: 85 },
      { name: 'CSS', percentage: 80 },
      { name: 'API Integration', percentage: 85 },
      { name: 'Animations', percentage: 75 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/weather-app',
    liveDemo: 'https://weather-app-mausam.vercel.app/',
  },
  {
    id: 3,
    name: 'YouTube Downloader V2',
    description: 'An enhanced YouTube downloader with a modern web interface, combining Python backend with HTML, CSS, and JavaScript frontend.',
    detailedDescription: `A full-stack YouTube video downloader application featuring:

• Modern and responsive web interface
• Real-time download progress tracking
• Multiple format and quality options
• Drag-and-drop functionality
• User-friendly error messages
• Download history tracking
• Background processing for large files

This version provides an intuitive user experience while maintaining powerful download capabilities.`,
    videoPreview: '',
    imagePreview: '/assets/projects/you-tube-v-02/1.jpeg',
    outerPreviewImage: '/assets/projects/you-tube-v-02/1.jpeg',
    technologies: [
      { name: 'Python', percentage: 85 },
      { name: 'HTML', percentage: 80 },
      { name: 'CSS', percentage: 75 },
      { name: 'JavaScript', percentage: 80 },
      { name: 'FFmpeg', percentage: 85 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/youtube-downloader-v2',
    liveDemo: '',
  },
  {
    id: 4,
    name: 'YouTube Downloader V1',
    description: 'A Python-based YouTube video downloader with FFmpeg integration for high-quality video processing and format conversion.',
    detailedDescription: `A powerful YouTube video downloader built with Python, featuring:

• FFmpeg integration for video processing and format conversion
• Support for multiple video qualities and formats
• Command-line interface for easy usage
• Progress tracking during downloads
• Error handling and validation
• Support for playlists and channels

This tool demonstrates efficient video processing and handling of YouTube's API.`,
    videoPreview: '',
    imagePreview: '/assets/projects/You-tube-v01/1.png',
    outerPreviewImage: '/assets/projects/You-tube-v01/1.png',
    technologies: [
      { name: 'Python', percentage: 90 },
      { name: 'FFmpeg', percentage: 85 },
      { name: 'YouTube-DL', percentage: 80 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/youtube-downloader-v1',
    liveDemo: '',
  },
  {
    id: 5,
    name: 'Client Portfolio',
    description: 'Showcasing the expertise and creativity of papiya, this portfolio highlights their skills, dedication.',
    detailedDescription: `A modern and responsive portfolio website built for a client, showcasing their professional journey and achievements. The site features:

• Responsive design that works seamlessly across all devices
• Smooth animations and transitions for enhanced user experience
• Dark mode support with elegant color schemes
• Interactive project showcase with detailed case studies
• Contact form with email integration
• Optimized performance and SEO-friendly structure

The portfolio effectively communicates the client's brand identity while maintaining a clean and professional aesthetic.`,
    videoPreview: 'https://www.youtube.com/embed/9z46-46o3CE',
    imagePreview: '/assets/projects/client-portfolio/1.png',
    outerPreviewImage: '/assets/projects/client-portfolio/1.png',
    technologies: [
      { name: 'JavaScript', percentage: 80 },
      { name: 'React', percentage: 90 },
      { name: 'CSS', percentage: 70 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/papiya',
    liveDemo: 'https://papiya.vercel.app/',
  },
  {
    id: 6,
    name: 'My 2nd Portfolio',
    description: 'Showcasing my expertise in web dev., this portfolio highlights my creativity, skills, and dedication to delivering impactful solutions.',
    detailedDescription: `An enhanced version of my portfolio showcasing my growth as a web developer. Key features include:

• Modern UI/UX design with intuitive navigation
• Project showcase with interactive elements
• Skills visualization with animated progress bars
• Blog section for sharing technical insights
• Integration with various APIs and services
• Performance optimization and best practices

This portfolio demonstrates my commitment to creating engaging and efficient web applications.`,
    videoPreview: 'https://www.youtube.com/embed/sluWyngYKOI',
    imagePreview: '/assets/projects/portfoio-v02/1.jpeg',
    outerPreviewImage: '/assets/projects/portfoio-v02/1.jpeg',
    technologies: [
      { name: 'HTML', percentage: 85 },
      { name: 'CSS', percentage: 75 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/My-Portfolio-1/tree/main/Protfolio-1/My-Portfolio-main',
    liveDemo: 'https://mausamkar.netlify.app/',
  },
  {
    id: 7,
    name: 'My 1st Portfolio',
    description: 'Welcome to my first portfolio, a showcase of my creativity, skills, and dedication in Web Dev. This collection highlights my journey, passion, and commitment to delivering impactful solutions.',
    detailedDescription: `My first portfolio website that marked the beginning of my web development journey. Features include:

• Clean and minimalist design approach
• Responsive layout for all screen sizes
• Project showcase with basic animations
• Contact section with form validation
• Social media integration
• Basic SEO implementation

This portfolio represents my initial steps in web development and my passion for creating digital experiences.`,
    videoPreview: "https://www.youtube.com/embed/TxX6PeCusWM",
    imagePreview: '/assets/projects/portfolio-v01/1.png',
    outerPreviewImage: '/assets/projects/portfolio-v01/1.png',
    technologies: [
      { name: 'Node.js', percentage: 80 },
      { name: 'Express', percentage: 70 },
    ],
    contributors: [
      { name: 'Mausam', profilePic: '/assets/mausam.jpeg' },
    ],
    github: 'https://github.com/Mausam5055/My-Portfolio-1/tree/main/Protfolio-1/My-Portfolio-main',
    liveDemo: 'https://mausamprotfolio.netlify.app/',
  },
]; 