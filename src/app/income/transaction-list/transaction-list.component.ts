import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TransactionCardComponent } from "../transaction-card/transaction-card.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  imports: [TransactionCardComponent, NgIf,NgFor],
})
export class TransactionListComponent {
  @Input() transactions: any[] = [];
  @Input() categories: any[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<{ id: number; updatedTransaction: any }>();

  

  handleDelete(transactionId: number) {
    this.onDelete.emit(transactionId);
  }

  handleUpdate(event: { id: number; updatedTransaction: any }) {
    this.onUpdate.emit(event);
  }
}
