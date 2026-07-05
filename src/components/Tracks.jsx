import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import abuDhabiImg from '../assets/tracks/abu-dhabi.svg';
import australiaImg from '../assets/tracks/australia.svg';
import chinaImg from '../assets/tracks/china.svg';
import japanImg from '../assets/tracks/japan.svg';
import monacoImg from '../assets/tracks/monaco.svg';
import monzaImg from '../assets/tracks/monza.svg';
import silverstoneImg from '../assets/tracks/silverstone.svg';
import singaporeImg from '../assets/tracks/singapore.svg';
import { f1Tracks, tracksIntro } from '../data/tracks';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

/** Replace .svg imports with .jpg files in src/assets/tracks/ when you add real photos. */
const trackImages = {
  australia: australiaImg,
  china: chinaImg,
  japan: japanImg,
  monaco: monacoImg,
  silverstone: silverstoneImg,
  monza: monzaImg,
  singapore: singaporeImg,
  'abu-dhabi': abuDhabiImg,
};

function getTrackImage(slug) {
  return trackImages[slug] ?? null;
}

function TrackImagePlaceholder() {
  return (
    <div className="flex h-full min-h-[220px] flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.12),transparent_55%),linear-gradient(135deg,#181818,#050505)]">
      <div className="mb-3 h-16 w-16 rounded-full border border-yellow-400/20 bg-yellow-400/5" />
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-300/80">Track Image</p>
      <p className="mt-1 text-sm font-semibold text-zinc-400">Coming Soon</p>
    </div>
  );
}

function TrackCard({ track, index }) {
  const imageSrc = getTrackImage(track.image);

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        id={`track-${track.slug}`}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition hover:border-yellow-400/40 hover:shadow-[0_0_40px_rgba(250,204,21,0.18)]"
      >
        <div className="relative h-56 overflow-hidden md:h-60">
          {imageSrc ? (
            <>
              <motion.img
                src={imageSrc}
                alt={`${track.circuit} circuit`}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            </>
          ) : (
            <TrackImagePlaceholder />
          )}

          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="inline-flex rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-200">
              {track.trackType}
            </span>
            <h3 className="mt-3 font-display text-2xl font-black uppercase text-white">{track.circuit}</h3>
            <p className="text-sm text-zinc-300">{track.country}</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-300">{track.grandPrix}</p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ['Length', track.length],
              ['Laps', track.laps],
              ['Distance', track.raceDistance],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/30 px-3 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                <p className="mt-1 text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-300">{track.description}</p>

          <div className="mt-6">
            <GlowButton href="#highlights" variant="secondary" className="w-full px-5 py-3 text-[11px]">
              <FaPlay className="h-3.5 w-3.5" />
              Podcast Preview
            </GlowButton>
          </div>
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {f1Tracks.map((track, index) => (
            <TrackCard key={track.slug} track={track} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
