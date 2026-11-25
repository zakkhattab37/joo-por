import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { certifications } from './data/portfolio';

export default function App() {
  return (
    <ThemeProvider>
      {/* Honour the OS "reduce motion" setting for every Framer Motion animation */}
      <MotionConfig reducedMotion="user">
        <Background />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Projects />
          {certifications.length > 0 && <Certifications />}
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </MotionConfig>
    </ThemeProvider>
  );
}
