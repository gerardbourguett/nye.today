'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import NumberFlow, { Format } from '@number-flow/react';
import '@fontsource/share-tech-mono';

export default function CountdownTimer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { value: days, label: 'Days', formatDigits: 3 },
    { value: hours, label: 'Hours', formatDigits: 2 },
    { value: minutes, label: 'Minutes', formatDigits: 2 },
    { value: seconds, label: 'Seconds', formatDigits: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 font-['Share_Tech_Mono'] tracking-wider">
        Countdown to 2026
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
            className="h-full flex"
          >
            <Card className="w-full flex flex-col bg-gradient-to-br from-gray-900/70 to-black/80 backdrop-blur-md border border-white/10 shadow-lg hover:border-blue-400/50 transition-colors duration-300 rounded-lg overflow-hidden">
              <CardContent className="flex-grow flex flex-col items-center justify-center p-4 md:p-6">
                <NumberFlow
                  value={unit.value}
                  className="text-5xl sm:text-6xl font-['Share_Tech_Mono'] font-bold text-sky-300 tracking-wider [text-shadow:0_0_10px_rgba(59,130,246,0.4)]"
                  format={`0${unit.formatDigits}` as Format}
                />
                <span className="text-xs text-gray-400 mt-3 uppercase tracking-wider font-['Share_Tech_Mono']">
                  {unit.label}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
