import { FaPlay } from 'react-icons/fa6';
import abuDhabiImg from '../assets/tracks/abu-dhabi.svg';
import australiaImg from '../assets/tracks/australia.svg';
import chinaImg from '../assets/tracks/china.svg';
import japanImg from '../assets/tracks/japan.svg';
import monacoImg from '../assets/tracks/monaco.svg';
import monzaImg from '../assets/tracks/monza.svg';
import silverstoneImg from '../assets/tracks/silverstone.svg';
import singaporeImg from '../assets/tracks/singapore.svg';
import { f1Tracks2026, tracksIntro } from '../data/tracks';
import ExpandableGrid from './ui/ExpandableGrid';
import GlowButton from './ui/GlowButton';
import Panel from './ui/Panel';
import Reveal from './ui/Reveal';
import SectionAtmosphere from './ui/SectionAtmosphere';
import SectionHeading from './ui/SectionHeading';

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

const trackImageById = {
  1: 'australia',
  2: 'china',
  3: 'japan',
  6: 'monaco',
  9: 'silverstone',
  13: 'monza',
  16: 'singapore',
  22: 'abu-dhabi',
};

function getTrackImage(trackId) {
  const key = trackImageById[trackId];
  return key ? trackImages[key] ?? null : null;
}

/**
 * Shown for circuits without artwork yet. Reads as a deliberate number plate
 * rather than a missing asset — no apology copy.
 */
function TrackNumberPlate({ track }) {
  return (
    <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#141417,#08080a)]">
      <span className="font-display text-[5.5rem] font-black italic leading-none tabular-nums text-white/[0.07]">
        {String(track.id).padStart(2, '0')}
      </span>
    </div>
  );
}

function TrackCard({ track }) {
  const imageSrc = getTrackImage(track.id);

  return (
    <Panel as="article" id={`track-${track.id}`} interactive className="scroll-mt-28">
      <div className="relative h-48 overflow-hidden md:h-52">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={`${track.name} circuit map`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-panel via-black/40 to-transparent" />
          </>
        ) : (
          <TrackNumberPlate track={track} />
        )}

        <span className="absolute left-4 top-4 rounded-sm bg-black/75 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-flag">
          Round {String(track.id).padStart(2, '0')}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-xl font-black uppercase leading-tight text-chequer md:text-2xl">
            {track.name}
          </h3>
          <p className="mt-1 text-sm text-steel">{track.country}</p>
        </div>
      </div>

      <div className="p-5">
        <GlowButton href="#episodes" variant="secondary" className="w-full px-5 py-3 text-[11px]">
          <FaPlay className="h-3.5 w-3.5" aria-hidden="true" />
          Podcast Episodes
        </GlowButton>
      </div>
    </Panel>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="deep" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 400 C 200 300, 400 500, 600 400 S 1000 200, 1440 350"
          fill="none"
          stroke="rgba(255,212,0,0.8)"
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

        <ExpandableGrid expandLabel="View All Tracks" collapseLabel="See Less" collapsedMaxHeight="max-h-[640px]">
          {f1Tracks2026.map((track, index) => (
            <Reveal key={track.id} delay={Math.min(index * 0.04, 0.24)}>
              <TrackCard track={track} />
            </Reveal>
          ))}
        </ExpandableGrid>
      </div>
    </section>
  );
}
