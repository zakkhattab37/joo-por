import { motion } from 'framer-motion';
import { marqueeTech } from '../data/portfolio';
import './TechMarquee.css';

function Row({ items, reverse = false, duration = 40 }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-row">
      <motion.div
        className="marquee-track"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map(({ icon: Icon, name, color }, i) => (
          <span className="marquee-item" key={`${name}-${i}`} aria-hidden={i >= items.length}>
            <Icon style={{ color }} />
            {name}
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(marqueeTech.length / 2);
  return (
    <section className="marquee" aria-label="Backend stack and tools">
      <div className="marquee-tilt">
        <Row items={marqueeTech.slice(0, half)} duration={34} />
        <Row items={marqueeTech.slice(half)} reverse duration={38} />
      </div>
    </section>
  );
}
