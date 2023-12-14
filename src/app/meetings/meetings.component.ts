import { Component, OnInit } from '@angular/core';
import { Community } from '../community';
import { CommunityMeetings } from '../community-meetings';
import { CommunityService } from '../community.service';
import { Meeting } from '../meeting';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  isMeetingAdded:boolean=false;

  meeting: CommunityMeetings = {
    mom:'',
    momid:0,
    meetingDate:new Date(),
    communityID:0
  };

  meetings:CommunityMeetings[]=[];
  
  constructor(private readonly communityService:CommunityService){

  }
  ngOnInit(): void {
    this.loadMeeting();
    }
    
    loadMeeting():void{
      this.communityService.getcommunityList().subscribe((response: Community[]) => {
        this.meetings=response[0].communityMeetings;
        console.log(response, 'res');
      })
    }

    createMeeting(): void {
      const data = {
        mom: this.meeting.mom,
        communityID: 2,
        meetingDate:this.meeting.meetingDate
      };
    
      this.communityService.createMeeting(data)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.isMeetingAdded=true;
              this.loadMeeting();
            },
            error: (e) =>{
              this.isMeetingAdded=false;
              console.error(e)
            }
          });
      console.log('Create a meeting')
    }

}
