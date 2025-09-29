export interface IAttachment {
  title: string;
  link: string;
  id: string;
  tripId: string;
}

export interface CreateAttachmentData {
  title: string;
  link: string;
}

export interface CreateAttachmentArgs {
  formData: CreateAttachmentData[];
  tripId: string;
}

export interface DeleteAttachmentArgs {
  id: string;
  tripId: string;
}
