import { ApiTrip } from "@/src/services/trip";
import { useMutation, useQuery, useQueryClient } from "react-query";

const QUERY_KEY = "qkTrip";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiTrip.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiTrip.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiTrip.listAll());
};

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiTrip.findOne(id));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiTrip.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

export const useTrip = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
