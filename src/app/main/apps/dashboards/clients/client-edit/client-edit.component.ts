import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService }    from '../clients.service';
import { EditdialogComponent} from './editdialog/editdialog.component';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
form: FormGroup;
res_data:any;

  constructor(private rt:Router,public dialogRef: MatDialogRef<ClientEditComponent>,private _formBuilder: FormBuilder,private client:ClientsService,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { 
  }


 
    ngOnInit(): void
    {
       this.res_data = this.data;

              // setting value
 

        // Reactive Form
        this.form = this._formBuilder.group({
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            username  : ['', Validators.required],
            phone     : ['', [Validators.required,Validators.maxLength(12)]],
            city      : ['', Validators.required],
        /*    state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required]*/
        });
               this.form.patchValue({
            firstName : this.res_data.first_name,
            lastName  : this.res_data.last_name,
            username  : this.res_data.user_name,
            city      : this.res_data.city,
            phone     : this.res_data.phone_no

        });
    }

      public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

    updateForm(){
    	if(this.form.invalid){
    		this.dialog.open(EditdialogComponent);
    		return false;
    	}
    	this.dialogRef.close();
    }

}
