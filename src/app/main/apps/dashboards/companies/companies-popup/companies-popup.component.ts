import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-companies-popup',
  templateUrl: './companies-popup.component.html',
  styleUrls: ['./companies-popup.component.scss']
})
export class CompaniesPopupComponent implements OnInit {
  res_data:any;


  constructor(public dialogRef: MatDialogRef<CompaniesPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.res_data = this.data;
  }

    onClose() {
    this.dialogRef.close();
  }

}
