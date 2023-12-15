import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityComponent } from './community/community.component';
import { MembersComponent } from './members/members.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CommunityInterceptor } from './community.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    MembersComponent,
    ExpensesComponent,
    MeetingsComponent,
    MaintenanceComponent,
    DashboardComponent,
    ChartComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:CommunityInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
