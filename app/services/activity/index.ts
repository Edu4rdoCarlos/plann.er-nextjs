import { DefaultApi } from "@/app/services/default"
import { IActivity } from "@/src/types/activity"

const endpoint = '/activities'
const resourceId = 'id'

export const ApiActivity = new DefaultApi<IActivity>(endpoint, resourceId)