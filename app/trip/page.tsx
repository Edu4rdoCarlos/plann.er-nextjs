"use client";

import { useTrip } from "@/src/hooks/useTrip";
import { format } from "date-fns";

export default function TripPage() {
  const { data: trips } = useTrip.ListAll();

  return (
    <div className="flex flex-col" style={{ gap: 25 }}>
      <div className="flex justify-between md:items-center relative z-10 flex-col md:flex-row gap-4">
        <h1 style={{ fontSize: 36 }} className="font-semibold">
          Viagens
        </h1>
      </div>
      
      {trips && trips.length > 0 ? (
        <ul className="space-y-6">
          {trips.map((trip, idx) => (
            <li key={idx} className="border p-4 rounded-md">
              <p><strong>Cidade:</strong> {trip.city}</p>
              <p><strong>País:</strong> {trip.country}</p>
              <p><strong>Proprietário:</strong> {trip.owner.name}</p>
              <p><strong>Início:</strong> {format(new Date(trip.startDate), "dd/MM/yyyy")}</p>
              <p><strong>Término:</strong> {format(new Date(trip.endDate), "dd/MM/yyyy")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-zinc-400">Nenhuma viagem cadastrada</div>
      )}
    </div>
  );
};
