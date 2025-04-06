import { type ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import Image from 'next/image';

type Timezones = {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
};

export const columns: ColumnDef<Timezones>[] = [
  {
    accessorKey: 'countryCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO2" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <span className="font-['Share_Tech_Mono'] text-sm tracking-wider">
            {row.original.countryCode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'countryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6 overflow-hidden rounded shadow-[0_0_3px_rgba(0,0,0,0.2)]">
            <Image
              src={`/flags/4x3/${row.original.countryCode.toLowerCase()}.svg`}
              alt={row.original.countryName}
              className="object-cover"
              fill
            />
          </div>
          <span className="font-medium">{row.original.countryName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'zoneName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timezone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-['Share_Tech_Mono'] text-sky-400">
          {row.original.zoneName}
        </div>
      );
    },
  },
  {
    accessorKey: 'gmtOffset',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GMT Offset" />
    ),
    cell: ({ row }) => {
      const offset = row.original.gmtOffset;
      const hours = Math.floor(offset / 3600);
      const minutes = Math.floor((offset % 3600) / 60);
      const sign = offset < 0 ? '-' : '+';

      const isPositive = offset >= 0;
      const colorClass = isPositive ? 'text-emerald-400' : 'text-rose-400';

      return (
        <div
          className={`flex items-center gap-1 font-['Share_Tech_Mono'] font-medium ${colorClass} tracking-wider`}
        >
          {sign}
          {String(Math.abs(hours)).padStart(2, '0')}:
          {String(Math.abs(minutes)).padStart(2, '0')}
        </div>
      );
    },
    sortingFn: 'basic',
    sortDescFirst: true,
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Time" />
    ),
    cell: ({ row }) => {
      return <TimestampCell gmtOffset={row.original.gmtOffset} />;
    },
    enableSorting: false,
  },
];

import { useState, useEffect } from 'react';

function TimestampCell({ gmtOffset }: { gmtOffset: number }) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const utcNow = currentTime.getTime();
  const localTimezoneOffsetMinutes = currentTime.getTimezoneOffset();
  const localTimezoneOffsetMs = -localTimezoneOffsetMinutes * 60 * 1000;
  const rowTimezoneOffsetMs = gmtOffset * 1000;

  const adjustedTimestamp =
    utcNow - localTimezoneOffsetMs + rowTimezoneOffsetMs;
  const date = new Date(adjustedTimestamp);

  return (
    <div className="font-['Share_Tech_Mono'] tracking-wider">
      <span className="text-sky-500">
        {date.toLocaleTimeString('en-US', { hour12: false })}
      </span>
      <span className="text-gray-400 text-xs ml-2">
        {date.toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })}
      </span>
    </div>
  );
}
