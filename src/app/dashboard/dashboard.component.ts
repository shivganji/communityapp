import { Component, OnInit } from '@angular/core';
import { Community } from '../community';
import { CommunityService } from '../community.service';
import { Members } from '../members';
import { Maintenance } from '../maintenance';
import { ChartOptions, Chart } from 'chart.js';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  maintenance: Maintenance[] = [];
  isDataLoaded: boolean = false;
  totalExpenses: number = 0;
  totalBudget: number = 0;
  chart: any = [];
  budget: any = '';
  expense: any = '';
  public piechartdata: number[] = [];
  members: Members[] = [];
  currentMonth: any = new Date().getMonth();
currentMonthName:string='';
  constructor(private readonly communityService: CommunityService) {}
  ngOnInit(): void {
    this.loadCommunity();
    this.expense = localStorage.getItem('totalExpenses')?.toString();
    this.budget = localStorage.getItem('totalBudget')?.toString();
    this.totalBudget = parseInt(this.budget.toString());
    this.totalExpenses = parseInt(this.expense.toString());
    this.currentMonthName=this.getMonthName(this.currentMonth);
  }

  loadCommunity(): void {
    this.communityService
      .getcommunityList()
      .subscribe((response: Community[]) => {
        if (response.length > 0) {
          localStorage.setItem(
            'maintenanceAmount',
            response[0].maintenanceAmount.toString()
          );
          let totalExpenses: number = 0;
          if (response[0].expenses.length > 0) {
            response[0].expenses.forEach((e, i) => {
              totalExpenses += e.expenseAmount;
            });

            localStorage.setItem('totalExpenses', totalExpenses.toString());
          }
          this.loadMembers();
          console.log(response, 'res');
        }
      });
  }
  loadMembers(): void {
    this.communityService.getmembersList().subscribe((response: Members[]) => {
      if (response.length > 0) {
        response.forEach((element, i) => {
          if (element.monthlyMaintenance.length > 0) {
            let paid = element.monthlyMaintenance.find(
              (e) => new Date(e.date).getMonth() == this.currentMonth
            );

            if (paid != null) {
              element.isPaid = true;
            } else {
              element.isPaid = false;
            }
            element.monthlyMaintenance.forEach((e, i) => {
              this.maintenance.push(element.monthlyMaintenance[i]);
            });
          }
        });
        this.members = response;
        if (this.maintenance.length > 0) {
          let sordOrder = this.maintenance.sort(
            (a, b) => b.totalAmount - a.totalAmount
          );
          let totalAmount = sordOrder[0].totalAmount;
          localStorage.setItem('totalBudget', totalAmount.toString());
        }
        let label1 = 'Total Budget :' + this.totalBudget;
        let label2 = 'Total Expenses :' + this.totalExpenses;
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: [label1, label2],
            datasets: [
              {
                data: [this.totalBudget, this.totalExpenses],
                borderColor: '#3e95cd',
                label: 'Dashboard',
                backgroundColor: ['rgb(60, 179, 113)', 'rgb(54, 162, 235)'],

                borderWidth: 3,
              },
            ],
          },
          options: {
            responsive: false,
            maintainAspectRatio: true,
          },
        });
        this.isDataLoaded = true;
      }

      console.log(response, 'res');
    });
  }

  getMonthName(month:number): string {
    let monthName = '';
    switch (month) {
      case 0:
        monthName = 'January';
        break;
      case 1:
        monthName = 'February';
        break;
      case 2:
        monthName = 'March';
        break;
      case 3:
        monthName = 'April';
        break;
      case 4:
        monthName = 'May';
        break;
      case 5:
        monthName = 'June';
        break;
      case 6:
        monthName = 'July';
        break;
      case 7:
        monthName = 'August';
        break;
      case 8:
        monthName = 'September';
        break;
      case 9:
        monthName = 'October';
        break;
      case 10:
        monthName = 'November';
        break;
      case 11:
        monthName = 'December';
        break;
    }

    return monthName;
  }
}
