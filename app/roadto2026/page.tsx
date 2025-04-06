import { CURRENT_YEAR } from '@/data/constants';
import React from 'react';
import '@fontsource/share-tech-mono';
import RoadTo2026 from '@/components/road-to-2026/road-to-2026';


export default function page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-7xl sm:text-8xl font-medium flex items-center justify-center gap-4">
            <span className="font-['Share_Tech_Mono'] [text-shadow:0_0_10px_rgba(59,130,246,0.3)]">
              #{CURRENT_YEAR + 1}
            </span>
            <span className="text-sky-500 font-['Share_Tech_Mono'] [text-shadow:0_0_15px_rgba(14,165,233,0.4)]">
              Live
            </span>
          </h1>
        </header>
        <RoadTo2026 />
      </div>
    </main>
  );
}
