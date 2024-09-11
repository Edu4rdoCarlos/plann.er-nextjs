export interface IActivity {
  id: string;
  tripId: string;
  title: string;
  date: string;
  status: boolean;
}

export interface IActivityDay {
  dateDay: string;
  activities: IActivity[];
}

export interface CreateActivityArgs {
  formData: Pick<IActivity, "date" | "title">[];
  tripId: string;
}
