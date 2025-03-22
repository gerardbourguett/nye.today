import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";

type Timezones = {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
};

export const columns: ColumnDef<Timezones>[] = [
  {
    accessorKey: "countryCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISO2" />
    ),
  },
  {
    accessorKey: "countryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={`/flags/4x3/${row.original.countryCode.toLowerCase()}.svg`}
            alt={row.original.countryName}
            className="w-6 h-6"
          />{" "}
          {row.original.countryName}
        </div>
      );
    },
  },
  {
    accessorKey: "zoneName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timezone" />
    ),
  },
  {
    accessorKey: "gmtOffset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GMT Offset" />
    ),
    cell: ({ row }) => {
      const offset = row.original.gmtOffset;
      const hours = Math.floor(offset / 3600);
      const minutes = Math.floor((offset % 3600) / 60);
      const sign = offset < 0 ? "-" : "+";
      return (
        <div className="flex items-center gap-2">
          {sign}
          {Math.abs(hours)}:{Math.abs(minutes) ? Math.abs(minutes) : "00"}
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => {
      // Obtener la hora actual
      const now = new Date();

      // Calcular el timestamp UTC actual en milisegundos
      const utcNow = now.getTime();

      // Obtener el offset de la zona horaria del navegador en minutos
      const localTimezoneOffsetMinutes = now.getTimezoneOffset();

      // Convertir el offset a milisegundos (negativo porque getTimezoneOffset() devuelve el inverso)
      const localTimezoneOffsetMs = -localTimezoneOffsetMinutes * 60 * 1000;

      // Obtener el offset de la zona horaria de la fila en milisegundos
      const rowTimezoneOffsetMs = row.original.gmtOffset * 1000;

      // Calcular el timestamp ajustado:
      // 1. Empezamos con la hora UTC actual
      // 2. Eliminamos el offset local para obtener la verdadera UTC
      // 3. Aplicamos el offset de la zona horaria de la fila
      const adjustedTimestamp =
        utcNow - localTimezoneOffsetMs + rowTimezoneOffsetMs;

      // Crear un objeto Date con el timestamp ajustado
      const date = new Date(adjustedTimestamp);

      // Opciones para formatear la fecha
      const options: Intl.DateTimeFormatOptions = {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      // Formatear y devolver la fecha
      return date.toLocaleString("es-CL", options);
    },
  },
];
