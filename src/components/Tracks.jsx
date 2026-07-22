import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay, FaXmark } from 'react-icons/fa6';
import { f1Tracks2026, tracksIntro } from '../data/tracks';
import ExpandableGrid from './ui/ExpandableGrid';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function TrackOutline({ track }) {
  const [failed, setFailed] = useState(false);
  const shouldInvert = Boolean(track.invertLayout);

  if (track.layoutPath) {
    return (
      <svg
        viewBox={track.viewBox || "-6 -6 237 267"}
        className="pointer-events-none absolute -right-4 top-2 h-[70%] w-[72%] opacity-80 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] md:-right-2 md:top-4 md:h-[75%] md:w-[70%]"
        style={{
          filter: shouldInvert
            ? 'invert(1) drop-shadow(0 0 12px rgba(250,204,21,0.35)) drop-shadow(0 0 28px rgba(250,204,21,0.18))'
            : 'drop-shadow(0 0 12px rgba(250,204,21,0.35)) drop-shadow(0 0 28px rgba(250,204,21,0.18))',
        }}
        fill="none"
      >
        <path d={track.layoutPath} stroke="#FACC15" strokeWidth="3" fill="rgba(250,204,21,0.08)" />
      </svg>
    );
  }

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

function TrackStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-black/40 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-yellow-500">{label}</p>
      <p className="mt-1.5 text-base font-semibold leading-snug text-white">{value}</p>
    </div>
  );
}

function TrackModal({ track, onClose }) {
  const shouldInvert = Boolean(track.invertLayout);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111]/90 p-6 shadow-2xl backdrop-blur-xl md:p-8"
        style={{ borderTopColor: 'rgba(250,204,21,0.7)', borderTopWidth: '3px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close track details"
          className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-white"
        >
          <FaXmark className="h-5 w-5" />
        </button>

        {/* Track layout */}
        {track.layoutPath ? (
          <div className="flex items-center justify-center pb-2 pt-4">
            <svg
              viewBox={track.viewBox || "-6 -6 237 267"}
              className={`h-44 w-full max-w-md drop-shadow-[0_0_18px_rgba(250,204,21,0.25)] md:h-52 ${
                shouldInvert ? 'invert brightness-200' : 'brightness-200'
              }`}
              fill="none"
            >
              <path d={track.layoutPath} stroke="#FACC15" strokeWidth="3" fill="rgba(250,204,21,0.08)" />
            </svg>
          </div>
        ) : track.layoutUrl ? (
          <div className="flex items-center justify-center pb-2 pt-4">
            <img
              src={track.layoutUrl}
              alt={`${track.name} layout`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className={`h-44 w-full max-w-md object-contain drop-shadow-[0_0_18px_rgba(250,204,21,0.25)] md:h-52 ${
                shouldInvert ? 'invert brightness-200' : 'brightness-200'
              }`}
            />
          </div>
        ) : null}

        {/* Header */}
        <div className="mt-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-yellow-300">
            Round {String(track.id).padStart(2, '0')} · 2026 Calendar
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight text-white md:text-3xl">
            {track.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-6 text-sm leading-7 text-gray-300 md:text-base">{track.description}</p>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
          <TrackStat label="Country" value={track.country} />
          <TrackStat label="Track Length" value={track.trackLength} />
          <TrackStat label="Laps" value={track.laps} />
          <TrackStat label="Race Distance" value={track.raceDistance} />
          <TrackStat label="Track Type" value={track.trackType} />
          <TrackStat label="Time of Day" value={track.timeOfDay} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function TrackCard({ track, index, onSelect }) {
  return (
    <Reveal delay={index * 0.04}>
      <motion.article
        id={`track-${track.id}`}
        whileHover={{ y: -6 }}
        onClick={() => onSelect(track)}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a] transition hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.12)]"
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
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 transition group-hover:text-yellow-300">
              Click for circuit details
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 bg-[#111111] p-4 md:p-5">
          <a
            href="#highlights"
            onClick={(e) => e.stopPropagation()}
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
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Lock page scroll and allow Escape to close while the modal is open.
  useEffect(() => {
    if (!selectedTrack) return undefined;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedTrack(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedTrack]);

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
            <TrackCard key={track.id} track={track} index={index} onSelect={setSelectedTrack} />
          ))}
        </ExpandableGrid>

        <AnimatePresence>
          {selectedTrack && <TrackModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
