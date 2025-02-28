import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BaseChartDirective, NgIf],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };

  pieChartData!: ChartConfiguration<'doughnut'>['data'];
  pieChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChartData();
    this.fetchPieChartData();
  }

  private fetchChartData(): void {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .get<any[]>('https://localhost:44374/api/transaction', { headers })
      .subscribe(
        (data) => {
          const sortedData = data.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          const labels = sortedData.map((t) =>
            new Date(t.date).toLocaleDateString()
          );
          const incomeData = sortedData.map((t) =>
            t.type === 'Income' ? t.amount : 0
          );
          const expenseData = sortedData.map((t) =>
            t.type === 'Expense' ? t.amount : 0
          );

          this.lineChartData = {
            labels,
            datasets: [
              {
                label: 'Income',
                data: incomeData,
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
              },
              {
                label: 'Expense',
                data: expenseData,
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
              },
            ],
          };
        },
        (error) => console.error('Error fetching chart data:', error)
      );
  }

  private fetchPieChartData(): void {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http
      .get<any[]>('https://localhost:44374/api/transaction/cat-spend', {
        headers,
      })
      .subscribe(
        (data) => {
          const labels = data.map((item) => item.categoryName);
          const amounts = data.map((item) => item.totalAmount);
          const colors = [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ];

          this.pieChartData = {
            labels,
            datasets: [
              {
                label: 'Category Spending',
                data: amounts,
                backgroundColor: colors,
                hoverBackgroundColor: colors.map((color) =>
                  color.replace('0.7', '1')
                ),
                borderWidth: 2,
                hoverOffset: 20,
              },
            ],
          };
        },
        (error) => console.error('Error fetching pie chart data:', error)
      );
  }
}
