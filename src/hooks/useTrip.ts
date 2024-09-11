import { ApiTrip } from "@/src/services/trip";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ITrip, UpdateTripArgs } from "../types/trip";

const QUERY_KEY = "qkTrip";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiTrip.createTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiTrip.deleteTrip, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiTrip.listAllTrips());
};

const FindOne = (id?: string) => {
  return useQuery([QUERY_KEY, id], () => ApiTrip.findTrip(id!), {
    enabled: !!id,
  });
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation<ITrip, Error, UpdateTripArgs>(
    ({ formData, id }) => ApiTrip.updateTrip(formData, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

export const useTrip = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
