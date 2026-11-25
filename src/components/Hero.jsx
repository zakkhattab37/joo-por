import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import Magnetic from './motion/Magnetic';
import { featuredStack, profile, socials } from '../data/portfolio';
import portrait from '../assets/yousef-hero.png';
import './Hero.css';

const ease = [0.22, 1, 0.36, 1];

function AnimatedName({ text, className, delay = 0 }) {
  return (
    <span className={`name-line ${className ?? ''}`} aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span className="char-mask" key={i}>
          <motion.span
            className="char"
            initial={{ y: '115%', rotate: 8 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="role-rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="role-word"
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease }}
        >
          {/* gradient lives on an inner span: Chrome won't paint background-clip:text under a filter */}
          <span className="gradient-text">{profile.roles[index]}</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const chipDepths = [40, -30, 25];

function FloatingChip({ chip, mx, my, index }) {
  const x = useTransform(mx, (v) => v * chipDepths[index]);
  const y = useTransform(my, (v) => v * chipDepths[index]);
  const Icon = chip.icon;
  return (
    <motion.div
      className={`hero-chip chip-${index + 1}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + index * 0.12, duration: 0.6, ease }}
    >
      <motion.div
        className="chip-inner"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon style={{ color: chip.color ?? 'var(--text)' }} />
        <span>{chip.name}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  // Normalised mouse position (-0.5 … 0.5) for parallax, + pixel position for spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const px = useMotionValue(-1000);
  const py = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${px}px ${py}px, var(--blob-1), transparent 70%)`;

  const portraitX = useTransform(smx, (v) => v * -18);
  const portraitY = useTransform(smy, (v) => v * -18);
  const ringRotateX = useTransform(smy, (v) => v * 14);
  const ringRotateY = useTransform(smx, (v) => v * -14);

  // Content drifts up and fades as you scroll past the hero
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  return (
    <section id="home" className="hero" ref={sectionRef} onPointerMove={onPointerMove}>
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />

      <motion.div className="hero-grid container" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="hero-copy">
          <motion.a
            className="hero-badge"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="badge-status">LinkedIn</span>
            <span className="badge-text">Connect with me</span>
            <span className="badge-go" aria-hidden="true"><FiArrowUpRight /></span>
          </motion.a>
          <motion.p
            className="hero-hello"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <motion.span
              className="wave"
              animate={{ rotate: [0, 18, -8, 18, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6 }}
              aria-hidden="true"
            >
              👋
            </motion.span>
            Hi, I'm
          </motion.p>

          <h1 className="hero-title">
            <span className="sr-only">
              {profile.firstName} {profile.lastName}
            </span>
            <AnimatedName text={profile.firstName} delay={0.2} />
            <AnimatedName text={profile.lastName} delay={0.45} className="is-gradient" />
          </h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
          >
            {profile.role} — I build <RotatingRole />
          </motion.p>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease }}
          >
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                View my work <FiArrowUpRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Contact me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="hero-socials">
              {socials.map(({ label, href, icon: Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className="icon-btn"
                  aria-label={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.45 + i * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
        >
          <motion.div className="portrait-stage" style={{ rotateX: ringRotateX, rotateY: ringRotateY }}>
            <motion.div
              className="portrait-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <motion.div
              className="portrait-orbit"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <span className="orbit-dot" />
            </motion.div>
            <motion.div className="portrait-frame" style={{ x: portraitX, y: portraitY }}>
              <img src={portrait} alt="Yousef Elaraby" fetchPriority="high" width="960" height="1280" />
            </motion.div>
          </motion.div>

          {featuredStack.map((chip, i) => (
            <FloatingChip key={chip.name} chip={chip} mx={smx} my={smy} index={i} />
          ))}

          <motion.div
            className="hero-code card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease }}
            aria-hidden="true"
          >
            <div className="code-dots">
              <span />
              <span />
              <span />
            </div>
            <code>
              <span className="tk-k">GET</span> <span className="tk-v">/health</span>
              <br />
              <span className="tk-n">200 OK</span>
              <br />
              {'{'} status: <span className="tk-s">"ok"</span> {'}'}
              <motion.span
                className="caret"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </code>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="mouse">
          <motion.span
            className="mouse-wheel"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <FiArrowDown className="scroll-arrow" />
      </motion.a>
    </section>
  );
}
