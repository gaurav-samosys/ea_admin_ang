import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService }    from '../users.service';
import { EditdialogComponent} from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { HttpClient,HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
form: FormGroup;
res_data:any;
 editUsers=myGlobals.editUsers

  constructor(private http: HttpClient,private rt:Router,public dialogRef: MatDialogRef<UserEditComponent>,private _formBuilder: FormBuilder,private user:UsersService,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { 

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
            phone     : ['', Validators.required],
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
    	                     const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };
   this.http.post(this.editUsers,{id:'49335'},httpOptions)
            .subscribe(res => {
               console.log(res)



            });

    }

}
