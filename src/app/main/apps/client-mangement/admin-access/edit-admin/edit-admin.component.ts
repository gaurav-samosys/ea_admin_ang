import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAccessService }    from '../admin-access.service';
import * as myGlobals from '../../../../../global';
/*import { EditdialogComponent} from './editdialog/editdialog.component';*/

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
form: FormGroup;
res_data:any;
common:any;
companiesData:any;
clientData:any;
 getClients = myGlobals.getClients;
 getCompanies = myGlobals.getCompanies;
 editAdminUser = myGlobals.editAdminUser;
 admin_updatestatus:any;
  constructor(private rt:Router,public dialogRef: MatDialogRef<EditAdminComponent>,private _formBuilder: FormBuilder,private service:AdminAccessService,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { 
  }


 
    ngOnInit(): void
    {
      this.getCompany();
       this.res_data = this.data;
     console.log(this.res_data)
              // setting value
 

        // Reactive Form
        this.form = this._formBuilder.group({
           company_name : ['', Validators.required],
           client : ['', Validators.required],
            first_name : ['', Validators.required],
            last_name  : ['', Validators.required],
            username  : ['', Validators.required],
            email     : ['', [Validators.required]],
            password      : [''],
        /*    state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required]*/
        });
               this.form.patchValue({
            first_name : this.res_data.first_name,
            last_name  : this.res_data.last_name,
            username  : this.res_data.user_name,
            phone     : this.res_data.phone_no,
            email     : this.res_data.email
        });
                this.form.controls['company_name'].setValue(this.res_data.company_id, {onlySelf: true});
                this.getClient(this.res_data.company_id);
                this.form.controls['username'].disable();
    }

      public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
  onClose() {
    this.dialogRef.close();
  }

    updateForm(){
    	if(this.form.invalid){
    		return false;
    	}
      this.form.value.admin_user_id=this.res_data.id;
      this.form.value.token="LIVESITE";
    	this.service.Post(this.editAdminUser,this.form.value)
            .subscribe(res => {
               console.log(res)

                    this.common=res;
        this.admin_updatestatus=this.common.success;
          
        localStorage.setItem("admin_updatestatus",this.admin_updatestatus);

        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/client-mangement/admin-access"]));
        this.dialogRef.close();

            });
    }

       getCompany() {

        this.service.Post(this.getCompanies, {token: 'LIVESITE' }).subscribe(res => {
            this.common = res
            this.companiesData = this.common.data
        })
        }



    getClient(value) {
        this.service.Post(this.getClients, { companies: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.clientData = this.common.data
        })

    }

}
