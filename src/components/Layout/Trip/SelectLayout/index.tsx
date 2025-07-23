"use client";

import { TripDetailsHeader } from "@/src/components/compounds/TripDetails/TripDetailsHeader";
import { useTrip } from "@/src/hooks/useTrip";
import { useParams } from "next/navigation";

export const SelectLayout = () => {
  const params = useParams();
  const tripId = params.id as string;
  const { data: trip, isLoading } = useTrip.FindOne(tripId);

  if (isLoading) {
    return (
      <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
        <p className="text-red-400">Não foi possível carregar os dados da viagem.</p>
      </div>
    );
  }

  return (
    <TripDetailsHeader
      destination={`${trip.city}, ${trip.country}`}
      startDate={new Date(trip.startDate)} 
      endDate={new Date(trip.endDate)}
    />
  );
};