'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Ambient, HeartBurst } from './Fx';
import { LETTER, NAME, PHOTOS, POEM } from './content';

const reveal = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, ease: 'easeOut' } };

/* ---------- 1. Envelope ---------- */
function Envelope({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const go = () => {
    if (opening) return;
    setOpening(true);
    onOpen(); // user gesture => safe to start music
  };
  return (
    <motion.section key="env" exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }} transition={{ duration: 0.9 }}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'linear-gradient(160deg,#ffe3ee,#fff8f0 50%,#efe5ff)' }}>
      <div className="content">
        <motion.h1 className="hand glow" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(2.2rem,9vw,3.4rem)' }}>
          Heyyy My Pyaara Baccha 💗
        </motion.h1>
        <p style={{ marginTop: 10 }}>Someone has made something special just for you...</p>
        <motion.div className="env" animate={opening ? { y: 0 } : { y: [0, -8, 0] }} transition={opening ? {} : { repeat: Infinity, duration: 2.6 }}>
          <div className="back" />
          <motion.div className="paper" initial={{ y: 0 }} animate={opening ? { y: -90, scale: 1.08 } : {}} transition={{ delay: 0.6, duration: 0.8 }}>💌</motion.div>
          <div className="front" />
          <motion.div className="flap" style={{ zIndex: opening ? 0 : 4 }} animate={opening ? { rotateX: 180 } : {}} transition={{ duration: 0.7 }} />
          {!opening && <motion.div className="seal" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}>💗</motion.div>}
        </motion.div>
        <button className="btn" onClick={go}>Open Your Surprise 💌</button>
      </div>
    </motion.section>
  );
}

