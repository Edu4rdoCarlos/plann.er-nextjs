"use client";

import { ActivitiesLayout } from "@/src/components/Layout/Trip/ActivitiesLayout";
import { InfoLayout } from "@/src/components/Layout/Trip/InfoLayout";
import { SelectLayout } from "@/src/components/Layout/Trip/SelectLayout";
import { useRouter } from "next/navigation";

export default function TripPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-14 mb-24">
      <SelectLayout onContinueEdit={() => router.push("/")} />
      <div className="flex w-full gap-14 md:flex-row flex-col items-center md:items-start">
        <div className="md:w-[70%] w-full">
          <ActivitiesLayout />
        </div>
        <div className="md:w-[30%] w-full">
          <InfoLayout />
        </div>
      </div>
    </div>
  );
}
