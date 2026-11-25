import { motion } from 'framer-motion';
import './SectionHeading.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const word = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Eyebrow + title whose words slide up from a mask, + optional subtitle.
export default function SectionHeading({ index, eyebrow, title, highlight, subtitle, align = 'left' }) {
  const words = title.split(' ');
  return (
    <div className={`section-heading align-${align}`}>
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {index && <span className="section-index">{index}</span>}
        {eyebrow}
      </motion.span>

      <motion.h2
        className="section-title"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {words.map((w, i) => (
          <span className="word-mask" key={i}>
            <motion.span className={`word ${w === highlight ? 'gradient-text' : ''}`} variants={word}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
