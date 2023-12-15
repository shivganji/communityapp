import { Component, OnInit } from '@angular/core';
import { Community } from '../community';
import { CommunityService } from '../community.service';
import { Members } from '../members';
import { Maintenance } from '../maintenance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  maintenance:Maintenance[]=[];
  constructor(private readonly communityService:CommunityService){

  }
ngOnInit(): void {
  this.loadCommunity();
}

loadCommunity():void{
  this.communityService.getcommunityList().subscribe((response: Community[]) => {
    if(response.length>0){
     
      localStorage.setItem('maintenanceAmount',response[0].maintenanceAmount.toString())
      let totalExpenses:number=0;
      if(response[0].expenses.length>0){
        response[0].expenses.forEach((e,i) => {
          totalExpenses+=e.expenseAmount;
        });

        localStorage.setItem('totalExpenses',totalExpenses.toString());
        debugger
      }
this.loadMembers();
    console.log(response, 'res');
    }
    
  })
}
loadMembers():void{
  this.communityService.getmembersList().subscribe((response: Members[]) => {
     
    if(response.length>0){
      response.forEach((element,i)=> {
        if(element.monthlyMaintenance.length>0){
          element.monthlyMaintenance.forEach((e,i)=>{
            this.maintenance.push(element.monthlyMaintenance[i]);
          })
          
        }
        
      });

      if(this.maintenance.length>0){
        let sordOrder=this.maintenance.sort((a,b) => b.totalAmount - a.totalAmount);
        let totalAmount=sordOrder[0].totalAmount;
        localStorage.setItem('totalBudget',totalAmount.toString());
        debugger
      }
     
    }
    
    console.log(response, 'res');
  })
}
}
