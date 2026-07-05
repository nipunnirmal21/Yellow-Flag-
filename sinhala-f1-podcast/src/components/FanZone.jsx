import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa6';
import { socialLinks } from '../data/content';
import { SocialIcon } from './ui/BackgroundEffects';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function FanZone() {
  return (
    <section id="fan-zone" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Fan Zone"
          title="Join The Grid"
          description="Join the Yellow Flag community and enjoy Formula 1 in Sinhala with fans who love racing as much as you do."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-yellow-400/15 bg-gradient-to-br from-yellow-400/10 via-white/[0.03] to-transparent p-8 backdrop-blur-xl">
              <div className="mb-8 flex flex-wrap gap-4">
                <GlowButton href="#contact">Join Community</GlowButton>
                <GlowButton href="#" variant="youtube">
                  <FaYoutube className="h-4 w-4" />
                  Subscribe on YouTube
                </GlowButton>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-yellow-400/30"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-300">
                      <SocialIcon id={social.id} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.22em] text-zinc-400">Follow</span>
                      <span className="block font-display text-lg font-bold text-white">{social.label}</span>
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <h3 className="font-display text-2xl font-black uppercase text-white">Newsletter Pit Stop</h3>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                Get race weekend updates, new episode alerts, and fan discussion prompts straight to your inbox.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400/40"
                />
                <GlowButton type="submit" className="w-full">
                  Join Fan Discussion
                </GlowButton>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
