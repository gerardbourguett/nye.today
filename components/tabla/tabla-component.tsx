'use client';

import React from 'react';
import { motion } from 'motion/react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table/data-table';
//import countries from "@/data/country.json";
import timezones from '@/data/timezones.json';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import '@fontsource/share-tech-mono';

export default function TablaComponent() {
  // Definimos el estado inicial de ordenación
  const initialSortingState = [
    {
      id: 'gmtOffset',
      desc: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className="w-full flex flex-col bg-gradient-to-br from-gray-900/70 to-black/80 backdrop-blur-md border border-white/10 shadow-lg hover:border-blue-400/50 transition-colors duration-300 rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="font-['Share_Tech_Mono'] tracking-wider text-sky-500 flex items-center gap-2">
              <span className="[text-shadow:0_0_5px_rgba(59,130,246,0.3)]">
                Timezones
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={timezones}
              initialState={{
                sorting: initialSortingState,
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
