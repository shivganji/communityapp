import { Maintenance } from "./maintenance";

export interface Members {
    memberID?:number;
    communityID?:number;
    name?:string;
    flatNo?:string;
    mobile?:string;
    role?:string;
    monthlyMaintenance:Maintenance[];
}
