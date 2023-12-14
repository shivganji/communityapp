import { Component, OnInit } from '@angular/core';
import { Community } from '../community';
import { CommunityService } from '../community.service';
import { Expenses } from '../expenses';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  isExpenseAdded:boolean=false;

  expense: Expenses = {
    expenseID:0,
    expenseAmount:0,
    totalExpenses:0,
    expenseDate:new Date(),
    expenseDetails:'',
    communityID:0
  };

  expenses:Expenses[]=[];
  constructor(private readonly communityService:CommunityService){

  }
 ngOnInit(): void {
   this.loadExpenses();
 }
 loadExpenses():void{
  this.communityService.getcommunityList().subscribe((response: Community[]) => {
    this.expenses=response[0].expenses;
    console.log(response, 'res');
  })
}
createExpense(): void {
  const data = {
    expenseAmount: this.expense.expenseAmount,
    communityID: 2,
    expenseDate:this.expense.expenseDate,
    expenseDetails: this.expense.expenseDetails
  };

  this.communityService.createExpense(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isExpenseAdded=true;
          this.loadExpenses();
        },
        error: (e) =>{
          this.isExpenseAdded=false;
          console.error(e)
        }
      });
  console.log('Create a expense')
}
}
