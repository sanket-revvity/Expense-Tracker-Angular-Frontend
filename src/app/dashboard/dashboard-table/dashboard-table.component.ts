import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css'],
})
export class DashboardTableComponent implements OnChanges {
  @Input() transactions: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.transactions = this.transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  }
}
