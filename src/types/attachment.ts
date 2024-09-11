export interface IAttachment {
  title: string;
  link: string;
  id: string;
  tripId: string;
}

export interface CreateAttachmentArgs {
  formData: IAttachment[];
  tripId: string;
}

export interface DeleteAttachmentArgs {
  id: string;
  tripId: string;
}