/* ---------- 2. Hero ---------- */
function Hero() {
  return (
    <section id="hero">
      <div className="content">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ fontSize: '3.4rem' }}>💖</motion.div>
        <motion.h1 className="glow" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
          Happy Princess Day, My {NAME} 👑
        </motion.h1>
        <motion.p className="hand" style={{ fontSize: '1.9rem', margin: '18px 0 34px', color: '#ff5c93' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
          My Pyaara Baccha, You Make My World Beautiful ❤️
        </motion.p>
        <motion.button className="btn" whileTap={{ scale: 0.94 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          onClick={() => document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' })}>
          Enter Our Little World ✨
        </motion.button>
      </div>
    </section>
  );
}

/* ---------- 3. Gallery + lightbox ---------- */
const tilts = [-4, 3, -2, 4, -3, 2, -5, 3, -2, 4];
function Gallery() {
  const [open, setOpen] = useState(null);
  const step = (d) => setOpen((o) => (o + d + PHOTOS.length) % PHOTOS.length);
  useEffect(() => {
    if (open === null) return;
    const k = (e) => (e.key === 'Escape' ? setOpen(null) : e.key === 'ArrowRight' ? step(1) : e.key === 'ArrowLeft' ? step(-1) : null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <section id="memories">
      <div className="content">
        <motion.h2 {...reveal}>Our Little Memories 📸</motion.h2>
        <div className="board">
          {PHOTOS.map((p, i) => (
            <motion.div key={p.src} className="pol" style={{ marginTop: i % 2 ? 22 : 0 }}
              initial={{ opacity: 0, y: 50, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }} viewport={{ once: true, margin: '-40px' }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 5 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              onClick={() => setOpen(i)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(i)}>
              <div className="tape" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 + (i % 3), ease: 'easeInOut' }}>
                <img src={p.src} alt={p.caption} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
                <p>{p.caption}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img key={open} src={PHOTOS[open].src} alt={PHOTOS[open].caption} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} />
            <p>{PHOTOS[open].caption}</p>
            <button style={{ top: 14, right: 14 }} onClick={() => setOpen(null)} aria-label="Close">✕</button>
            <button style={{ left: 10, top: '45%' }} onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
            <button style={{ right: 10, top: '45%' }} onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- 4. Letter (typewriter) ---------- */
function Letter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-25%' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setN((v) => (v >= LETTER.length ? v : v + 2)), 38);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <section>
      <div className="content">
        <motion.h2 {...reveal}>A Little Letter For You, {NAME} 💌</motion.h2>
        <motion.div ref={ref} className="paper-card" {...reveal}>
          {LETTER.slice(0, n)}
          {n < LETTER.length && <span className="caret" />}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 5. Poem ---------- */
function Poem() {
  return (
    <section>
      <div className="content poem">
        <motion.h2 {...reveal}>Mere Pyaare Bacche Ke Liye 🌷</motion.h2>
        {POEM.map((l, i) =>
          l ? <motion.p key={i} initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.8 }}>{l}</motion.p>
            : <div key={i} className="gap" />
        )}
      </div>
    </section>
  );
}

/* ---------- 6. Question ---------- */
function Question() {
  const [msg, setMsg] = useState('');
  const [burst, setBurst] = useState(0);
  const answer = (m) => { setMsg(m); setBurst((b) => b + 1); };
  return (
    <section>
      <HeartBurst trigger={burst} />
      <div className="content">
        <motion.h2 {...reveal} className="hand" style={{ fontFamily: 'var(--hand)' }}>Ek chhota sa sawaal hai, Pyaara Baccha... ❤️</motion.h2>
        <motion.p {...reveal} style={{ fontSize: '1.3rem', marginBottom: 28 }}>Will you always be my favourite person?</motion.p>
        <div className="row">
          <motion.button whileTap={{ scale: 0.93 }} className="btn" onClick={() => answer('Mera dil abhi bahut zor se dhadak raha hai 🥹 Main hamesha tumhara hi rahunga, Kavita. Always & forever ❤️')}>Always &amp; Forever ❤️</motion.button>
          <motion.button whileTap={{ scale: 0.93 }} className="btn alt" onClick={() => answer('Hehe, mera pyaara sa Baccha 🥺 Tumhara jawab kuch bhi ho, tum meri favourite ho aur rahogi. Koi pressure nahi, bas pyaar hi pyaar 💗')}>Of Course, Silly! 🥺</motion.button>
        </div>
        <AnimatePresence mode="wait">
          {msg && <motion.p key={msg} className="msg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>{msg}</motion.p>}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- 7. Finale ---------- */
function Finale() {
  return (
    <section>
      <div className="content" style={{ maxWidth: 520 }}>
        <motion.p {...reveal} className="hand" style={{ fontSize: '1.8rem' }}>One thing I want you to know...</motion.p>
        <motion.p {...reveal} transition={{ duration: 1, delay: 0.5 }} style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', lineHeight: 1.7, margin: '16px 0' }}>
          {NAME}, duniya mein bahut saari beautiful cheezein hain, but meri favourite hamesha tum rahogi. ❤️
        </motion.p>
        <motion.div className="bigheart" initial={{ scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', duration: 1.4 }}>
          <motion.div style={{ width: '100%', height: '100%' }} animate={{ scale: [1, 1.12, 1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <svg viewBox="0 0 64 58"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9ac0" /><stop offset="1" stopColor="#ff4f8b" /></linearGradient></defs>
              <path d="M32 55S3 36 3 17C3 8 10 2 17 2c6 0 11 4 15 9 4-5 9-9 15-9 7 0 14 6 14 15 0 19-29 38-29 38z" fill="url(#g)" /></svg>
          </motion.div>
          <b>{NAME}</b>
        </motion.div>
        <motion.h1 {...reveal} className="glow" style={{ marginTop: 10 }}>Happy Princess Day, My Pyaara Baccha 👑</motion.h1>
      </div>
    </section>
  );
}

/* ---------- Music ---------- */
function MusicButton({ audioRef, playing, setPlaying }) {
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };
  return (
    <motion.button className="music" onClick={toggle} whileTap={{ scale: 0.9 }} aria-label={playing ? 'Pause music' : 'Play music'}
      animate={playing ? { rotate: 360 } : { rotate: 0 }} transition={playing ? { repeat: Infinity, duration: 6, ease: 'linear' } : {}}>
      {playing ? '🎵' : '🔇'}
    </motion.button>
  );
}

export default function Experience() {
  const [opened, setOpened] = useState(false);
  const [showEnv, setShowEnv] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const open = () => {
    const a = audioRef.current;
    if (a) { a.volume = 0.5; a.play().then(() => setPlaying(true)).catch(() => {}); } // only after tap, never autoplay
    setTimeout(() => setShowEnv(false), 1600);
    setOpened(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/music.wav" loop preload="none" />
      <Ambient />
      <AnimatePresence>{showEnv && <Envelope onOpen={open} />}</AnimatePresence>
      {opened && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.6 }}>
          <Hero /><Gallery /><Letter /><Poem /><Question /><Finale />
        </motion.main>
      )}
      <MusicButton audioRef={audioRef} playing={playing} setPlaying={setPlaying} />
    </>
  );
}
