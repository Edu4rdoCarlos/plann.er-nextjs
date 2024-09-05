import { useParams } from "next/navigation";
import { useTrip } from "../useTrip";
import { useActivity } from "../useActivity";

export const useActivitiesProps = () => {
  const router = useParams();

  const { data } = useActivity.FindOne(router.id as string);
  console.log(data);

  return {
    items: [],
  };
};
