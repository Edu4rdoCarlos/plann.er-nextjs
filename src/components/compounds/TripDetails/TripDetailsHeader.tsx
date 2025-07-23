"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, MapPin } from "lucide-react";

interface TripDetailsHeaderProps {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
}

const formatDateRange = (start: Date | null, end: Date | null): string => {
  if (!start || !end) return "Data não definida";
  if (format(start, 'yyyy-MM') === format(end, 'yyyy-MM')) {
    return `${format(start, "d")} a ${format(end, "d 'de' MMM 'de' yyyy", { locale: ptBR })}`;
  }
  if (format(start, 'yyyy') === format(end, 'yyyy')) {
    return `${format(start, "d 'de' MMM", { locale: ptBR })} a ${format(end, "d 'de' MMM 'de' yyyy", { locale: ptBR })}`;
  }
  return `${format(start, "d 'de' MMM 'de' yyyy", { locale: ptBR })} a ${format(end, "d 'de' MMM 'de' yyyy", { locale: ptBR })}`;
};

export const TripDetailsHeader = (props: TripDetailsHeaderProps) => {
  const { destination, startDate, endDate } = props;
  const displayedDate = formatDateRange(startDate, endDate);

  return (
    <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="truncate text-lg text-zinc-100">{destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">{displayedDate}</span>
        </div>
      </div>
    </div>
  );
};