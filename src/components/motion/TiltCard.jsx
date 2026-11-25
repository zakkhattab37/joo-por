import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useFinePointer } from '../../hooks/useFinePointer';

// 3D tilt + cursor spotlight on hover. Falls back to a plain card on touch devices.
export default function TiltCard({ children, className, max = 8, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 60%)`;

  const onMove = (e) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={fine ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      {...rest}
    >
      {children}
      {fine && <motion.div className="tilt-spotlight" style={{ background: spotlight }} aria-hidden="true" />}
    </motion.div>
  );
}
