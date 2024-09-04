import { ActivitiesLayout } from "@/src/components/Layout/Trip/ActivitiesLayout";
import { InfoLayout } from "@/src/components/Layout/Trip/InfoLayout";
import { SelectLayout } from "@/src/components/Layout/Trip/SelectLayout";

export default function TripPage() {
  return (
  <div className="w-full flex flex-col gap-10">
    <SelectLayout  />
    <div className="grid grid-cols-2 gap-5">
      <ActivitiesLayout />
      <InfoLayout />
    </div>
  </div>)

}