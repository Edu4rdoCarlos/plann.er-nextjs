import { ApiAttachment } from "@/src/services/attachment";
import { useMutation, useQuery, useQueryClient } from "react-query";

const QUERY_KEY = "qkAttachment";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiAttachment.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiAttachment.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiAttachment.listAll());
};

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiAttachment.findOne(id));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiAttachment.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
    },
  });
};

export const useAttachment = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
};
