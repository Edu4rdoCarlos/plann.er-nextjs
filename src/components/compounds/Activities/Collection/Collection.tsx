"use client";

import { getDayOfWeek, getFullDate } from "@/src/lib/utils/date";
import { Activity, ActivityProps } from "../Activity/Activity";
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

  const fullDate = getFullDate({ date });
  const dayOfWeek = getDayOfWeek({ date });

  return (
    <div className={sCollectionWrapper({ className })}>
      <div className={sHeading()}>
        <h3 className={sDay()}>{fullDate}</h3>
        <span className={sDayOfWeek()}>{dayOfWeek}</span>
      </div>

      {activities && activities.length > 0 ? (
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