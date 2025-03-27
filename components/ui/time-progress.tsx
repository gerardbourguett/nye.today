'use client';
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import NumberFlow, { continuous } from '@number-flow/react';
import ShareButtons from './share-buttons';
import { Sailboat } from 'lucide-react';

interface TimeProgressProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export default function TimeProgress({
  theme = 'dark',
  className,
}: TimeProgressProps) {
  const [progress, setProgress] = useState(0);

  const calculateProgressPercentage = () => {
    const dateStart = new Date('2025-01-01T00:00:00');
    const dateEnd = new Date('2026-01-01T00:00:00');
    const dateNow = new Date();
    const totalDuration = dateEnd.getTime() - dateStart.getTime();
    const elapsedTime = dateNow.getTime() - dateStart.getTime();
    const percentage = Math.max(
      0,
      Math.min(100, (elapsedTime / totalDuration) * 100),
    );
    setProgress(percentage);
  };

  useEffect(() => {
    calculateProgressPercentage();
    const timer = setInterval(() => {
      calculateProgressPercentage();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center w-full space-y-3',
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between w-full max-w-md mb-1">
        <span className={cn('text-xs font-medium')}>2025</span>
        <span className={cn('text-xs font-medium')}>2026</span>
      </div>

      <div className="w-full max-w-md relative">
        <Progress
          value={progress}
          className={cn(
            'h-3 w-full bg-opacity-20 rounded-md',
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200',
          )}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: `${progress}%`,
          }}
          animate={{
            x: [0, 5, 0],
            y: [0, -2, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sailboat
            className={cn(
              'w-6 h-6',
              theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600',
            )}
          />
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className={cn('text-sm italic')}>
          The Spanish galleon has traveled{' '}
          <span className={cn('text-sm font-bold')}>
            <NumberFlow
              value={progress}
              format={{
                minimumFractionDigits: 5,
                maximumFractionDigits: 5,
              }}
              plugins={[continuous]}
              willChange={true}
              suffix="%"
              className="tabular-nums"
            />
          </span>{' '}
          of the way to the port
        </span>
      </motion.div>
      <motion.div
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <ShareButtons value={progress.toFixed(5)} />
      </motion.div>
    </motion.div>
  );
}
