import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-confirmbox',
  templateUrl: './user-confirmbox.component.html',
  styleUrls: ['./user-confirmbox.component.scss']
})
export class UserConfirmboxComponent{

	  title: string;
  message: string;
 
  constructor(public dialogRef: MatDialogRef<UserConfirmboxComponent>,
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