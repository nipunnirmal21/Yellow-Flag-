import { motion, useScroll, useTransform } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import { BRAND } from '../data/content';
import GlowButton from './ui/GlowButton';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_24%)]" />

      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute right-[-8%] top-[18%] hidden h-[420px] w-[720px] md:block">
          <svg viewBox="0 0 720 420" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="carGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(250,204,21,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M80 260 C 140 220, 220 210, 300 230 C 380 250, 430 240, 520 210 C 590 188, 640 180, 680 170 L 700 185 C 650 205, 590 225, 520 245 C 430 275, 360 285, 280 275 C 200 265, 130 275, 80 260 Z"
              fill="url(#carGlow)"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            <motion.path
              d="M120 255 L 640 195"
              stroke="rgba(250,204,21,0.5)"
              strokeWidth="2"
              strokeDasharray="8 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.5 }}
            />
          </svg>
        </div>

      </motion.div>

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
            <GlowButton href="#highlights">
              <FaPlay className="h-4 w-4" />
              Watch Podcast
            </GlowButton>
            <GlowButton href="#highlights" variant="secondary">
              Explore Episodes
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
