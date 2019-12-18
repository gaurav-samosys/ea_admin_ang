import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-clients-popup',
  templateUrl: './client-popup.component.html',
  styleUrls: ['./client-popup.component.scss']
})
export class ClientPopupComponent implements OnInit {
  res_data:any;


  constructor(public dialogRef: MatDialogRef<ClientPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.res_data = this.data;
  }

    onClose() {
    this.dialogRef.close();
  }

}
