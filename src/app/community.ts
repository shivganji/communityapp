import { Members } from './members';
import { Expenses } from './expenses';
import { CommunityMeetings } from './community-meetings';

export interface Community 
    {
        communityID: Number;
        maintenanceAmount: Number;
        communityName: String;
        address: String;
        contactNumber: String;
        members: Members[];
        communityMeetings: CommunityMeetings[];
        expenses:Expenses[];
      }

