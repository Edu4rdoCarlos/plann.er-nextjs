import { ActivitiesLayout } from "@/src/components/Layout/Trip/ActivitiesLayout";
import { InfoLayout } from "@/src/components/Layout/Trip/InfoLayout";
import { SelectLayout } from "@/src/components/Layout/Trip/SelectLayout";

export default function TripPage() {
  return (
  <div className="w-full flex flex-col gap-10">
    <SelectLayout  />
    <div className="flex w-full gap-10">
      <div className="w-[70%]">
        <ActivitiesLayout />
      </div>
      <div className="w-[30%]">
        <InfoLayout />
      </div>
    </div>
  </div>)

}