import { socialLinks } from '../data/content';
import { SocialIcon } from './ui/BackgroundEffects';
import GlowButton from './ui/GlowButton';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import SectionAtmosphere from './ui/SectionAtmosphere';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <SectionAtmosphere variant="ember" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Collaborate With Yellow Flag"
          description="Want to collaborate, sponsor, or invite Yellow Flag for an F1 discussion?"
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form
              className="rounded-xl border border-white/10 bg-panel p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-steel">
                    Name
                  </span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-panel-2 px-4 py-4 text-chequer outline-none transition placeholder:text-zinc-600 focus:border-flag/50"
                  />
                </label>
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
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-steel">
                  Message
                </span>
                <textarea
                  rows={5}
                  placeholder="Tell us about your collaboration idea..."
                  className="w-full rounded-lg border border-white/10 bg-panel-2 px-4 py-4 text-chequer outline-none transition placeholder:text-zinc-600 focus:border-flag/50"
                />
              </label>

              <div className="mt-6">
                <GlowButton type="submit">Send Message</GlowButton>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-panel p-8">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-chequer">Connect On Social</h3>
                <p className="mt-3 text-base leading-7 text-steel">
                  Follow Yellow Flag for race reactions, podcast drops, and community updates across every platform.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-panel-2 px-4 py-4 text-steel transition duration-150 hover:border-flag/50 hover:text-flag"
                  >
                    <SocialIcon id={social.id} />
                    <span className="text-sm font-black uppercase tracking-[0.14em]">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
