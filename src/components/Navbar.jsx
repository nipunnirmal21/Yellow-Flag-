import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BRAND, navItems } from '../data/content';

export default function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="group flex items-center gap-3 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/30 bg-yellow-400/10 font-display text-sm font-black text-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.2)]">
            YF
          </span>
          <span>
            <span className="block font-display text-lg font-black uppercase tracking-[0.18em] text-white transition group-hover:text-yellow-300">
              {BRAND.name}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-zinc-400">Sinhala F1 Podcast</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${
                activeSection === item.id
                  ? 'bg-yellow-400/15 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.15)]'
                  : 'text-zinc-300 hover:text-yellow-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-xl border border-white/10 p-3 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-black/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.18em] ${
                    activeSection === item.id ? 'bg-yellow-400/15 text-yellow-300' : 'text-zinc-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
