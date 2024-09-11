import { CreateMemberArgs, IMember } from "@/src/types/member";
import { api } from "../api";

const endpoint = "/members";

const createMember = async (
  formData: CreateMemberArgs["formData"],
  tripId: string
): Promise<boolean> => {
  await api.post<void>(
    `${endpoint}`,
    { data: formData },
    { params: { tripId } }
  );
  return true;
};

const listAllMembers = async (tripId: string): Promise<IMember[]> => {
  const { data } = await api.get<IMember[]>(`${endpoint}`, {
    params: { tripId },
  });
  return data;
};

const findMember = async (id: string, tripId: string): Promise<IMember> => {
  const { data } = await api.get<IMember>(`${endpoint}/${id}`, tripId);
  return data;
};

const findByEmail = async (email: string, tripId: string): Promise<IMember> => {
  const { data } = await api.get<IMember>(`${endpoint}/${email}`, tripId);
  return data;
};

const confirmMember = async (
  formData: Pick<IMember, "name">,
  tripId: string,
  email: string
): Promise<boolean> => {
  try {
    const { data } = await api.patch<void>(
      `${endpoint}/confirm/${email}`,
      formData,
      { params: { tripId } }
    );
    return true;
  } catch (error) {
    return false;
  }
};

const deleteMember = async (id: string, tripId: string): Promise<IMember> => {
  const { data } = await api.delete<IMember>(`${endpoint}/${id}`, tripId);
  return data;
};

export const ApiMember = {
  createMember,
  listAllMembers,
  findMember,
  findByEmail,
  confirmMember,
  deleteMember,
};
