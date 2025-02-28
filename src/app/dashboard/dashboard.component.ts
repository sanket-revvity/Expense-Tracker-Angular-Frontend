import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { TransactionService } from '../../services/transaction.service';
import { jwtDecode } from 'jwt-decode';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCardComponent, ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  income = '0';
  expense = '0';
  balance = '0';
  username = '';
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.getUsername(token);
    }
    this.getSummary();
  }

  getSummary() {
    this.transactionService.getTransactionSummary().subscribe(
      (response) => {
        console.log(response);
        this.income = response.totalIncome;
        this.expense = response.totalExpense;
        this.balance = response.balance;
      },
      (error: any) => {
        console.error('Error getting summary:', error);
      }
    );
  }

  getUsername(token: string) {
    const decoded: any = jwtDecode(token);
    this.username = decoded.Username;
  }
}
