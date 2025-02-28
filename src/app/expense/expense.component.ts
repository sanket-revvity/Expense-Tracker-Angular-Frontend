import { Component, OnInit } from '@angular/core';
import { ToastType } from 'devextreme/ui/toast';
import { TransactionService } from '../../services/transaction.service';
import { CategoryService } from '../../services/category.service';
import { DxToastModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

@Component({
  selector: 'app-expense',
  imports: [ExpenseListComponent,ExpenseFormComponent,DxToastModule,NgxPaginationModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})

export class ExpenseComponent implements OnInit {
  categories : any[] = []
  transactions: any[] = []
  alert = {
    message: '',
    type : 'success' as ToastType,
    visible:false
  };
  currentPage: number = 1
  itemsPerPage: number = 4

  constructor(private transactionService:TransactionService,private categoryService:CategoryService){}
  
  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories():void{
    this.categoryService.getCategories().subscribe(
      (categories:any[]) => {
        this.categories = categories;
      },
      (error:any) => {
        console.error('Error loading categories:',error);
      }
    )
  }

  loadTransactions():void{
    this.transactionService.getExpenseTransactions().subscribe(
      (transactions:any[]) => {
      this.transactions = transactions.filter(
        (transactions) => transactions.type === 'Expense'
      )
    },
  (error:any) => {
    console.error('Error loading transactions:',error)
  });
  }

  handleTransactionAdded():void{
    this.loadTransactions();
  }
  
  handleDelete(transactionId:number):void{
    this.transactionService.deleteTransaction(transactionId).subscribe(
      () => {
        this.loadTransactions();
      },
      (error:any) => {
        console.error("Error deleting transaction:", error);
      }
    )
  }

  handleUpdate(event: { id:number;updatedTransaction:any}):void{
    this.transactionService.updateTransaction(event.id,event.updatedTransaction).subscribe(
      () => {
        this.loadTransactions();
      },
      (error:any)=>{
        console.error('Error updating transaction:', error);
      }
    )
  }

  handlePageChange(event:number):void{
    this.currentPage = event
  }
}
