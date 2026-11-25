import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { navLinks, profile, socials } from '../data/portfolio';
import BrandAvatar from './BrandAvatar';
import AvatarLightbox from './AvatarLightbox';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <motion.a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on LinkedIn"
          className="footer-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="footer-cta-big">
            Let’s talk
            <motion.span
              className="footer-cta-arrow"
              animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowUpRight />
            </motion.span>
          </span>
        </motion.a>

        <div className="footer-row">
          <div className="footer-brand">
            <button
              type="button"
              className="logo-mark-btn"
              onClick={() => setAvatarOpen(true)}
              aria-label="View Yousef’s portrait"
            >
              <BrandAvatar className="logo-mark" />
            </button>
            <div>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
              <p>{profile.role}</p>
            </div>
          </div>

          <ul className="footer-links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="link-underline">{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="footer-socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <motion.a key={label} href={href} className="icon-btn" aria-label={label} whileHover={{ y: -4, rotate: -6 }}>
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {profile.firstName} {profile.lastName}. All rights reserved.
          </span>
        </div>
      </div>
      <AvatarLightbox open={avatarOpen} onClose={() => setAvatarOpen(false)} />
    </footer>
  );
}
