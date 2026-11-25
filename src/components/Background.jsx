import { motion, useScroll, useTransform } from 'framer-motion';
import './Background.css';

// Fixed ambient backdrop: drifting colour blobs + a faint grid that parallaxes on scroll.
export default function Background() {
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <div className="bg-layer" aria-hidden="true">
      <motion.div className="bg-grid" style={{ y: gridY }} />
      <motion.div
        className="bg-blob blob-1"
        animate={{ x: [0, 120, -60, 0], y: [0, 80, 140, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob-2"
        animate={{ x: [0, -140, 40, 0], y: [0, 120, -60, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="bg-blob blob-3"
        animate={{ x: [0, 80, -100, 0], y: [0, -100, 40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="bg-noise" />
    </div>
  );
}
