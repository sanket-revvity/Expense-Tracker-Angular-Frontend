import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import { DxToastModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { ToastType } from 'devextreme/ui/toast';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-income-form',
  standalone:true,
  imports:[DxToastModule,FormsModule,NgForOf],
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
})
export class IncomeFormComponent {
  @Input() categories: any[] = [];
  @Output() transactionAdded = new EventEmitter<void>();

  description: string = '';
  amount: string = '';
  categoryId: string = '';
  date: string = '';
  alert = {
      message: '',
      type: 'success' as ToastType,
      visible: false
    };

  constructor(private transactionService: TransactionService) {}

  handleSubmit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.showToast('User not authorized', 'error');
      return;
    }

    const transactionData = {
      categoryId: this.categoryId,
      amount: parseFloat(this.amount),
      description: this.description,
      date: this.date,
      type: 'Income',
    };

    this.transactionService.addTransaction(transactionData).subscribe(
      (response) => {
        this.showToast('Transaction added successfully', 'success');
        this.transactionAdded.emit();
        this.resetForm();
      },
      (error) => {
        console.error('Error adding transaction:', error);
        this.showToast('Error adding transaction', 'error');
      }
    );
  }

  resetForm(): void {
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