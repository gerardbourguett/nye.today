'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import timezones from '@/data/timezones.json';
import Image from 'next/image';
import '@fontsource/share-tech-mono';

export interface Timezone {
  id: number;
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
}

interface GroupedTimezones {
  offset: number;
  formattedOffset: string;
  timezones: Timezone[];
}

export default function RoadTo2026() {
  const [groupedData, setGroupedData] = useState<GroupedTimezones[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const grouped: { [key: number]: Timezone[] } = {};

    const sortedTimezones = [...(timezones as Timezone[])].sort(
      (a, b) => b.gmtOffset - a.gmtOffset,
    );

    sortedTimezones.forEach((timezone) => {
      if (!grouped[timezone.gmtOffset]) {
        grouped[timezone.gmtOffset] = [];
      }
      grouped[timezone.gmtOffset].push(timezone);
    });

    const groupedArray: GroupedTimezones[] = Object.entries(grouped).map(
      ([offsetStr, zones]) => {
        const offset = parseInt(offsetStr, 10);
        const totalSeconds = Math.abs(offset);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const sign = offset < 0 ? '-' : '+';
        const formattedOffset = `GMT ${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        return {
          offset,
          formattedOffset,
          timezones: zones,
        };
      },
    );

    groupedArray.sort((a, b) => b.offset - a.offset);
    setGroupedData(groupedArray);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateLocalTime = (gmtOffsetSeconds: number): Date => {
    const now = currentTime;
    const localOffsetMs = now.getTimezoneOffset() * 60 * 1000;
    const utcMs = now.getTime() + localOffsetMs;
    const targetOffsetMs = gmtOffsetSeconds * 1000;
    const targetTimeMs = utcMs + targetOffsetMs;
    return new Date(targetTimeMs);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // --- CAMBIO PRINCIPAL AQUÍ ---
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" // Añadido max-w, mx-auto y padding
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 font-['Share_Tech_Mono'] tracking-wider">
        Global Countdown Timezones
      </h2>

      <div className="space-y-12">
        {' '}
        {/* Espacio entre grupos */}
        {groupedData.map((group) => {
          const isPositive = group.offset >= 0;
          const colorClass = isPositive ? 'text-emerald-400' : 'text-rose-400';

          return (
            <div key={group.offset} className="space-y-6">
              {' '}
              {/* Espacio dentro de un grupo */}
              {/* Encabezado del grupo (Sticky opcional) */}
              <div className="flex items-center gap-4 sticky top-0 bg-background/95 backdrop-blur-sm py-3 z-10">
                {' '}
                {/* Fondo con blur */}
                <Separator className="flex-grow bg-gray-700/50" />
                <h3
                  className={`font-['Share_Tech_Mono'] font-semibold ${colorClass} text-lg md:text-xl whitespace-nowrap [text-shadow:0_0_8px_rgba(59,130,246,0.2)]`}
                >
                  {group.formattedOffset}
                </h3>
                <Separator className="flex-grow bg-gray-700/50" />
              </div>
              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.timezones.map((item: Timezone, index) => {
                  const localTime = calculateLocalTime(item.gmtOffset);

                  return (
                    <motion.div
                      // Usar ID si existe, sino una combinación como fallback
                      key={item.id ?? `${item.zoneName}-${item.countryCode}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.04, // Delay escalonado más rápido
                        ease: 'easeOut',
                      }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="h-full flex" // Asegura que flex funcione para altura completa
                    >
                      {/* Card Styling */}
                      <Card className="w-full flex flex-col bg-gradient-to-br from-gray-900/70 to-black/80 backdrop-blur-md border border-white/10 shadow-lg hover:border-blue-400/50 transition-colors duration-300 rounded-lg overflow-hidden">
                        {' '}
                        {/* Añadido rounded y overflow */}
                        <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
                          {' '}
                          {/* Ajustado padding */}
                          <div className="relative h-8 w-12 flex-shrink-0 overflow-hidden rounded-sm shadow-md">
                            <Image
                              src={`/flags/4x3/${item.countryCode.toLowerCase()}.svg`}
                              alt={item.countryName}
                              className="object-cover"
                              fill
                              sizes="(max-width: 640px) 15vw, (max-width: 1024px) 10vw, 8vw" // Tamaños optimizados
                              // Quita unoptimized si no tienes problemas con SVGs en producción
                              // unoptimized={process.env.NODE_ENV === 'development'}
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            {' '}
                            {/* Añadido min-w-0 para que truncate funcione bien en flex */}
                            <CardTitle
                              className="text-base md:text-lg font-semibold text-gray-100 truncate"
                              title={item.countryName} // Tooltip para nombre completo
                            >
                              {item.countryName}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between p-4 pt-2">
                          {' '}
                          {/* Ajustado padding */}
                          {/* Info Timezone */}
                          <div className="space-y-1 mb-3">
                            <div className="flex justify-between items-center text-xs md:text-sm gap-2">
                              <span className="text-gray-400 flex-shrink-0">
                                Zone:
                              </span>
                              <span
                                className="font-['Share_Tech_Mono'] text-sky-400 text-right truncate"
                                title={item.zoneName} // Tooltip para nombre completo
                              >
                                {item.zoneName.replace(/_/g, ' ')}
                              </span>
                            </div>
                          </div>
                          {/* Hora Actual */}
                          <div className="flex flex-col items-center border-t border-white/15 pt-3 mt-auto">
                            {' '}
                            {/* mt-auto empuja al fondo */}
                            <span className="text-gray-400 text-xs mb-1">
                              Current Time
                            </span>
                            <span className="font-['Share_Tech_Mono'] text-sky-300 text-2xl font-bold tracking-wider [text-shadow:0_0_10px_rgba(59,130,246,0.4)]">
                              {localTime.toLocaleTimeString('en-GB', {
                                // Formato 24h
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,
                              })}
                            </span>
                            <span className="font-['Share_Tech_Mono'] text-gray-500 text-xs">
                              {localTime.toLocaleDateString('en-CA', {
                                // Formato YYYY-MM-DD
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
