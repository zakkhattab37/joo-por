import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiChevronLeft, FiChevronRight, FiExternalLink, FiMaximize, FiMinimize, FiX, FiZoomIn, FiZoomOut,
} from 'react-icons/fi';
import './CertLightbox.css';

const ZOOM = 2;
const SWIPE = 60; // px a swipe must travel to change certificate
const ease = [0.22, 1, 0.36, 1];

const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement;
const canFullscreen = () =>
  typeof document !== 'undefined' && !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);

function exitFullscreen() {
  if (!fsElement()) return;
  (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
}

// new certificate slides in from the side you're heading to
const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 90, y: dir ? 0 : 30, scale: dir ? 0.96 : 0.88 }),
  center: { opacity: 1, x: 0, y: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir * -90, scale: 0.96, transition: { duration: 0.22 } }),
};

/**
 * Full-screen certificate viewer.
 * Move: arrow buttons, ← / → keys, or swipe.
 * Close: X button, click on the dark background, or Escape.
 * Focus: click the image (or the zoom button) to zoom in, then drag to pan.
 */
export default function CertLightbox({ items, index, onChange, onClose }) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {index != null && items[index] && (
        <Viewer key="viewer" items={items} index={index} onChange={onChange} onClose={onClose} />
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Viewer({ items, index, onChange, onClose }) {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const closeRef = useRef(null);
  const dragged = useRef(false);
  const [dir, setDir] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [isFull, setIsFull] = useState(false);

  const cert = items[index];
  const many = items.length > 1;

  const go = (step) => {
    if (!many) return;
    setDir(Math.sign(step));
    setZoomed(false);
    onChange((index + step + items.length) % items.length);
  };

  // lock page scroll, focus the close button, restore focus afterwards
  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      exitFullscreen();
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  // preload the neighbours so arrows feel instant
  useEffect(() => {
    items.forEach((c) => {
      const img = new Image();
      img.src = c.image;
    });
  }, [items]);

  // keyboard: Esc closes, ←/→ move, Tab stays inside the dialog
  // (re-subscribed each render so it always sees the current certificate)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Tab') {
        const els = overlayRef.current?.querySelectorAll('button, a[href]');
        if (!els?.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  useEffect(() => {
    const onChangeFs = () => setIsFull(fsElement() === overlayRef.current);
    document.addEventListener('fullscreenchange', onChangeFs);
    document.addEventListener('webkitfullscreenchange', onChangeFs);
    return () => {
      document.removeEventListener('fullscreenchange', onChangeFs);
      document.removeEventListener('webkitfullscreenchange', onChangeFs);
    };
  }, []);

  // un-zoom when the image size changes (fullscreen toggle / resize)
  useEffect(() => {
    const reset = () => setZoomed(false);
    window.addEventListener('resize', reset);
    return () => window.removeEventListener('resize', reset);
  }, []);

  const toggleFullscreen = () => {
    const el = overlayRef.current;
    if (fsElement()) exitFullscreen();
    else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  const toggleZoom = () => {
    const img = imgRef.current;
    if (!zoomed && img) {
      // how far the 2× image may be dragged before its edge shows
      const x = (img.offsetWidth * (ZOOM - 1)) / 2;
      const y = (img.offsetHeight * (ZOOM - 1)) / 2;
      setBounds({ left: -x, right: x, top: -y, bottom: y });
    }
    setZoomed((z) => !z);
  };

  const onImageClick = (e) => {
    e.stopPropagation();
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    toggleZoom();
  };

  // not zoomed: horizontal drag = swipe to the next / previous certificate
  const onDragEnd = (_, info) => {
    if (zoomed) return;
    if (info.offset.x < -SWIPE || info.velocity.x < -500) go(1);
    else if (info.offset.x > SWIPE || info.velocity.x > 500) go(-1);
  };

  // only a click on the background itself closes the viewer
  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      ref={overlayRef}
      className={`lightbox${isFull ? ' is-fullscreen' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={cert.label ?? `${cert.title} certificate`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none', transition: { duration: 0.25, delay: 0.05 } }}
      transition={{ duration: 0.3 }}
      onClick={onBackdrop}
    >
      <motion.header
        className="lightbox-bar"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.4, ease } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
      >
        <div className="lightbox-caption" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className="lightbox-caption-inner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <strong>{cert.title}</strong>
              <span>
                {many && (
                  <b className="lightbox-count">
                    {index + 1} / {items.length}
                  </b>
                )}
                {cert.issuer}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lightbox-actions">
          <button
            type="button"
            className="lightbox-btn"
            onClick={toggleZoom}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            title={zoomed ? 'Zoom out' : 'Zoom in'}
          >
            {zoomed ? <FiZoomOut /> : <FiZoomIn />}
          </button>
          {canFullscreen() && (
            <button
              type="button"
              className="lightbox-btn"
              onClick={toggleFullscreen}
              aria-label={isFull ? 'Exit full screen' : 'Full screen'}
              title={isFull ? 'Exit full screen' : 'Full screen'}
            >
              {isFull ? <FiMinimize /> : <FiMaximize />}
            </button>
          )}
          <a
            className="lightbox-btn"
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open image in a new tab"
            title="Open image in a new tab"
          >
            <FiExternalLink />
          </a>
          <button
            ref={closeRef}
            type="button"
            className="lightbox-btn lightbox-close"
            onClick={onClose}
            aria-label="Close"
            title="Close (Esc)"
          >
            <FiX />
          </button>
        </div>
      </motion.header>

      <div className="lightbox-stage" onClick={onBackdrop}>
        <AnimatePresence initial={true} custom={dir}>
          <motion.img
            key={index}
            ref={imgRef}
            src={cert.image}
            alt={cert.alt ?? `${cert.title} certificate from ${cert.issuer}`}
            className={`lightbox-img${zoomed ? ' is-zoomed' : ''}`}
            draggable={false}
            custom={dir}
            variants={slide}
            initial="enter"
            animate={zoomed ? { opacity: 1, scale: ZOOM } : 'center'}
            exit="exit"
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            drag={zoomed ? true : many ? 'x' : false}
            dragConstraints={zoomed ? (bounds ?? undefined) : { left: 0, right: 0 }}
            dragElastic={zoomed ? 0.08 : 0.6}
            onDragStart={() => (dragged.current = true)}
            onDragEnd={onDragEnd}
            onClick={onImageClick}
          />
        </AnimatePresence>

        {many && (
          <>
            <motion.button
              type="button"
              className="lightbox-nav prev"
              onClick={() => go(-1)}
              aria-label="Previous certificate"
              title="Previous (←)"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.88 }}
            >
              <FiChevronLeft />
            </motion.button>
            <motion.button
              type="button"
              className="lightbox-nav next"
              onClick={() => go(1)}
              aria-label="Next certificate"
              title="Next (→)"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.88 }}
            >
              <FiChevronRight />
            </motion.button>
          </>
        )}
      </div>

      {many && (
        <div className="lightbox-dots" role="tablist" aria-label="Certificates">
          {items.map((c, i) => (
            <button
              key={c.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={c.title}
              className={`lightbox-dot${i === index ? ' is-active' : ''}`}
              onClick={() => i !== index && go(i - index)}
            >
              {i === index && <motion.span layoutId="lightbox-dot" className="lightbox-dot-fill" />}
            </button>
          ))}
        </div>
      )}

      <motion.p
        className="lightbox-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {zoomed
          ? 'Drag to look around · click to zoom out'
          : many
            ? 'Click to zoom · ← → or swipe to switch · Esc to close'
            : 'Click the image to zoom · Esc or click outside to close'}
      </motion.p>
    </motion.div>
  );
}
