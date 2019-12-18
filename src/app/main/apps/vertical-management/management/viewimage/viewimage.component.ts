import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagementService }    from '../management.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-viewimage',
  templateUrl: './viewimage.component.html',
  styleUrls: ['./viewimage.component.scss']
})
export class ViewimageComponent implements OnInit {
	res_data:any;


 constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ViewimageComponent>,private rt:Router,public _formBuilder: FormBuilder,private manage_service:ManagementService) { 
  this.res_data = this.data;
       console.log(this.res_data)
 }

  ngOnInit() {
  }

  close()
  {
  	this.dialogRef.close();
  }

}
