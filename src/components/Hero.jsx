import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlay, FaYoutube } from 'react-icons/fa6';
import { BRAND } from '../data/content';
import { CHANNEL } from '../data/episodes';
import { getFeaturedRace } from '../lib/raceClock';
import NextRaceCountdown from './NextRaceCountdown';
import GlowButton from './ui/GlowButton';

/**
 * Full-bleed background video. Drop a muted-loop-friendly clip at
 * public/hero-bg.mp4 (own footage or free-licensed stock); until the file
 * exists this renders nothing and the gradient background shows instead.
 */
function HeroVideo() {
  const [available, setAvailable] = useState(true);
  if (!available) return null;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <video
        className="h-full w-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setAvailable(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70" />
    </div>
  );
}

function HeroTicker() {
  const race = getFeaturedRace();
  const items = [
    'Yellow Flag — Sinhala F1 Podcast',
    race ? `Round ${String(race.round).padStart(2, '0')} / ${race.totalRounds}` : '2026 Season',
    race ? `Next: ${race.grandPrix}` : 'Season Complete',
    race ? race.track : 'See you in 2027',
    race ? `${race.raceTime} — Sri Lanka Time` : '',
    "It's lights out and away we go",
  ].filter(Boolean);
  const loop = [...items, ...items];

  return (
    <div className="absolute inset-x-0 bottom-0 z-20" aria-hidden="true">
      <div
        className="h-3 w-full opacity-20"
        style={{ background: 'repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%) 0 0 / 16px 16px' }}
      />
      <div className="overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur">
        <div className="ticker-track flex w-max items-center whitespace-nowrap py-3">
          {loop.map((item, index) => (
            <span
              key={index}
              className="flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400"
            >
              <span className={`px-8 ${index % items.length === 2 ? 'text-yellow-300' : ''}`}>{item}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-yellow-400/70" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-28 pt-28">
      <HeroVideo />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_24%)]" />

      <motion.div style={{ y, opacity }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <p
          className="absolute left-1/2 top-[46%] w-max -translate-x-1/2 -translate-y-1/2 select-none font-display text-[15vw] font-black uppercase italic leading-none text-transparent"
          style={{ WebkitTextStroke: '1.5px rgba(250,204,21,0.08)' }}
        >
          {BRAND.name}
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex"
          >
            <span className="flex items-stretch overflow-hidden rounded-sm">
              <span className="kerb-v w-1.5" aria-hidden="true" />
              <span className="flex items-center gap-2.5 bg-panel-2 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-flag">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flag" aria-hidden="true" />
                Live Race Energy
              </span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-black uppercase italic leading-[0.92] tracking-tight text-white md:text-7xl xl:text-8xl"
          >
            <span className="block text-yellow-300 drop-shadow-[0_0_30px_rgba(250,204,21,0.35)]">{BRAND.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl font-display text-xl font-bold text-zinc-100 md:text-2xl"
          >
            {BRAND.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg"
          >
            {BRAND.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <GlowButton
              href={CHANNEL.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="youtube"
            >
              <FaYoutube className="h-4 w-4" />
              Subscribe on YouTube
            </GlowButton>
            <GlowButton href="#episodes" variant="secondary">
              <FaPlay className="h-3.5 w-3.5" />
              Latest Episodes
            </GlowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative"
        >
          <NextRaceCountdown />
        </motion.div>
      </div>

      <HeroTicker />
    </section>
  );
}
