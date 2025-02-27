import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { NgForOf } from '@angular/common';
import { DxToastModule } from 'devextreme-angular';
import { ToastType } from 'devextreme/ui/toast';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-income',
  standalone: true,
  imports: [TransactionListComponent, IncomeFormComponent, DxToastModule,NgxPaginationModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  categories: any[] = [];
  transactions: any[] = [];
  alert = {
    message: '',
    type: 'success' as ToastType,
    visible: false,
  };
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private transactionService: TransactionService,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories(): void {
    // Fetch categories from the service
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadTransactions(): void {
    // Fetch transactions from the service
    this.transactionService.getTransactions().subscribe(
      (transactions: any[]) => {
        this.transactions = transactions.filter(
          (transaction) => transaction.type === 'Income'
        );
      },
      (error: any) => {
        console.error('Error loading transactions:', error);
      }
    );
  }

  handleTransactionAdded(): void {
    this.loadTransactions();
  }

  handleDelete(transactionId: number): void {
    this.transactionService.deleteTransaction(transactionId).subscribe(
      () => {
        this.loadTransactions();
      },
      (error: any) => {
        console.error('Error deleting transaction:', error);
      }
    );
  }

  handleUpdate(event: { id: number; updatedTransaction: any }): void {
    this.transactionService.updateTransaction(event.id, event.updatedTransaction).subscribe(
      () => {
        this.loadTransactions();
      },
      (error: any) => {
        console.error('Error updating transaction:', error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.currentPage = event;
  }
}