export interface IMember {
  name: string;
  email: string;
  owner: boolean;
  status: boolean;
}

export interface CreateMemberArgs {
  formData: { email: IMember["email"] }[];
  tripId: string;
}

export interface ConfirmPresenceArgs {
  formData: Pick<IMember, "name">;
  tripId: string;
  email: string;
}
