export interface IMember {
  name: string;
  email: string;
  owner: boolean;
  status: boolean;
  id: string;
  tripId: string;
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

export interface DeleteMemberArgs {
  id: string;
  tripId: string;
}
