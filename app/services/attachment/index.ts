import { DefaultApi } from "@/app/services/default"
import { IAttachment } from "@/src/types/attachment"

const endpoint = '/attachments'
const resourceId = 'id'

export const ApiAttachment = new DefaultApi<IAttachment>(endpoint, resourceId)