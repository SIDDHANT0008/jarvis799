'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const rnd = (a, b) => a + Math.random() * (b - a);

// Floating hearts, falling petals, twinkling sparkles, butterflies. Client-only to avoid hydration mismatch.
export function Ambient({ hearts = 12, petals = 10, sparkles = 14, butterflies = 3 }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    const mk = (n, f) => Array.from({ length: n }, (_, i) => f(i));
    setItems({
      hearts: mk(hearts, () => ({ x: rnd(0, 100), s: rnd(14, 30), d: rnd(9, 16), t: rnd(0, 10), e: ['💗', '💖', '💕', '🩷'][Math.floor(rnd(0, 4))] })),
      petals: mk(petals, () => ({ x: rnd(0, 100), s: rnd(14, 22), d: rnd(9, 15), t: rnd(0, 10), r: rnd(200, 540) })),
      sparkles: mk(sparkles, () => ({ x: rnd(0, 100), y: rnd(0, 100), s: rnd(10, 18), d: rnd(2, 4), t: rnd(0, 3) })),
      butterflies: mk(butterflies, () => ({ y: rnd(10, 70), d: rnd(18, 28), t: rnd(0, 8) }))
    });
  }, [hearts, petals, sparkles, butterflies]);
  if (!items) return null;
  return (
    <div className="fx" aria-hidden>
      {items.hearts.map((h, i) => (
        <motion.span key={'h' + i} style={{ left: h.x + '%', bottom: -40, fontSize: h.s }}
          animate={{ y: [0, -window.innerHeight - 80], x: [0, 20, -20, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: h.d, delay: h.t, repeat: Infinity, ease: 'linear' }}>{h.e}</motion.span>
      ))}
      {items.petals.map((p, i) => (
        <motion.span key={'p' + i} style={{ left: p.x + '%', top: -40, fontSize: p.s }}
          animate={{ y: [0, window.innerHeight + 60], x: [0, 30, -30, 10], rotate: [0, p.r], opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.d, delay: p.t, repeat: Infinity, ease: 'linear' }}>🌸</motion.span>
      ))}
      {items.sparkles.map((s, i) => (
        <motion.span key={'s' + i} style={{ left: s.x + '%', top: s.y + '%', fontSize: s.s, color: '#ffb3d0' }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: s.d, delay: s.t, repeat: Infinity }}>✦</motion.span>
      ))}
      {items.butterflies.map((b, i) => (
        <motion.span key={'b' + i} style={{ left: -40, top: b.y + '%', fontSize: 26 }}
          animate={{ x: [0, window.innerWidth + 80], y: [0, -40, 30, -20, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: b.d, delay: b.t, repeat: Infinity, ease: 'linear' }}>🦋</motion.span>
      ))}
    </div>
  );
}

// One-shot burst of hearts from the middle of the screen. Change `trigger` to fire again.
export function HeartBurst({ trigger }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const batch = Array.from({ length: 18 }, (_, i) => ({
      id: trigger + '-' + i, a: (i / 18) * Math.PI * 2 + rnd(-0.2, 0.2), r: rnd(110, 240), s: rnd(20, 36),
      e: ['❤️', '💗', '💖', '💕'][i % 4]
    }));
    setList(batch);
    const t = setTimeout(() => setList([]), 1800);
    return () => clearTimeout(t);
  }, [trigger]);
  return (
    <div className="fx" style={{ zIndex: 90 }} aria-hidden>
      {list.map((h) => (
        <motion.span key={h.id} style={{ left: '50%', top: '55%', fontSize: h.s }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
          animate={{ x: Math.cos(h.a) * h.r, y: Math.sin(h.a) * h.r - 60, opacity: 0, scale: 1.3 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}>{h.e}</motion.span>
      ))}
    </div>
  );
}
