import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { ToastType } from 'devextreme/ui/toast';
import { TransactionListComponent } from '../../income/transaction-list/transaction-list.component';
import { DxToastModule } from 'devextreme-angular';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone:true,
  imports: [DxToastModule,NgForOf,FormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  @Input() categories:any[] = [];
  @Output() transactionAdded = new EventEmitter<void>();

  description:string = '';
  amount: string = '';
  categoryId: string = '';
  date: string = '';
  alert = {
      message: '',
      type: 'success' as ToastType,
      visible: false
    };
  constructor(private transactionService:TransactionService){}

  handleSubmit():void{
    const token = localStorage.getItem('accessToken');
    if(!token){
      this.showToast('User not authorized.','error');
      return;
    }
    const transactionData = {
      categoryId: this.categoryId,
      amount: parseFloat(this.amount),
      description: this.description,
      date: this.date,
      type:'Expense'
    }

    this.transactionService.addTransaction(transactionData).subscribe(
      (response) => {
        this.showToast('Transaction added succcessfully','success');
        this.transactionAdded.emit();
        this.resetForm();
      },
      (error:any) => {
        console.error('Error adding transaction:',error);
        this.showToast('Error adding transaction', 'error');        
      }
    )
  }

  resetForm():void{
    this.description = '';
    this.amount = '';
    this.categoryId = '';
    this.date = '';
  }

  showToast(message: string, type: string): void {
    this.alert = { visible: true, message, type: type as ToastType };
        setTimeout(() => (this.alert.visible = false), 2000);
  }
}
