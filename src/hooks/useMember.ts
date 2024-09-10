import { ApiMember } from "@/src/services/member";
import { useMutation, useQuery, useQueryClient } from "react-query";

const QUERY_KEY = "qkMember";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiMember.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiMember.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const ListAll = (tripId: string) => {
  return useQuery([QUERY_KEY], () => ApiMember.listAllMembers(tripId));
};

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiMember.findOne(id));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiMember.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

export const useMember = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
