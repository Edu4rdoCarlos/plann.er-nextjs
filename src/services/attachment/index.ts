import { IAttachment } from "@/src/types/attachment";
import { api } from '../api';

const endpoint = "/attachments";

export const createAttachment = async (formData: IAttachment, tripId: string): Promise<IAttachment> => {
    const { data } = await api.post<IAttachment>(`${endpoint}`, formData, tripId);
    return data;
}

export const listAllAttachments = async (tripId: string): Promise<IAttachment[]> => {
  const { data } = await api.get<IAttachment[]>(`${endpoint}`, tripId);
  return data;
}

export const findAttachment = async (id: string, tripId: string): Promise<IAttachment> => {
  const { data } = await api.get<IAttachment>(`${endpoint}/${id}`, tripId);
  return data;
}

export const updateAttachment = async (formData: IAttachment, id: string, tripId: string): Promise<IAttachment> => {
  const { data } = await api.put<IAttachment>(`${endpoint}/${id}`, formData, tripId);
  return data;
}

export const deleteAttachment = async (id: string, tripId: string): Promise<IAttachment> => {
  const { data } = await api.delete<IAttachment>(`${endpoint}/${id}`, tripId);
  return data;
}
