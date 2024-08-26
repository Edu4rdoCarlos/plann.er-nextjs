import { getDay } from "date-fns";
import { Activity, ActivityProps } from "../Activity/Activity";
import { getDayOfWeek } from "@/src/utils/date";
import {
  sActivities,
  sCollectionWrapper,
  sDay,
  sDayOfWeek,
  sEmpty,
  sHeading,
} from "./Collection.variants";

export interface CollectionProps {
  date: Date;
  activities?: ActivityProps[];
  className?: string;
}

export const Collection = (props: CollectionProps) => {
  const { activities, date, className } = props;

  const day = getDay(new Date(date));
  const dayOfWeek = getDayOfWeek({ date });

  return (
    <div className={sCollectionWrapper({ className })}>
      <div className={sHeading()}>
        <h3 className={sDay()}>Dia {day}</h3>
        <span className={sDayOfWeek()}>{dayOfWeek}</span>
      </div>
      {activities?.length ? (
        <ul className={sActivities()}>
          {activities.map((activity) => (
            <li key={activity.label}>
              <Activity {...activity} />
            </li>
          ))}
        </ul>
      ) : (
        <span className={sEmpty()}>
          Nenhuma atividade cadastrada nessa data.
        </span>
      )}
    </div>
  );
};
