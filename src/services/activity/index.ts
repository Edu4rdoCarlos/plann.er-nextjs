import { IActivity } from "@/src/types/activity";
import { api } from '../api';

const endpoint = "/activities";

export const createActivity = async (formData: IActivity, tripId: string): Promise<IActivity> => {
    const { data } = await api.post<IActivity>(`${endpoint}`, formData, tripId);
    return data;
}

export const listAllActivitys = async (tripId: string): Promise<IActivity[]> => {
  const { data } = await api.get<IActivity[]>(`${endpoint}`, tripId);
  return data;
}

export const findActivity = async (id: string, tripId: string): Promise<IActivity> => {
  const { data } = await api.get<IActivity>(`${endpoint}/${id}`, tripId);
  return data;
}

export const updateActivity = async (formData: IActivity, id: string, tripId: string): Promise<IActivity> => {
  const { data } = await api.put<IActivity>(`${endpoint}/${id}`, formData, tripId);
  return data;
}

export const confirmActivity = async (id: string, tripId: string, formData: IActivity): Promise<IActivity> => {
    const { data } = await api.patch<IActivity>(`${endpoint}/${id}/confirm`, formData, tripId)
    return data
}

export const deleteActivity = async (id: string, tripId: string): Promise<IActivity> => {
  const { data } = await api.delete<IActivity>(`${endpoint}/${id}`, tripId);
  return data;
}


