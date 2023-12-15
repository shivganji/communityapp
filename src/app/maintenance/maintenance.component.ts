import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../community.service';
import { Members } from '../members';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
 
  maintenanceAmount?:any='';
  selectedMember: Members = {
    memberID: 0,
    communityID: 0,
    name:'',
    flatNo:'',
    mobile:'',
    role:'',
    isPaid:false,
    monthlyMaintenance:[]
  };
   monthNames:any = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  currentMonth:any=new Date().getMonth();
  years:any=["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"]
  members:Members[]=[];
  membersNotPaid:Members[]=[];
  
  constructor(private readonly communityService:CommunityService){

  }
ngOnInit(): void {
  this.loadMembers();
}

loadMembers():void{
  this.membersNotPaid=[];
  this.communityService.getmembersList().subscribe((response: Members[]) => {
    this.members=response;
    if(this.members.length>0){
      this.members.forEach(element => {
        
      let paid=element.monthlyMaintenance.find(e=>new Date(e.date).getMonth()==this.currentMonth);
    
      if(paid!=null){
        element.isPaid=true;
      }else{
        element.isPaid=false;
        this.membersNotPaid.push(element);
      }
     });
    }
    console.log(response, 'res');
  })
}

createMaintenance(): void {
  this.maintenanceAmount=localStorage.getItem('maintenanceAmount');
  if(this.selectedMember.memberID!=0){
    const data = {
      memberID: this.selectedMember.memberID,
      amount: this.maintenanceAmount,
      totalAmount:0,
      date:new Date()
     // name:this.member.name,
     // flatNo:this.member.flatNo,
     // mobile:this.member.mobile,
     // role:this.member.role,
   };
 
   this.communityService.createMaintenance(data)
       .subscribe({
         next: (res) => {
           console.log(res);
           // this.isMemberAdded=true;
           // this.clearForm();
           this.loadMembers();
         },
         error: (e) =>{
           //this.isMemberAdded=false;
           console.error(e)
         }
       });
   console.log('Create a member')
  }
 
}
}
