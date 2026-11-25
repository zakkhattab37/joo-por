import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiGithub } from 'react-icons/fi';
import SectionHeading from './motion/SectionHeading';
import Reveal from './motion/Reveal';
import TiltCard from './motion/TiltCard';
import { projects } from '../data/portfolio';
import './Projects.css';

const loop = (duration, delay = 0) => ({ duration, delay, repeat: Infinity, ease: 'easeInOut' });

function ShopMock() {
  return (
    <div className="mock-shop">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="mock-product"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.08 }}
        >
          <motion.span
            className="mock-thumb"
            animate={{ opacity: [0.55, 0.9, 0.55] }}
            transition={loop(3, i * 0.3)}
          />
          <span className="mock-line" />
          <span className="mock-line short" />
        </motion.div>
      ))}
      <motion.span
        className="mock-cart"
        animate={{ scale: [1, 1.25, 1], rotate: [0, -10, 0] }}
        transition={{ ...loop(0.6), repeatDelay: 2.4 }}
      >
        3
      </motion.span>
    </div>
  );
}

const bars = [45, 70, 55, 90, 65, 80, 50];

function DashboardMock() {
  return (
    <div className="mock-dash">
      <div className="mock-kpis">
        {[0, 1, 2].map((i) => (
          <span key={i} className="mock-kpi">
            <span className="mock-line short" />
            <span className="mock-kpi-val" />
          </span>
        ))}
      </div>
      <div className="mock-chart">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="mock-bar"
            initial={{ height: '8%' }}
            whileInView={{ height: [`${h}%`, `${Math.max(20, 100 - h)}%`, `${h}%`] }}
            viewport={{ once: false }}
            transition={loop(4, i * 0.15)}
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioMock() {
  return (
    <div className="mock-folio">
      <motion.span className="mock-orb" animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }} transition={loop(4)} />
      <div className="mock-folio-text">
        <span className="mock-line wide" />
        <span className="mock-line wide accent" />
        <span className="mock-line" />
        <div className="mock-btns">
          <motion.span className="mock-btn" animate={{ x: [0, 3, 0] }} transition={loop(2)} />
          <span className="mock-btn ghost" />
        </div>
      </div>
    </div>
  );
}

// Designer portfolio: a before/after divider sweeps between the soft "Default"
// theme and the loud "Maximalism" theme of the same page.
const sweep = { duration: 5, repeat: Infinity, ease: 'easeInOut' };

function StudioLayout({ loud }) {
  return (
    <>
      <div className="studio-nav">
        <span className="studio-logo" />
        <span className="studio-pill">{loud ? 'MAXIMALISM' : 'Default'}</span>
      </div>
      <span className="studio-title" />
      <span className="studio-title short" />
      <div className="studio-tiles">
        <span />
        <span />
        <span />
      </div>
      {loud && (
        <motion.span className="studio-sticker" animate={{ rotate: [-12, 8, -12] }} transition={loop(3)}>
          ★
        </motion.span>
      )}
    </>
  );
}

function StudioMock() {
  return (
    <div className="mock-studio">
      <div className="studio-layer soft">
        <StudioLayout />
      </div>
      <motion.div
        className="studio-layer loud"
        animate={{ clipPath: ['inset(0 0 0 28%)', 'inset(0 0 0 72%)', 'inset(0 0 0 28%)'] }}
        transition={sweep}
      >
        <StudioLayout loud />
      </motion.div>
      <motion.span className="studio-handle" animate={{ left: ['28%', '72%', '28%'] }} transition={sweep}>
        <span className="studio-knob">⟷</span>
      </motion.span>
    </div>
  );
}

const mocks = { studio: StudioMock, shop: ShopMock, dashboard: DashboardMock, portfolio: PortfolioMock };

// Native player for the project's video, streamed straight from LinkedIn's media server.
// Nothing downloads until play is pressed. If no source loads, it links to the post instead of showing a dead player.
function ProjectVideo({ title, video }) {
  const [failed, setFailed] = useState(false);
  const lastSource = video.sources.length - 1;
  return (
    <div className="project-video" style={{ '--ratio': video.ratio ?? 16 / 9 }}>
      {failed ? (
        <div className="project-video-fallback">
          <p>This video can&apos;t be played here.</p>
          {video.post && (
            <a href={video.post} target="_blank" rel="noopener noreferrer">
              Watch it on LinkedIn <FiArrowUpRight />
            </a>
          )}
        </div>
      ) : (
        <video controls playsInline preload="none" poster={video.poster} aria-label={`${title}: video walkthrough`}>
          {video.sources.map((src, i) => (
            <source key={src} src={src} type="video/mp4" onError={i === lastSource ? () => setFailed(true) : undefined} />
          ))}
        </video>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const Mock = mocks[project.mock];
  const [c1, c2] = project.accent;
  const { featured, linkedinPost, video } = project;
  const hasMedia = Boolean(video || linkedinPost);
  return (
    <Reveal delay={index * 0.1} className={`project-wrap ${featured ? 'is-featured' : ''}`}>
      <TiltCard className="project-card card" max={hasMedia ? 0 : featured ? 4 : 7}>
        <div className={`project-preview${hasMedia ? ' has-media' : ''}${project.preview ? ' has-terminal' : ''}`} style={{ '--c1': c1, '--c2': c2 }}>
          {linkedinPost ? (
            <iframe
              className="project-post"
              src={linkedinPost.embed}
              title={`${project.title} launch post on LinkedIn`}
              width="504"
              height="399"
              loading="lazy"
              allowFullScreen
            />
          ) : video ? (
            <ProjectVideo title={project.title} video={video} />
          ) : project.preview ? (
            <div className="project-terminal">
              <div className="code-dots" aria-hidden="true"><span /><span /><span /></div>
              <code>
                {project.preview.map((line) => <span key={line}>{line}</span>)}
              </code>
            </div>
          ) : Mock && (
            <div className="browser">
              <div className="browser-bar">
                <span />
                <span />
                <span />
                <span className="browser-url" />
              </div>
              <div className="browser-body">
                <Mock />
              </div>
            </div>
          )}
        </div>

        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          {project.highlights && (
            <ul className="project-highlights">
              {project.highlights.map((h) => (
                <li key={h}>
                  <FiCheck aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          {project.takeaway && <p className="project-desc">{project.takeaway}</p>}
          <ul className="project-tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {(project.demo || project.repo || linkedinPost || project.link) && (
            <div className="project-links">
              {project.link && (
                <a href={project.link.href} className="project-link primary">
                  {project.link.label} <FiArrowUpRight />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="project-link primary" target="_blank" rel="noopener noreferrer">
                  Live demo <FiArrowUpRight />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} className="project-link" target="_blank" rel="noopener noreferrer">
                  <FiGithub /> Code
                </a>
              )}
              {linkedinPost && (
                <a href={linkedinPost.url} className="project-link" target="_blank" rel="noopener noreferrer">
                  LinkedIn post <FiArrowUpRight />
                </a>
              )}
            </div>
          )}
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Work"
          title="Featured projects"
          highlight="projects"
          subtitle="The live portfolio API alongside two backend design concepts."
        />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
