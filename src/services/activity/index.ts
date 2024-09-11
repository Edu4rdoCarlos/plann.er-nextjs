import {
  CreateActivityArgs,
  IActivity,
  IActivityDay,
} from "@/src/types/activity";
import { api } from "../api";

const endpoint = "/activities";

const createActivity = async (
  formData: Pick<IActivity, "date" | "title">[],
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
    return false;
  }
};

const listAllActivities = async (tripId: string): Promise<IActivityDay[]> => {
  const { data } = await api.get<IActivityDay[]>(`${endpoint}/`, {
    params: { tripId },
  });
  return data;
};

const findActivity = async (id: string, tripId: string): Promise<IActivity> => {
  const { data } = await api.post<IActivity>(`${endpoint}/${id}`, {
    params: tripId,
  });
  return data;
};

const updateActivity = async (
  formData: IActivity,
  id: string,
  tripId: string
): Promise<IActivity> => {
  const { data } = await api.put<IActivity>(`${endpoint}/${id}`, formData, {
    params: { tripId },
  });
  return data;
};

const confirmActivity = async (
  id: string,
  tripId: string,
  formData: IActivity
): Promise<IActivity> => {
  const { data } = await api.patch<IActivity>(
    `${endpoint}/${id}/confirm`,
    formData,
    {
      params: { tripId },
    }
  );
  return data;
};

const deleteActivity = async (
  id: string,
  tripId: string
): Promise<IActivity> => {
  const { data } = await api.delete<IActivity>(`${endpoint}/${id}`, {
    params: tripId,
  });
  return data;
};

export const ApiActivity = {
  createActivity,
  listAllActivities,
  findActivity,
  updateActivity,
  confirmActivity,
  deleteActivity,
};
