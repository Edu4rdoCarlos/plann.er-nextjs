import { Activity, ActivityProps } from "../Activity/Activity";

export interface CollectionProps {
  date: Date;
  activities: ActivityProps[];
}

export const Collection = (props: CollectionProps) => {
  const { activities, date } = props;

  return (
    <div>
      <div>dia</div>
      {activities.map((activity) => (
        <Activity {...activity} />
      ))}
    </div>
  );
};
