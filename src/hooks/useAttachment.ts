import { ApiAttachment } from "@/src/services/attachment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  CreateAttachmentArgs,
  DeleteAttachmentArgs,
} from "../types/attachment";

const QUERY_KEY = "qkAttachment";

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, CreateAttachmentArgs>(
    ({ formData, tripId }) => ApiAttachment.createAttachment(formData, tripId),
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

  return useMutation<boolean, Error, DeleteAttachmentArgs>(
    ({ tripId, id }) => ApiAttachment.deleteAttachment(id, tripId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY);
      },
    }
  );
};

const ListAll = (tripId: string) => {
  return useQuery([QUERY_KEY], () => ApiAttachment.listAllAttachments(tripId));
};

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiAttachment.findAttachment(id));
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation(ApiAttachment.updateAttachment, {
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
