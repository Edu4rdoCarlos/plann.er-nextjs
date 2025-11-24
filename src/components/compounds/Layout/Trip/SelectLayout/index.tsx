"use client";

import { EditTripForm } from "@/src/components/compounds/TripDetails/EditTripForm";
import { TripDetailsHeader } from "@/src/components/compounds/TripDetails/TripDetailsHeader";
import { Button } from "@/src/components/primitives/Button/Button";
import { Dialog } from "@/src/components/primitives/Dialog/Dialog";
import { useTrip } from "@/src/hooks/useTrip";
import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";

export const SelectLayout = () => {
  const params = useParams();
  const tripId = params.id as string;
  const { data: trip, isLoading } = useTrip.FindOne(tripId);
  const t = useTranslations("tripDetails");

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || !trip) {
    return (
      <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
        <p className="text-zinc-400">
          {isLoading ? t("loadingTrip") : t("errorLoadingTrip")}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 lg:items-center">
        <div className="col-span-1 rounded-xl bg-zinc-900 px-6 py-4 shadow-shape lg:col-span-3 
        lg:h-16 lg:py-0 lg:flex lg:items-center">
          <TripDetailsHeader
            destination={`${trip.city}, ${trip.country}`}
            startDate={new Date(trip.startDate)}
            endDate={new Date(trip.endDate)}
          />
        </div>
        <Button onClick={() => setIsModalOpen(true)} variants="default">
          {t("editTrip")}
          <Settings2 className="size-5" />
        </Button>
      </div>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Header
          title={t("editTripTitle")}
          subtitle={t("editTripSubtitle")}
        />
        <Dialog.Content>
          <EditTripForm trip={trip} onSuccess={() => setIsModalOpen(false)} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};