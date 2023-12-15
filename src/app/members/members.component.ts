import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../community.service';
import { Members } from '../members';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  isMemberAdded:boolean=false;

  member: Members = {
    memberID: 0,
    communityID: 0,
    name:'',
    flatNo:'',
    mobile:'',
    role:'',
    isPaid:false,
    monthlyMaintenance:[]
  };

  members:Members[]=[];
  
constructor(private readonly communityService:CommunityService){

}

ngOnInit(): void {
this.loadMembers();
}

loadMembers():void{
  this.communityService.getmembersList().subscribe((response: Members[]) => {
    this.members=response;
    console.log(response, 'res');
  })
}

clearForm():void{
  this.member={
    memberID: 0,
    communityID: 0,
    name:'',
    flatNo:'',
    mobile:'',
    role:'',
    isPaid:false,
    monthlyMaintenance:[]
  }
}

createMember(member:Members): void {
  const data = {
    memberID: this.member.memberID,
    communityID: 2,
    name:this.member.name,
    flatNo:this.member.flatNo,
    mobile:this.member.mobile,
    role:this.member.role,
  };

  this.communityService.createMember(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isMemberAdded=true;
          this.clearForm();
          this.loadMembers();
        },
        error: (e) =>{
          this.isMemberAdded=false;
          console.error(e)
        }
      });
  console.log('Create a member')
}
}
