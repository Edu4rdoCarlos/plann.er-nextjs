import { DefaultApi } from "@/src/services/default";
import { IAttachment } from "@/src/types/attachment";

const endpoint = "/attachments";
const resourceId = "id";

export const ApiAttachment = new DefaultApi<IAttachment>(endpoint, resourceId);
