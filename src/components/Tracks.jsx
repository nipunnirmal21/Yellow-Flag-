import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import { f1Tracks2026, tracksIntro } from '../data/tracks';
import ExpandableGrid from './ui/ExpandableGrid';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function TrackOutline({ track }) {
  const [failed, setFailed] = useState(false);
  const shouldInvert = Boolean(track.invertLayout);

  if (!track.layoutUrl || failed) {
    return (
      <div
        className="pointer-events-none absolute -right-6 top-8 h-44 w-56 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.08),transparent_70%)] opacity-60 md:h-52 md:w-64"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.img
      src={track.layoutUrl}
      alt=""
      aria-hidden="true"
      loading="lazy"
      referrerPolicy="no-referrer"
      className="pointer-events-none absolute -right-4 top-2 h-[70%] w-[72%] object-contain opacity-80 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] md:-right-2 md:top-4 md:h-[75%] md:w-[70%]"
      style={{
        filter: shouldInvert
          ? 'invert(1) drop-shadow(0 0 12px rgba(250,204,21,0.35)) drop-shadow(0 0 28px rgba(250,204,21,0.18))'
          : 'drop-shadow(0 0 12px rgba(250,204,21,0.35)) drop-shadow(0 0 28px rgba(250,204,21,0.18))',
      }}
      whileHover={{ scale: 1.04, opacity: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onError={() => setFailed(true)}
    />
  );
}

function TrackCard({ track, index }) {
  return (
    <Reveal delay={index * 0.04}>
      <motion.article
        id={`track-${track.id}`}
        whileHover={{ y: -6 }}
        className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] transition hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.12)]"
      >
        <div className="relative min-h-[220px] flex-1 overflow-hidden px-5 pb-6 pt-5 md:min-h-[240px] md:px-6 md:pt-6">
          <TrackOutline track={track} />

          <span className="relative z-10 inline-flex rounded-full border border-yellow-400/40 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-300">
            Round {String(track.id).padStart(2, '0')}
          </span>

          <div className="relative z-10 mt-10 max-w-[85%] md:mt-14 md:max-w-[70%]">
            <h3 className="font-display text-xl font-extrabold uppercase leading-tight tracking-wide text-white md:text-2xl">
              {track.name}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{track.country}</p>
          </div>
        </div>

        <div className="border-t border-white/5 bg-[#111111] p-4 md:p-5">
          <a
            href="#highlights"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-[#1a1a1a] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-yellow-400/35 hover:text-yellow-200"
          >
            <FaPlay className="h-3 w-3" />
            Podcast Preview
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="relative py-24 md:py-32">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 400 C 200 300, 400 500, 600 400 S 1000 200, 1440 350"
          fill="none"
          stroke="rgba(250,204,21,0.8)"
          strokeWidth="2"
          strokeDasharray="12 16"
        />
        <path
          d="M0 520 C 240 420, 480 620, 720 500 S 1200 320, 1440 470"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Tracks" title="F1 Tracks" description={tracksIntro} />

        <ExpandableGrid expandLabel="VIEW ALL TRACKS" collapseLabel="See Less" collapsedMaxHeight="max-h-[640px]">
          {f1Tracks2026.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </ExpandableGrid>
      </div>
    </section>
  );
}
