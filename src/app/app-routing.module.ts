import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{path:'members',component:MembersComponent},
{path:'expenses',component:ExpensesComponent},
{path:"community",component:CommunityComponent},
{path:"maintenance",component:MaintenanceComponent},
{path:"meetings",component:MeetingsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
