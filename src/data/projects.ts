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
    imagePreview: '/assets/projects/4.jpg',
    outerPreviewImage: '/assets/projects/3.png',
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
    id: 2,
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
    imagePreview: '/assets/projects/4.jpg',
    outerPreviewImage: '/assets/projects/2.png',
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
    id: 3,
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
    imagePreview: '/assets/projects/4.jpg',
    outerPreviewImage: '/assets/projects/1.png',
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
  {
    id: 3,
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
    imagePreview: '/assets/projects/4.jpg',
    outerPreviewImage: '/assets/projects/1.png',
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