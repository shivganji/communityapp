import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

totalExpenses:number=0;
totalBudget:number=0;
budget:any='';
expense:any='';

ngOnInit(): void {
  this.expense=localStorage.getItem('totalExpenses')?.toString();
  this.budget =localStorage.getItem('totalBudget')?.toString();
  this.totalBudget=parseInt(this.budget.toString());
  this.totalExpenses=parseInt(this.expense.toString());
}

constructor(){
 
}
  // Pie
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,
};
public pieChartLabels = [ 'Total Budget','Total Expenses' ];
public pieChartDatasets = [ {
  data: [this.totalBudget,  this.totalExpenses]
} ];
public pieChartLegend = true;
public pieChartPlugins = [];



}
