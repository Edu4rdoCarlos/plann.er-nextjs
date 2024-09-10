export interface IAttachment {
  title: string;
  link: string;
}

export interface CreateAttachmentArgs {
  formData: IAttachment[];
  tripId: string;
}
