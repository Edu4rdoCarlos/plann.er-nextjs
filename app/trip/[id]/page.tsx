"use client";

import { ActivitiesLayout } from "@/src/components/Layout/Trip/ActivitiesLayout";
import { InfoLayout } from "@/src/components/Layout/Trip/InfoLayout";
import { SelectLayout } from "@/src/components/Layout/Trip/SelectLayout";
import { useRouter } from "next/navigation";

export default function TripPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-14">
      <SelectLayout onContinueEdit={() => router.push("/")} />
      <div className="flex w-full gap-14">
        <div className="w-[70%]">
          <ActivitiesLayout />
        </div>
        <div className="w-[30%]">
          <InfoLayout />
        </div>
      </div>
    </div>
  );
}
