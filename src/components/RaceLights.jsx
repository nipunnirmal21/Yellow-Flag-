import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LIGHT_INTERVAL_MS = 420;
const HOLD_MS = 950;
const LIGHTS_OUT_HOLD_MS = 750;

export default function RaceLights({ onComplete }) {
  const [litCount, setLitCount] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const timers = [];

    for (let i = 1; i <= 5; i += 1) {
      timers.push(setTimeout(() => setLitCount(i), i * LIGHT_INTERVAL_MS));
    }

    const outAt = 5 * LIGHT_INTERVAL_MS + HOLD_MS;
    timers.push(setTimeout(() => setLightsOut(true), outAt));
    timers.push(setTimeout(() => onComplete?.(), outAt + LIGHTS_OUT_HOLD_MS));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#050505]"
      exit={{ y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      onClick={() => onComplete?.()}
      role="presentation"
      aria-hidden="true"
    >
      <div className="flex gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-6 py-5 shadow-[0_0_60px_rgba(0,0,0,0.8)] md:gap-5 md:px-9 md:py-7">
        {[1, 2, 3, 4, 5].map((column) => {
          const on = !lightsOut && litCount >= column;
          return (
            <div
              key={column}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black p-2 md:gap-4 md:p-3"
            >
              {[0, 1].map((row) => (
                <span
                  key={row}
                  className="h-8 w-8 rounded-full transition-all duration-150 md:h-12 md:w-12"
                  style={{
                    background: on ? '#ef1a1a' : '#1c1c1c',
                    boxShadow: on
                      ? '0 0 24px rgba(239,26,26,0.9), 0 0 60px rgba(239,26,26,0.45), inset 0 0 8px rgba(255,120,120,0.9)'
                      : 'inset 0 2px 6px rgba(0,0,0,0.9)',
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className="mt-10 h-8 md:mt-12">
        {lightsOut && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="font-display text-2xl font-black uppercase italic tracking-[0.3em] text-yellow-300 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)] md:text-3xl"
          >
            Lights Out!
          </motion.p>
        )}
      </div>

      <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.35em] text-zinc-600">
        Tap to skip
      </p>
    </motion.div>
  );
}
