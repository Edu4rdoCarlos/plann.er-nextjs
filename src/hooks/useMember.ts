import { ApiMember } from "@/src/services/member";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ConfirmPresenceArgs,
  CreateMemberArgs,
  DeleteMemberArgs,
} from "../types/member";

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

  return useMutation<boolean, Error, DeleteMemberArgs>(
    ({ tripId, id }) => ApiMember.deleteMember(id, tripId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

const ListAll = (tripId: string) => {
  return useQuery([QUERY_KEY], () => ApiMember.listAllMembers(tripId));
};

const FindOne = (id: string, tripId: string) => {
  return useQuery([QUERY_KEY, id], () => ApiMember.findMember(id, tripId));
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
  FindOne,
  ListAll,
  ConfirmPresence,
};
