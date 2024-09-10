import { useParams } from "next/navigation";
import { useActivity } from "../useActivity";
import { CollectionProps } from "@/src/components/compounds/Activities/Collection/Collection";
import { hasDatePassed } from "@/src/utils/date";

export const useActivitiesProps = () => {
  const router = useParams();

  const { data } = useActivity.ListAll(router.id as string);

  const activities: CollectionProps[] =
    data?.map((item) => {
      return {
        date: new Date(item.dateDay),
        activities: item.activities.map((activity) => {
          return {
            date: new Date(activity.date),
            label: activity.title,
            checked: hasDatePassed(activity.date),
          };
        }),
      };
    }) || [];

  return activities;
};
