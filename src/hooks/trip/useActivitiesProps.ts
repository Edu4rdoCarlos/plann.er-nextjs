import { CollectionProps } from "@/src/components/compounds/Activities/Collection/Collection";
import {
  activitiesMock1,
  activitiesMock2,
  activitiesMock3,
} from "@/src/components/compounds/Activities/Collection/mock";

export const useActivitiesProps = () => {
  const currentDate = new Date();
  const oneDaysAgo = new Date(currentDate);
  oneDaysAgo.setDate(currentDate.getDate() - 1);
  const twoDaysAgo = new Date(currentDate);
  twoDaysAgo.setDate(currentDate.getDate() - 2);

  const items: CollectionProps[] = [
    { date: twoDaysAgo, activities: activitiesMock1 },
    { date: oneDaysAgo, activities: activitiesMock2 },
    { date: currentDate, activities: activitiesMock3 },
  ];

  return {
    items,
  };
};
