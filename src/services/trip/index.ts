import { ILocation } from "@/src/types/location";
import { ITrip } from "@/src/types/trip";
import { api } from '../api';

const endpoint = "/trips";

export const listCities = async (startsWith: string): Promise<ILocation[]> => {
  const { data } = await api.get<ILocation[]>(`${endpoint}/cities`, startsWith);
  return data;
}

export const createTrip = async (formData: ITrip): Promise<ITrip> => {
    const { data } = await api.post<ITrip>(`${endpoint}`, formData);
    return data;
}

export const listAllTrips = async (): Promise<ITrip[]> => {
  const { data } = await api.get<ITrip[]>(`${endpoint}`);
  return data;
}

export const findTrip = async (id: string): Promise<ITrip> => {
  const { data } = await api.get<ITrip>(`${endpoint}/${id}`);
  return data;
}

export const updateTrip = async (formData: ITrip, id: string): Promise<ITrip> => {
  const { data } = await api.put<ITrip>(`${endpoint}/${id}`, formData);
  return data;
}

export const deleteTrip = async (id: string): Promise<ITrip> => {
  const { data } = await api.delete<ITrip>(`${endpoint}/${id}`);
  return data;
}
