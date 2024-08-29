import { IMember } from "./member";

export interface ITrip {
    city: string;
    country: string;
    startDate: Date;
    endDate: Date;
    owner: IMember;
    members: IMember[];
}