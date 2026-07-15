import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import F1AssistantWidget from './components/F1AssistantWidget';
import FanZone from './components/FanZone';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Journey from './components/Journey';
import Navbar from './components/Navbar';
import RaceLights from './components/RaceLights';
import Schedule from './components/Schedule';
import Standing from './components/Standing';
import Teams from './components/Teams';
import Tracks from './components/Tracks';
import BackgroundEffects from './components/ui/BackgroundEffects';
import { navItems } from './data/content';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reducedMotion && !sessionStorage.getItem('yf-lights-seen');
  });

  const finishIntro = useCallback(() => {
    sessionStorage.setItem('yf-lights-seen', '1');
    setShowIntro(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.05 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-x-hidden text-white"
    >
      <AnimatePresence>{showIntro && <RaceLights onComplete={finishIntro} />}</AnimatePresence>

      <BackgroundEffects />
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Journey />
        <Schedule />
        <Tracks />
        <Teams />
        <Standing />
        <Highlights />
        <FanZone />
        <Contact />
      </main>

      <Footer />
      <F1AssistantWidget />
    </motion.div>
  );
}
