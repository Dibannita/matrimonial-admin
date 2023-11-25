import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-note-view',
  templateUrl: './sale-confirm.component.html',
  styleUrls: ['./sale-confirm.component.scss'],
})
export class SaleConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SaleConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  /**
   * ON CLOSE DIALOG
   */
  onClose(type?: string) {
    this.dialogRef.close({ type: type });
  }
}
