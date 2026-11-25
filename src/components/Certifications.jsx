import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import SectionHeading from './motion/SectionHeading';
import CertLightbox from './CertLightbox';
import { certifications } from '../data/portfolio';
import './Certifications.css';

// certificates that have an image can be browsed in the viewer
const gallery = certifications.filter((c) => c.image);

export default function Certifications() {
  const listRef = useRef(null);
  const [viewing, setViewing] = useState(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="certifications" className="section certs">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Certifications"
          title="Always learning"
          highlight="learning"
          subtitle="Courses and credentials that sharpened my craft."
          align="center"
        />

        <div className="timeline" ref={listRef}>
          <div className="timeline-track" aria-hidden="true">
            <motion.div className="timeline-fill" style={{ scaleY: lineScale }} />
          </div>

          <ol className="timeline-list">
            {certifications.map((cert, i) => {
              const Icon = cert.icon;
              const side = i % 2 === 0 ? 'left' : 'right';
              return (
                <li key={cert.title} className={`timeline-item ${side}`}>
                  <motion.span
                    className="timeline-node"
                    style={{ '--cert-color': cert.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-30% 0px -30% 0px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    aria-hidden="true"
                  />
                  <motion.article
                    className="cert-card card"
                    initial={{ opacity: 0, x: side === 'left' ? -50 : 50, rotate: side === 'left' ? -2 : 2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    {cert.image && (
                      <button
                        type="button"
                        className="cert-thumb"
                        onClick={() => setViewing(gallery.indexOf(cert))}
                        aria-label={`View the ${cert.title} certificate`}
                      >
                        <img src={cert.image} alt="" loading="lazy" decoding="async" />
                        <span className="cert-thumb-overlay" aria-hidden="true">
                          <span className="cert-thumb-pill">
                            <FiMaximize2 /> View full size
                          </span>
                        </span>
                      </button>
                    )}
                    <div className="cert-top">
                      <span className="cert-icon" style={{ background: cert.color }}>
                        <Icon />
                      </span>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        {cert.date ? (
                          <time className="cert-date">{cert.date}</time>
                        ) : (
                          <span className="cert-date">{cert.role}</span>
                        )}
                      </div>
                    </div>
                    <h3 className="cert-title">{cert.title}</h3>
                    {cert.description && <p className="cert-desc">{cert.description}</p>}
                    <ul className="cert-skills">
                      {cert.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    <div className="cert-actions">
                      {cert.image ? (
                        <button type="button" className="cert-link" onClick={() => setViewing(gallery.indexOf(cert))}>
                          View certificate <FiArrowUpRight />
                        </button>
                      ) : (
                        cert.url && (
                          <a href={cert.url} className="cert-link" target="_blank" rel="noopener noreferrer">
                            View credential <FiArrowUpRight />
                          </a>
                        )
                      )}
                      {cert.project && (
                        <a href={cert.project.url} className="cert-link" target="_blank" rel="noopener noreferrer">
                          Open {cert.project.name} <FiArrowUpRight />
                        </a>
                      )}
                    </div>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <CertLightbox items={gallery} index={viewing} onChange={setViewing} onClose={() => setViewing(null)} />
    </section>
  );
}
