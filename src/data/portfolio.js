import { FiAward, FiLinkedin } from 'react-icons/fi';
import {
  SiDocker, SiExpress, SiGit, SiJavascript, SiNodedotjs, SiPostgresql, SiPostman, SiPython, SiTypescript,
} from 'react-icons/si';

export const profile = {
  firstName: 'Yousef',
  lastName: 'Elaraby',
  role: 'Backend Developer',
  linkedin: 'https://www.linkedin.com/in/yousef-elaraby-3a30592b5/',
  roles: ['web APIs.', 'server-side services.', 'data workflows.'],
  intro: 'I build server-side applications with Node.js, Express, and PostgreSQL, with a focus on clear API contracts and maintainable data models.',
};

export const socials = [
  { label: 'LinkedIn', href: profile.linkedin, icon: FiLinkedin },
];

export const certifications = [
  {
    title: 'InnovEgypt Certificate of Acknowledgement',
    issuer: 'ITIDA · TIEC',
    role: '45 hours · Grade B',
    icon: FiAward,
    color: '#b32631',
    image: '/certs/innovegypt-pharmafy.png',
    description: 'For my final project, I turned my own startup idea into PharmaFy, a web app that helps users find medicines and view pharmacy details. I designed the application’s functionality and user flow and built the frontend.',
    skills: ['Startup Development', 'Product Design', 'User Flows', 'Frontend Development'],
    project: { name: 'PharmaFy', url: 'https://lnkd.in/daYKgbyU' },
  },
  {
    title: 'Instructor — Programming Fundamentals and Problem Solving Using Python',
    issuer: 'DSC Akhbar El-youm Academy',
    role: 'Certificate of Achievement',
    icon: SiPython,
    color: '#17196b',
    image: '/certs/dsc-python-instructor.jpg',
    description: 'DSC Akhbar El-youm Academy recognized my work as a Python instructor. I guided students through their first steps in programming and helped them apply Python fundamentals to solve problems.',
    skills: ['Python', 'Programming Fundamentals', 'Problem Solving', 'Teaching', 'Mentorship'],
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  ...(certifications.length ? [{ id: 'certifications', label: 'Certs' }] : []),
  { id: 'contact', label: 'Contact' },
];

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Languages & Tools' },
];

export const skills = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#509941', category: 'backend' },
  { name: 'Express', icon: SiExpress, category: 'backend' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#5587b7', category: 'database' },
  { name: 'JavaScript', icon: SiJavascript, color: '#e9bc18', category: 'tools' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'tools' },
  { name: 'Postman', icon: SiPostman, color: '#ff6c37', category: 'tools' },
  { name: 'Git', icon: SiGit, color: '#f05032', category: 'tools' },
  { name: 'Docker', icon: SiDocker, color: '#2496ed', category: 'tools' },
];

export const featuredStack = skills.slice(0, 3);
export const marqueeTech = skills;

export const projects = [
  {
    title: 'Portfolio Contact API',
    description: 'The live backend of this portfolio. It validates contact messages and persists them in PostgreSQL.',
    highlights: [
      'Accept JSON submissions through an Express endpoint.',
      'Store messages with parameterized PostgreSQL queries.',
      'Return validation feedback and a confirmation to the contact form.',
    ],
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    accent: ['#2e7c49', '#254f80'],
    featured: true,
    preview: ['POST /api/contact', '201 Created', 'GET /api/health'],
    link: { href: '#contact', label: 'Try the contact form' },
  },
  {
    title: 'Order Management API',
    description: 'An API design for accepting orders and tracking them through fulfillment.',
    highlights: [
      'Validate the request before creating an order.',
      'Write the order and its line items in one transaction.',
      'Deduplicate repeated requests with an idempotency key.',
    ],
    tags: ['API Design', 'Transactions', 'Idempotency'],
    accent: ['#0d9488', '#1e3a8a'],
    preview: ['POST /orders', '201 Created', 'GET /orders/{id}'],
  },
  {
    title: 'Background Email Delivery',
    description: 'A service design that queues email so delivery can run independently of the web request.',
    highlights: [
      'Return a job ID as soon as the message is queued.',
      'Retry temporary failures with exponential backoff.',
      'Move exhausted jobs to a dead-letter queue for review.',
    ],
    tags: ['Job Queues', 'Retries', 'Observability'],
    accent: ['#6d28d9', '#0e7490'],
    preview: ['POST /notifications', '202 Accepted', 'Queue → Worker → Mail'],
  },
];

