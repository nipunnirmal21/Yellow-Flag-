import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import Drivers from './components/Drivers';
import Episodes from './components/episodes/Episodes';
import F1AssistantWidget from './components/F1AssistantWidget';
import Footer from './components/Footer';
import Game from './components/Game';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import Standing from './components/Standing';
import Teams from './components/Teams';
import Tracks from './components/Tracks';
import BackgroundEffects from './components/ui/BackgroundEffects';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { navItems } from './data/content';

function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const sections = navItems
      .filter((item) => !item.path)
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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <Episodes />
        <About />
        <Journey />
        <Schedule />
        <Tracks />
        <Teams />
        <Standing />
        <Game />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function DriversPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, []);

  return (
    <>
      <Navbar activeSection="drivers" />
      <main>
        <Drivers />
      </main>
      <Footer />
    </>
  );
}

function AppShell() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-x-hidden text-white"
    >
      <BackgroundEffects />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <F1AssistantWidget />
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
