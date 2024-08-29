import { DefaultApi } from "@/app/services/default"
import { IMember } from "@/src/types/member"

const endpoint = '/members'
const resourceId = 'id'

export const ApiMember = new DefaultApi<IMember>(endpoint, resourceId)