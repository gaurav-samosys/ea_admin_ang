import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-box-component',
  templateUrl: './confirm-box-component.component.html',
  styleUrls: ['./confirm-box-component.component.scss']
})
export class ConfirmBoxComponentComponent  {
  title: string;
  message: string;
 
  constructor(public dialogRef: MatDialogRef<ConfirmBoxComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }
   
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
 
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
 
  constructor(public title: string, public message: string,public id:any) {
  }
}
