import { ApiMember } from "@/src/services/member";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ConfirmPresenceArgs, CreateMemberArgs } from "../types/member";

const QUERY_KEY = "qkMember";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, CreateMemberArgs>(
    ({ formData, tripId }) => ApiMember.createMember(formData, tripId),
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

const ConfirmPresence = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, ConfirmPresenceArgs>(
    ({ formData, tripId, email }) =>
      ApiMember.confirmMember(formData, tripId, email),
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(QUERY_KEY);
        }
      },
    }
  );
};

export const useMember = {
  Create,
  Delete,
  Update,
  FindOne,
  ListAll,
  ConfirmPresence,
};
