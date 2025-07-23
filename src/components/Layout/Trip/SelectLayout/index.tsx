"use client";

import { EditTripForm } from "@/src/components/compounds/TripDetails/EditTripForm";
import { TripDetailsHeader } from "@/src/components/compounds/TripDetails/TripDetailsHeader";
import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { useTrip } from "@/src/hooks/useTrip";
import { Settings2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const SelectLayout = () => {
  const params = useParams();
  const tripId = params.id as string;
  const { data: trip, isLoading } = useTrip.FindOne(tripId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || !trip) {
    return (
      <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
        <p className="text-zinc-400">
          {isLoading ? "Carregando detalhes da viagem..." : "Não foi possível carregar os dados da viagem."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-4 items-center gap-4">
        <div className="col-span-3 flex h-16 items-center rounded-xl bg-zinc-900 px-6 shadow-shape">
          <TripDetailsHeader
            destination={`${trip.city}, ${trip.country}`}
            startDate={new Date(trip.startDate)}
            endDate={new Date(trip.endDate)}
          />
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          variants="default"
        >
          Editar Viagem
          <Settings2 className="size-5" />
        </Button>
      </div>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Header
          title="Editar viagem"
          subtitle="Altere o destino e as datas da sua viagem."
        />
        <Dialog.Content>
          <EditTripForm trip={trip} onSuccess={() => setIsModalOpen(false)} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};