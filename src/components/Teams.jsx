import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { f1Teams, teamsIntro } from '../data/teams';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

/**
 * Add team images to src/assets/teams/ and import them here.
 * Example: import mclarenImg from '../assets/teams/mclaren.jpg';
 */
const teamImages = {};

function getTeamImage(slug) {
  return teamImages[slug] ?? null;
}

function TeamImagePlaceholder({ name, color }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="flex h-full min-h-[140px] flex-col items-center justify-center bg-[linear-gradient(135deg,#111,#050505)]"
      style={{ boxShadow: `inset 0 0 60px ${color}22` }}
    >
      <div
        className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border font-display text-lg font-black text-white"
        style={{ borderColor: `${color}66`, backgroundColor: `${color}18` }}
      >
        {initials}
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-300/80">Team Image</p>
      <p className="mt-1 text-sm font-semibold text-zinc-400">Coming Soon</p>
    </div>
  );
}

const cardStyles = {
  champion: {
    card: 'border-yellow-400/45 bg-yellow-400/[0.05] shadow-[0_0_52px_rgba(250,204,21,0.22)] hover:border-yellow-300/60 hover:shadow-[0_0_64px_rgba(250,204,21,0.35)]',
    standing: 'border-yellow-400/50 bg-yellow-400/15 text-yellow-200',
  },
  active: {
    card: 'border-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_36px_rgba(250,204,21,0.15)]',
    standing: 'border-white/15 bg-white/5 text-zinc-200',
  },
  new: {
    card: 'border-dashed border-yellow-400/35 bg-gradient-to-br from-yellow-400/[0.06] via-white/[0.02] to-transparent hover:border-yellow-300/50 hover:shadow-[0_0_44px_rgba(250,204,21,0.2)]',
    standing: 'border-yellow-400/40 bg-yellow-400/10 text-yellow-200',
  },
};

function TeamCard({ team, index }) {
  const styles = cardStyles[team.status] || cardStyles.active;
  const imageSrc = getTeamImage(team.image);
  const isChampion = team.status === 'champion';
  const isNew = team.status === 'new';

  return (
    <Reveal delay={index * 0.06}>
      <motion.article
        id={`team-${team.slug}`}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative overflow-hidden rounded-[1.75rem] border bg-white/[0.03] backdrop-blur-xl transition ${styles.card}`}
        style={{ borderLeftWidth: '4px', borderLeftColor: team.color }}
      >
        {isChampion && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        )}

        <div className="relative overflow-hidden">
          {imageSrc ? (
            <div className="relative h-36 overflow-hidden">
              <motion.img
                src={imageSrc}
                alt={`${team.name} team`}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          ) : (
            <TeamImagePlaceholder name={team.name} color={team.color} />
          )}

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-black text-white shadow-lg"
              style={{ backgroundColor: `${team.color}CC` }}
            >
              {String(team.position).padStart(2, '0')}
            </span>
            {isNew && (
              <span className="rounded-full border border-yellow-400/40 bg-yellow-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-200">
                New Team
              </span>
            )}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-black uppercase text-white md:text-2xl">{team.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: team.color }}>
                {team.standing}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${styles.standing}`}>
                {team.statusLabel}
              </span>
              <span className="font-display text-lg font-bold text-white">{team.pointsLabel}</span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-zinc-300">{team.description}</p>

          <div className="mt-5">
            <GlowButton
              href={`#team-${team.slug}`}
              variant={isChampion || isNew ? 'primary' : 'secondary'}
              className="w-full px-5 py-3 text-[11px]"
            >
              View Team
              <FaArrowRight className="h-3.5 w-3.5" />
            </GlowButton>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Teams() {
  return (
    <section id="teams" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.05),transparent_35%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(250,204,21,0.5) 40px, rgba(250,204,21,0.5) 41px)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Teams" title="F1 Teams" description={teamsIntro} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {f1Teams.map((team, index) => (
            <TeamCard key={team.slug} team={team} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
