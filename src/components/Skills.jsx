import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from './motion/SectionHeading';
import Reveal from './motion/Reveal';
import { skillCategories, skills } from '../data/portfolio';
import './Skills.css';

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Technical focus"
          title="My technical toolbox"
          highlight="toolbox"
          subtitle="The backend stack and development tools featured in this portfolio."
        />

        <Reveal className="skill-tabs" role="tablist" aria-label="Filter skills">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              className={`skill-tab ${filter === cat.id ? 'is-active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {filter === cat.id && (
                <motion.span
                  layoutId="skill-tab-pill"
                  className="skill-tab-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              <span className="skill-tab-label">{cat.label}</span>
            </button>
          ))}
        </Reveal>

        <motion.ul className="skills-grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => {
              const Icon = skill.icon;
              const color = skill.color ?? 'var(--text)';
              return (
                <motion.li
                  key={skill.name}
                  layout
                  className="skill-card"
                  style={{ '--skill-color': color }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { type: 'spring', stiffness: 350, damping: 30 },
                  }}
                  whileHover={{ y: -6 }}
                >
                  <span className="skill-glow" aria-hidden="true" />
                  <motion.span
                    className="skill-icon"
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon style={{ color }} />
                  </motion.span>
                  <span className="skill-name">{skill.name}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
