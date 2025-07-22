import { ApiActivity } from "@/src/services/activity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateActivityArgs, IActivity } from "../types/activity";

const QUERY_KEY = "qkActivity";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, CreateActivityArgs>(
    ({ formData, tripId }) => ApiActivity.createActivity(formData, tripId),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(QUERY_KEY);
        }
      },
    }
  );
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation<IActivity, Error, { id: string; tripId: string }>(
    ({ id, tripId }) => ApiActivity.deleteActivity(id, tripId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

const ListAll = (tripId: string) => {
  return useQuery([QUERY_KEY], () => ApiActivity.listAllActivities(tripId));
};

const FindOne = (id: string, tripId: string) => {
  return useQuery([QUERY_KEY, id], () => ApiActivity.findActivity(id, tripId));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IActivity,
    Error,
    { formData: IActivity; id: string; tripId: string }
  >(
    ({ formData, id, tripId }) =>
      ApiActivity.updateActivity(formData, id, tripId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

export const useActivity = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
