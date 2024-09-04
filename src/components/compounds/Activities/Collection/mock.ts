import { ActivityProps } from "../Activity/Activity";

export const activitiesMock1: ActivityProps[] = [
  {
    checked: true,
    date: new Date("2024-09-02T08:00:00.123Z"),
    label: "Corrida de kart",
  },
];

export const activitiesMock2: ActivityProps[] = [
  {
    checked: true,
    date: new Date("2024-09-03T08:00:00.123Z"),
    label: "Academia em grupo",
  },
  {
    checked: true,
    date: new Date("2024-09-03T12:00:00.123Z"),
    label: "Almoço",
  },
  {
    checked: true,
    date: new Date("2024-09-03T18:00:00.123Z"),
    label: "Gaming session",
  },
  {
    checked: true,
    date: new Date("2024-09-03T21:00:00.123Z"),
    label: "Jantar",
  },
];

export const activitiesMock3: ActivityProps[] = [
  {
    checked: true,
    date: new Date("2024-08-19T08:00:00.123Z"),
    label: "Academia em grupo",
  },
  {
    checked: false,
    date: new Date("2024-09-04T12:00:00.123Z"),
    label: "Almoço",
  },
  {
    checked: false,
    date: new Date("2024-09-04T21:00:00.123Z"),
    label: "Jantar",
  },
];
