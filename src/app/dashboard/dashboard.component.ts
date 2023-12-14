import { Component, OnInit } from '@angular/core';
import { Community } from '../community';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private readonly communityService:CommunityService){

  }
ngOnInit(): void {
  this.loadCommunity();
}

loadCommunity():void{
  this.communityService.getcommunityList().subscribe((response: Community[]) => {
    localStorage.setItem('maintenanceAmount',response[0].maintenanceAmount.toString())

    console.log(response, 'res');
  })
}
}
