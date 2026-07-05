import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import { highlightCards } from '../data/content';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function VideoCard({ title, text, accent, large = false }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/80 ${
        large ? 'min-h-[360px] md:min-h-[420px]' : 'min-h-[220px]'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 24px)' }} />

      <button
        type="button"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/20 text-yellow-200 shadow-[0_0_30px_rgba(250,204,21,0.35)] transition group-hover:scale-110"
        aria-label={`Play ${title}`}
      >
        <FaPlay className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">Highlight</p>
        <h3 className="mt-2 font-display text-2xl font-black uppercase text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{text}</p>
      </div>
    </motion.article>
  );
}

export default function Highlights() {
  const [featured, ...rest] = highlightCards;

  return (
    <section id="highlights" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Highlights"
          title="Podcast Highlights"
          description="Featured race reactions, driver battles, predictions, and the best podcast moments."
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <VideoCard {...featured} large />
          </Reveal>

          <div className="grid gap-5">
            {rest.slice(0, 3).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <VideoCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
