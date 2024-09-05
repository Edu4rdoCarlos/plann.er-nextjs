export interface IActivity {
  title: string;
  date: Date;
}

export interface UpdateActivityArgs {
  formData: IActivity;
  id: string;
}
