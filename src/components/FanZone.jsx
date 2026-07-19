import { FaYoutube } from 'react-icons/fa6';
import { socialLinks } from '../data/content';
import { CHANNEL } from '../data/episodes';
import { SocialIcon } from './ui/BackgroundEffects';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import SectionAtmosphere from './ui/SectionAtmosphere';

export default function FanZone() {
  return (
    <section id="fan-zone" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="silver" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Fan Zone"
          title="Join The Grid"
          description="Join the Yellow Flag community and enjoy Formula 1 in Sinhala with fans who love racing as much as you do."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-xl border border-white/10 bg-panel p-8">
              <div className="mb-8 flex flex-wrap gap-4">
                <GlowButton href="#contact">Join Community</GlowButton>
                <GlowButton
                  href={CHANNEL.subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="youtube"
                >
                  <FaYoutube className="h-4 w-4" />
                  Subscribe on YouTube
                </GlowButton>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-panel-2 p-4 transition duration-150 hover:border-flag/50"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-black/40 text-flag">
                      <SocialIcon id={social.id} />
                    </span>
                    <span>
                      <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-steel">
                        Follow
                      </span>
                      <span className="block font-display text-lg font-black uppercase text-chequer">
                        {social.label}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-xl border border-white/10 bg-panel p-8">
              <h3 className="font-display text-2xl font-black uppercase text-chequer">Newsletter Pit Stop</h3>
              <p className="mt-3 text-base leading-7 text-steel">
                Get race weekend updates, new episode alerts, and fan discussion prompts straight to your inbox.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-steel">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-lg border border-white/10 bg-panel-2 px-4 py-4 text-chequer outline-none transition placeholder:text-zinc-600 focus:border-flag/50"
                  />
                </label>
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
