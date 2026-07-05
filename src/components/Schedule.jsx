import { motion } from 'framer-motion';
import { FaMapLocationDot } from 'react-icons/fa6';
import { f1Schedule2026, scheduleIntro, statusLabels } from '../data/schedule';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const statusStyles = {
  completed: {
    badge: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300',
    card: 'border-white/10 hover:border-yellow-400/25 hover:shadow-[0_0_32px_rgba(250,204,21,0.12)]',
  },
  upcoming: {
    badge: 'border-white/20 bg-white/5 text-zinc-200',
    card: 'border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.15)]',
  },
  next: {
    badge: 'border-yellow-400/50 bg-yellow-400/15 text-yellow-200 shadow-[0_0_20px_rgba(250,204,21,0.25)]',
    card: 'border-yellow-400/40 bg-yellow-400/[0.04] shadow-[0_0_48px_rgba(250,204,21,0.22)] hover:border-yellow-300/60 hover:shadow-[0_0_60px_rgba(250,204,21,0.35)]',
  },
};

function viewTrackHref(trackSlug) {
  if (!trackSlug) return '#tracks';
  return `#track-${trackSlug}`;
}

export default function Schedule() {
  return (
    <section id="schedule" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Schedule"
          title="2026 F1 Schedule"
          description={scheduleIntro}
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {f1Schedule2026.map((race, index) => {
            const styles = statusStyles[race.status] || statusStyles.upcoming;
            const isNext = race.status === 'next';

            return (
              <Reveal key={race.round} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  className={`relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] p-6 backdrop-blur-xl transition ${styles.card}`}
                >
                  {isNext && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  )}

                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-yellow-300">
                        Round {String(race.round).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-black uppercase leading-tight text-white md:text-2xl">
                        {race.grandPrix}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">{race.country}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${styles.badge}`}
                    >
                      {statusLabels[race.status]}
                    </span>
                  </div>

                  <dl className="space-y-3 border-t border-white/10 pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Date</dt>
                      <dd className="text-right font-semibold text-zinc-200">{race.date}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Track</dt>
                      <dd className="text-right font-semibold text-zinc-200">{race.circuit}</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <GlowButton
                      href={viewTrackHref(race.trackSlug)}
                      variant={isNext ? 'primary' : 'secondary'}
                      className="w-full px-5 py-3 text-[11px]"
                    >
                      <FaMapLocationDot className="h-3.5 w-3.5" />
                      View Track
                    </GlowButton>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
