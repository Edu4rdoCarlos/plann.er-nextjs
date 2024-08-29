import { DefaultApi } from "@/app/services/default"
import { ITrip } from "@/src/types/trip"

const endpoint = '/trips'
const resourceId = 'id'

export const ApiTrip = new DefaultApi<ITrip>(endpoint, resourceId)