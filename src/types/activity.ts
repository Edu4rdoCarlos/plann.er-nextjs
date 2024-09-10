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

export interface UpdateActivityArgs {
  formData: IActivity;
  id: string;
}
