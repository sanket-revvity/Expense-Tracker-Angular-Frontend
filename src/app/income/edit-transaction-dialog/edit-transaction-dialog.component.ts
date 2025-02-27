import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'edit-transaction-dialog',
  standalone: true,
  imports: [NgForOf, FormsModule],
  templateUrl:"./edit-transaction-dialog.component.html",
})
export class EditTransactionDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTransactionDialog>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.dialogRef.close(this.data);
  }
}
