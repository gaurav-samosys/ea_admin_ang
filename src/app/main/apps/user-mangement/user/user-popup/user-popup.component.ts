import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {
 res_data:any;


  constructor(public dialogRef: MatDialogRef<UserPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.res_data = this.data;
  }

    onClose() {
    this.dialogRef.close();
  }
}
