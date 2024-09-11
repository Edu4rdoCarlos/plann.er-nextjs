"use client";
import { ConfirmTrip } from "@/src/components/compounds/Modal/ConfirmTrip/ConfirmTrip";
import { useConfirmTripProps } from "@/src/hooks/trip/useConfirmTripProps";
import { getRangeDate } from "@/src/utils/date";
import { FormatLocation } from "@/src/utils/location";
import { useState } from "react";

export default function ConfirmationPage() {
  const { data, decodedData } = useConfirmTripProps();
  const [open, setOpen] = useState(true);

  if (!data) return;

  const startDate = data.startDate;
  const endDate = data.endDate;

  const location = FormatLocation({ city: "são paulo", acronym: "al" });
  const rangeDate = getRangeDate({ startDate, endDate });

  return (
    <ConfirmTrip
      date={rangeDate}
      location={location}
      onOpenChange={setOpen}
      open={open}
      tripId={decodedData?.trip || ""}
      email={decodedData?.mail || ""}
    ></ConfirmTrip>
  );
}
