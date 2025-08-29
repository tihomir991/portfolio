import type { Project, Experience, ContactInfo, PersonalInfo } from "../types";

// Personal Information
export const personalInfo: PersonalInfo = {
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  title: "Senior Frontend Developer",
  bio: "I create beautiful, responsive, and user-friendly web applications using modern technologies like React, TypeScript, and CSS. Passionate about clean code and exceptional user experiences.",
  avatar: "/placeholder-avatar.jpg",
  avatarAlt: "John Doe - Senior Frontend Developer",
  tagline: "Building digital experiences that matter",
  yearsOfExperience: 5,
};

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application built with React, TypeScript, and Node.js. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe API"],
    links: [
      { url: "https://github.com/username/ecommerce-platform", label: "Source Code", type: "github" },
      { url: "https://ecommerce-demo.example.com", label: "Live Demo", type: "live" },
    ],
    imageUrl: "/placeholder-project1.jpg",
    status: "completed",
    dateCreated: "2023-01-15",
    featured: true,
    tags: ["E-commerce", "Full-stack", "Payment Integration"],
    // Legacy support
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "TypeScript", "Socket.io", "Redux Toolkit", "Material-UI"],
    links: [
      { url: "https://github.com/username/task-manager", label: "Source Code", type: "github" },
      { url: "https://taskmanager-demo.example.com", label: "Live Demo", type: "live" },
    ],
    imageUrl: "/placeholder-project2.jpg",
    status: "completed",
    dateCreated: "2023-06-20",
    featured: true,
    tags: ["Productivity", "Real-time", "Collaboration"],
    // Legacy support
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://taskmanager-demo.example.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current weather, forecasts, and weather maps with location-based services.",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js", "CSS Grid"],
    links: [
      { url: "https://github.com/username/weather-dashboard", label: "Source Code", type: "github" },
      { url: "https://weather-demo.example.com", label: "Live Demo", type: "live" },
    ],
    imageUrl: "/placeholder-project3.jpg",
    status: "completed",
    dateCreated: "2023-10-05",
    featured: false,
    tags: ["Weather", "API Integration", "Data Visualization"],
    // Legacy support
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: "https://weather-demo.example.com",
  },
];

export const experience: Experience[] = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    position: "Senior Frontend Developer",
    startDate: "2022-01",
    duration: "2+ years",
    type: "full-time",
    description: [
      "Led development of responsive web applications using React and TypeScript",
      "Collaborated with UX/UI designers to implement pixel-perfect designs",
      "Optimized application performance resulting in 40% faster load times",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "TypeScript", "Redux", "Sass", "Jest", "Webpack"],
    location: "San Francisco, CA",
    companyUrl: "https://techsolutions.example.com",
  },
  {
    id: 2,
    company: "Digital Innovations LLC",
    position: "Frontend Developer",
    startDate: "2020-06",
    endDate: "2021-12",
    duration: "1.5 years",
    type: "full-time",
    description: [
      "Developed and maintained multiple client websites using modern frontend technologies",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Integrated REST APIs and managed application state effectively",
      "Participated in agile development processes and sprint planning",
    ],
    technologies: ["React", "JavaScript", "CSS3", "Bootstrap", "REST APIs"],
    location: "Austin, TX",
    companyUrl: "https://digitalinnovations.example.com",
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Junior Frontend Developer",
    startDate: "2019-03",
    endDate: "2020-05",
    duration: "1.2 years",
    type: "full-time",
    description: [
      "Built user interfaces for web applications using React and Vue.js",
      "Worked closely with backend developers to integrate APIs",
      "Participated in daily standups and sprint retrospectives",
      "Gained experience in modern development workflows and tools",
    ],
    technologies: ["React", "Vue.js", "JavaScript", "HTML5", "CSS3", "Git"],
    location: "Remote",
    companyUrl: "https://startupxyz.example.com",
  },
];

export const contactInfo: ContactInfo = {
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  timezone: "PST",
  availability: "available",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      username: "yourprofile",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      username: "yourusername",
      icon: "github",
    },
    {
      platform: "Portfolio",
      url: "https://yourportfolio.com",
      username: "yourportfolio",
      icon: "website",
    },
  ],
  resumeUrl: "/resume.pdf",
  // Legacy support
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  portfolio: "https://yourportfolio.com",
};
