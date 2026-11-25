import { motion } from 'framer-motion';
import portrait from '../assets/yousef-about.png';
import { featuredStack } from '../data/portfolio';
import SectionHeading from './motion/SectionHeading';
import Reveal from './motion/Reveal';
import TiltCard from './motion/TiltCard';
import './About.css';

const stackDescriptions = [
  'Server-side JavaScript',
  'HTTP routing and middleware',
  'Relational data and transactions',
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading index="01" eyebrow="About me" title="Code with craft & care" highlight="craft" />
        <div className="about-grid">
          <Reveal direction="right" className="about-photo-wrap">
            <TiltCard className="about-photo">
              <img src={portrait} alt="Yousef Elaraby giving a presentation" loading="lazy" width="960" height="1280" />
            </TiltCard>
            <motion.div
              className="photo-deco"
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
          </Reveal>
          <div className="about-copy">
            <Reveal>
              <p className="about-lead">
                I focus on what happens <span className="gradient-text">between the request and the response.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="about-text">
                I approach backend design by defining what an API promises, deciding how the application stores data,
                and making failure cases explicit. Clear boundaries between those decisions make a system easier to
                test and change.
              </p>
            </Reveal>
            <div className="about-highlights">
              {featuredStack.map(({ icon: Icon, name, color }, index) => (
                <Reveal key={name} delay={0.15 + index * 0.1} className="about-highlight card">
                  <Icon style={{ color }} aria-hidden="true" />
                  <h3>{name}</h3>
                  <p>{stackDescriptions[index]}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
