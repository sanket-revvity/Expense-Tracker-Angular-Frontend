import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe} from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditTransactionDialog } from '../edit-transaction-dialog/edit-transaction-dialog.component';
import { DeleteTransactionDialog } from '../delete-transaction-dialog/delete-transaction-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [ DatePipe, MatDialogModule, MatButtonModule],
  templateUrl: './transaction-card.component.html',
})
export class TransactionCardComponent {
  @Input() transaction: any;
  @Input() categories: any[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onUpdate = new EventEmitter<{ id: number; updatedTransaction: any }>();

  description?: string;
  amount?: string;
  categoryId?: string;
  date?: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.description = this.transaction.description;
    this.amount = this.transaction.amount;
    this.categoryId = this.transaction.categoryId;
    this.date = this.transaction.date;
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditTransactionDialog, {
      data: {
        description: this.description,
        amount: this.amount,
        categoryId: this.categoryId,
        date: this.date,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.description = result.description;
        this.amount = result.amount;
        this.categoryId = result.categoryId;
        this.date = result.date;
        this.handleSaveChanges();
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteTransactionDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleDelete();
      }
    });
  }

  handleSaveChanges() {
    const updatedTransaction = {
      categoryId: this.categoryId,
      amount: parseFloat(this.amount as string),
      description: this.description,
      date: this.date,
      type: this.transaction.type,
    };
    this.onUpdate.emit({ id: this.transaction.id as number, updatedTransaction });
  }

  handleDelete() {
    this.onDelete.emit(this.transaction.id as number);
  }

  getCategoryIcon(categoryName: string) {
    console.log(this.transaction);
    
    switch (categoryName) {
      case 'Salary':
        return 'assets/wallet.svg';
      case 'Investments':
        return 'assets/landmark.svg';
      case 'Stocks':
        return 'assets/circle-dollar-sign.svg';
      case 'Bitcoin':
        return 'assets/bitcoin.svg';
      case 'Freelancing':
        return 'assets/freelance.svg';
      case 'Bank':
        return 'assets/landmark.svg';
      case 'Youtube':
        return 'assets/youtube.svg';
      case 'Bonus':
        return 'assets/gift.svg';
      case 'Pension':
        return 'assets/piggy-bank.svg';
      case 'Interest':
        return 'assets/banknote.svg';
        case "Education":
          return 'assets/education.svg';
        case "Fees":
          return 'assets/fees.svg';
        case "Food":
          return 'assets/food.svg';
        case "Travelling":
          return 'assets/travelling.svg';
        case "Fuel":
          return 'assets/fuel.svg';
        case "Rent":
          return 'assets/rent.svg';
      default:
        return 'assets/file-text.svg';
    }
  }
}
