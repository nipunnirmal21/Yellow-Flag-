import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import { BRAND } from '../data/content';
import GlowButton from './ui/GlowButton';

/**
 * Full-bleed background image. Sits behind the centered hero content. If
 * public/hero-bg.png fails to load, this removes itself and the gradient
 * background shows instead.
 *
 * This is the LCP element, so it loads eagerly at high priority — never lazy.
 */
function HeroBackdrop() {
  const [available, setAvailable] = useState(true);
  if (!available) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/*
        Shifting the photo down (below) leaves a strip with no image behind the
        fixed navbar. Fill it with a heavily blurred copy of the photo's top
        edge, so the nav sits on soft stadium colour rather than a flat black
        band. Painted beneath the sharp photo, so only the strip ever shows.
        Same src, so it costs no extra request.
      */}
      <div className="absolute inset-x-0 top-0 h-32 overflow-hidden">
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="h-64 w-full scale-125 object-cover object-top blur-3xl"
        />
      </div>

      {/*
        The hosts' heads sit ~9% from the top of the source image, and at 16:9
        object-cover crops nothing vertically — so the photo is nudged down to
        clear the navbar. Its top edge is feathered so the sharp image melts
        into the blurred fill instead of meeting it at a hard line.
      */}
      <img
        className="h-full w-full translate-y-12 object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0px,#000_30px)] md:translate-y-16"
        src="/hero-bg.png"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onError={() => setAvailable(false)}
      />
      {/*
        Dark washes keep the centered headline readable over the image.
        The vertical stops stay near-black only in the last few percent — just
        enough to blend into the black section below — then lift quickly so the
        hosts' suits don't get crushed at the bottom of the frame.
      */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.40)_16%,rgba(0,0,0,0.20)_55%,rgba(0,0,0,0.38)_100%)]" />
      {/*
        Centre scrim: darkens only the column the copy sits in, so the headline
        keeps its contrast while the hosts at either edge stay bright. Fades to
        fully transparent before it reaches them.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_44%_at_50%_55%,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.665)_25%,rgba(0,0,0,0.635)_45%,rgba(0,0,0,0.59)_60%,rgba(0,0,0,0.52)_72%,rgba(0,0,0,0.40)_82%,rgba(0,0,0,0.26)_90%,rgba(0,0,0,0.12)_96%,rgba(0,0,0,0)_100%)]" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <HeroBackdrop />
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
