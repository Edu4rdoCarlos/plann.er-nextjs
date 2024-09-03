import { IMember } from "@/src/types/member";
import { api } from '../api';

const endpoint = "/members";

export const createMember = async (formData: IMember, tripId: string): Promise<IMember> => {
    const { data } = await api.post<IMember>(`${endpoint}`, formData, tripId);
    return data;
}

export const listAllMembers = async (tripId: string): Promise<IMember[]> => {
    const { data } = await api.get<IMember[]>(`${endpoint}`, tripId);
    return data;
}

export const findMember = async (id: string, tripId: string): Promise<IMember> => {
    const { data } = await api.get<IMember>(`${endpoint}/${id}`, tripId);
    return data;
}

export const findByEmail = async (email: string, tripId: string): Promise<IMember> => {
    const { data } = await api.get<IMember>(`${endpoint}/${email}`, tripId)
    return data
}

export const confirmMember = async (formData: IMember, tripId: string, id: string): Promise<IMember> => {
    const { data } = await api.patch<IMember>(`${endpoint}/confirm/${id}`, formData, tripId)
    return data
}

export const deleteMember = async (id: string, tripId: string): Promise<IMember> => {
  const { data } = await api.delete<IMember>(`${endpoint}/${id}`, tripId);
  return data;
}