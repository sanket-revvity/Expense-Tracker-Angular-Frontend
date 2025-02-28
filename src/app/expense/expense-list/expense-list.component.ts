import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionCardComponent } from '../../income/transaction-card/transaction-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  imports: [TransactionCardComponent,NgIf,NgFor],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  @Input() transactions : any[] = [];
  @Input() categories:any[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<{id:number,updatedTransaction:any}>();

  handleDelete(transactionId:number){
    this.onDelete.emit(transactionId);
  }

  handleUpdate(event:{id:number,updatedTransaction:any}){
    this.onUpdate.emit(event);
  }
}
