import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import FanZone from './components/FanZone';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Journey from './components/Journey';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import Standing from './components/Standing';
import Stats from './components/Stats';
import Teams from './components/Teams';
import Tracks from './components/Tracks';
import BackgroundEffects from './components/ui/BackgroundEffects';
import { navItems } from './data/content';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

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
      <BackgroundEffects />
      <Navbar activeSection={activeSection} />

      <main>
        <Hero />
        <About />
        <Journey />
        <Stats />
        <Schedule />
        <Tracks />
        <Teams />
        <Standing />
        <Highlights />
        <Gallery />
        <FanZone />
        <Contact />
      </main>

      <Footer />
    </motion.div>
  );
}
