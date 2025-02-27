import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'delete-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="mt-2 text-gray-600 m-4">
        <h1 class="text-lg font-bold text-gray-700">Confirm Delete</h1>
    
      <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
    </div>
    <div class="mt-4 flex justify-end space-x-4 m-4">
      <button (click)="onNoClick()" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
      <button (click)="confirmDelete()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
    </div>
  `,
})
export class DeleteTransactionDialog {
  constructor(public dialogRef: MatDialogRef<DeleteTransactionDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
