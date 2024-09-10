import { IAttachment } from "@/src/types/attachment";
import { api } from "../api";

const endpoint = "/attachments";

const createAttachment = async (
  formData: IAttachment[],
  tripId: string
): Promise<boolean> => {
  try {
    await api.post<void>(
      `${endpoint}`,
      { data: formData },
      {
        params: { tripId },
      }
    );
    return true;
  } catch (error) {
    console.error("Erro ao criar link:", error);
    return false;
  }
};

const listAllAttachments = async (tripId: string): Promise<IAttachment[]> => {
  const { data } = await api.get<IAttachment[]>(`${endpoint}`, {
    params: { tripId },
  });
  return data;
};

const findAttachment = async (
  id: string,
  tripId: string
): Promise<IAttachment> => {
  const { data } = await api.get<IAttachment>(`${endpoint}/${id}`, tripId);
  return data;
};

const updateAttachment = async (
  formData: IAttachment,
  id: string,
  tripId: string
): Promise<IAttachment> => {
  const { data } = await api.put<IAttachment>(
    `${endpoint}/${id}`,
    formData,
    tripId
  );
  return data;
};

const deleteAttachment = async (
  id: string,
  tripId: string
): Promise<IAttachment> => {
  const { data } = await api.delete<IAttachment>(`${endpoint}/${id}`, tripId);
  return data;
};

export const ApiAttachment = {
  createAttachment,
  listAllAttachments,
  findAttachment,
  updateAttachment,
  deleteAttachment,
};
