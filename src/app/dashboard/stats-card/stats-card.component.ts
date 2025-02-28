import { DecimalPipe, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [NgFor, NgSwitch, NgSwitchCase, DecimalPipe],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css',
})
export class StatsCardComponent {
  @Input() income: string = '0';
  @Input() expense: string = '0';
  @Input() balance: string = '0';

  get stats() {
    return [
      { label: 'Income', value: this.income, icon: 'trending_up' },
      { label: 'Expense', value: this.expense, icon: 'arrow_down' },
      { label: 'Balance', value: this.balance, icon: 'dollar_sign' },
    ];
  }
}
