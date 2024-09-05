import { ApiActivity } from "@/src/services/activity";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IActivity, UpdateActivityArgs } from "../types/activity";

const QUERY_KEY = "qkActivity";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation<IActivity, Error, UpdateActivityArgs>(
    ({ formData, id }) => ApiActivity.createActivity(formData, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation(() => ApiActivity.deleteActivity(), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiActivity.listAllActivities());
};

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiActivity.findActivity(id));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation(() => ApiActivity.updateActivity(), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

export const useActivity = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
