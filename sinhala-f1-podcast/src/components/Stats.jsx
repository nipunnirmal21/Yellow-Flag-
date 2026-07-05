import { motion } from 'framer-motion';
import { FaFlagCheckered, FaMicrophone, FaUsers, FaYoutube } from 'react-icons/fa6';
import { stats } from '../data/content';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import StatCounter from './ui/StatCounter';

const iconMap = {
  mic: FaMicrophone,
  flag: FaFlagCheckered,
  topics: FaFlagCheckered,
  users: FaUsers,
  youtube: FaYoutube,
  season: FaFlagCheckered,
};

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Stats"
          title="Race Dashboard"
          description="Telemetry-style numbers from the Yellow Flag podcast journey."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon] || FaFlagCheckered;
            return (
              <Reveal key={stat.label} delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -6, boxShadow: '0 0 40px rgba(250,204,21,0.18)' }}
                  className="relative overflow-hidden rounded-[1.75rem] border border-yellow-400/15 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Live Data</span>
                    <Icon className="h-5 w-5 text-yellow-300" />
                  </div>
                  <p className="font-display text-4xl font-black text-white md:text-5xl">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">{stat.label}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
