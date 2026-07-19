import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import { BRAND } from '../data/content';
import GlowButton from './ui/GlowButton';

/**
 * Full-bleed background video. Sits behind the centered hero content. If
 * public/hero-bg.mp4 fails to load, this removes itself and the gradient
 * background shows instead.
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
      {/* Dark washes keep the centered headline readable over motion. */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <HeroVideo />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_24%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center md:px-8">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-yellow-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
            Live Race Energy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-white md:text-7xl xl:text-8xl"
          >
            <span className="block text-yellow-300 drop-shadow-[0_0_30px_rgba(250,204,21,0.35)]">{BRAND.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl text-xl font-semibold uppercase tracking-[0.12em] text-zinc-200 md:text-2xl"
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
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <GlowButton href="#episodes">
              <FaPlay className="h-4 w-4" />
              Watch Podcast
            </GlowButton>
            <GlowButton href="#episodes" variant="secondary">
              Explore Episodes
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
