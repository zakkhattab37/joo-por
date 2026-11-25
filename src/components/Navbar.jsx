import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  FiArrowUpRight, FiAward, FiCode, FiFolder, FiHome, FiMail, FiMoon, FiSun, FiUser, FiX,
} from 'react-icons/fi';
import { useTheme } from '../context/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';
import { useFinePointer } from '../hooks/useFinePointer';
import { navLinks, profile } from '../data/portfolio';
import BrandAvatar from './BrandAvatar';
import AvatarLightbox from './AvatarLightbox';
import './Navbar.css';

const ids = navLinks.map((l) => l.id);
const icons = { home: FiHome, about: FiUser, skills: FiCode, projects: FiFolder, certifications: FiAward, contact: FiMail };

// Dynamic-Island style spring: quick, slightly bouncy
const island = { type: 'spring', stiffness: 420, damping: 32, mass: 0.9 };
const fade = {
  initial: { opacity: 0, filter: 'blur(6px)', scale: 0.92 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.35, delay: 0.08 } },
  exit: { opacity: 0, filter: 'blur(6px)', scale: 0.92, transition: { duration: 0.15 } },
};

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <motion.button type="button" className="island-icon" onClick={toggleTheme} aria-label={label} title={label} whileTap={{ scale: 0.85 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'grid' }}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function ProgressRing({ progress }) {
  return (
    <svg className="island-ring" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="ring-track" />
      <motion.circle cx="12" cy="12" r="9" className="ring-fill" style={{ pathLength: progress }} />
    </svg>
  );
}

export default function Navbar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const ref = useRef(null);
  const openedAt = useRef(0);
  const closeTimer = useRef(null);
  const fine = useFinePointer(); // mouse/trackpad → open on hover; touch → open on tap
  const { scrollY, scrollYProgress } = useScroll();
  const activeLabel = navLinks.find((l) => l.id === active)?.label ?? 'Home';

  // Collapse when the visitor scrolls away (touch only — on desktop, leaving the island closes it)
  useMotionValueEvent(scrollY, 'change', (y) => {
    if (open && !fine && Math.abs(y - openedAt.current) > 80) setOpen(false);
  });

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onHoverStart = () => {
    if (!fine) return;
    clearTimeout(closeTimer.current);
    expand();
  };
  const onHoverEnd = () => {
    if (!fine) return;
    // short grace period so brushing past the edge doesn't snap it shut
    closeTimer.current = setTimeout(() => setOpen(false), 260);
  };

  // Collapse on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function expand() {
    openedAt.current = window.scrollY;
    setOpen(true);
  }

  return (
    <header className="island-wrap">
      <motion.nav
        ref={ref}
        layout
        aria-label="Main"
        className={`island ${open ? 'is-open' : 'is-compact'}`}
        initial={{ opacity: 0, y: -30, scale: 0.6 }}
        animate={{ opacity: 1, y: 0, scale: 1, borderRadius: open ? 24 : 22 }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        whileTap={open || fine ? undefined : { scale: 0.95 }}
        transition={{ ...island, opacity: { duration: 0.4 }, layout: island }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="compact"
              type="button"
              layout="position"
              className="island-compact"
              onClick={expand}
              aria-expanded="false"
              aria-label={`Open navigation (current section: ${activeLabel})`}
              {...fade}
            >
              <BrandAvatar className="island-mark" />
              <span className="island-label">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeLabel}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeLabel}
                  </motion.span>
                </AnimatePresence>
              </span>
              <ProgressRing progress={scrollYProgress} />
            </motion.button>
          ) : (
            <motion.div key="expanded" layout="position" className="island-expanded" {...fade}>
              <div className="island-head">
                <div className="island-brand">
                  <button
                    type="button"
                    className="island-avatar-btn"
                    onClick={() => {
                      setOpen(false);
                      setAvatarOpen(true);
                    }}
                    aria-label="View Yousef’s portrait"
                  >
                    <BrandAvatar className="island-mark big" />
                  </button>
                  <a href="#home" className="island-name" onClick={() => setOpen(false)}>
                    {profile.firstName}
                    <span className="island-dot">.</span>
                  </a>
                </div>
                <motion.button
                  type="button"
                  className="island-icon close-mobile"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ rotate: 90 }}
                >
                  <FiX />
                </motion.button>
              </div>

              <motion.ul
                className="island-links"
                onMouseLeave={() => setHovered(null)}
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }}
              >
                {navLinks.map((link) => {
                  const Icon = icons[link.id];
                  const isActive = active === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      variants={{
                        hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
                        show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={isActive ? 'is-active' : ''}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setHovered(link.id)}
                        onFocus={() => setHovered(link.id)}
                      >
                        {hovered === link.id && (
                          <motion.span layoutId="island-hover" className="link-hover" transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                        )}
                        {isActive && <motion.span layoutId="island-active" className="link-active" transition={island} />}
                        <Icon className="link-icon" />
                        <span className="link-text">{link.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <div className="island-actions">
                <ThemeToggle />
                <a href="#contact" className="island-cta" onClick={() => setOpen(false)}>
                  Contact <FiArrowUpRight />
                </a>
                <motion.button
                  type="button"
                  className="island-icon close-desktop"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ rotate: 90 }}
                >
                  <FiX />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <AvatarLightbox open={avatarOpen} onClose={() => setAvatarOpen(false)} />
    </header>
  );
}
