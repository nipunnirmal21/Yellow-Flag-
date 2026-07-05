import { motion } from 'framer-motion';
import { galleryItems } from '../data/content';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual Pit Lane"
          description="Podcast thumbnails, F1-inspired visuals, and behind-the-scenes moments."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07} className={item.wide ? 'md:col-span-2' : ''}>
              <motion.figure
                whileHover={{ scale: 1.02 }}
                className="group relative h-64 overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900 md:h-72"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_55%),linear-gradient(135deg,#111,#050505)] transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">{item.subtitle}</p>
                  <figcaption className="mt-2 font-display text-2xl font-black uppercase text-white">{item.title}</figcaption>
                </div>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
