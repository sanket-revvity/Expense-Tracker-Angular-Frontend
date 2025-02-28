import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css'],
})
export class DashboardTableComponent {
  @Input() transactions: any[] = [];
}
