import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService }    from '../user.service';
import * as myGlobals from '../../../../../global';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
adduserForm: FormGroup;
res_data:any;
 getClients = myGlobals.getClients;
 getCompanies = myGlobals.getCompanies;
 addUsers = myGlobals.addUser;
    common:any;
    companiesData:any;
    clientData:any;
    added_status:any;
    formData:any;
  constructor(public dialogRef: MatDialogRef<AdduserComponent>,private rt:Router,public _formBuilder: FormBuilder,private user:UserService) { }
  TransunionArray = [
    'CreditView' ,
    'Free Consumer Disclosure',
  ];
  ngOnInit() {
    // this.adduserForm.patchValue({
    //   free_link: 'https://secure-ocs.transunion.ca/secureocs/credit-agree.html'
    // })

  	this.getCompany();
  	   this.adduserForm = this._formBuilder.group({
            company : ['', Validators.required],
            client  : ['', Validators.required],
            first_name  : ['', Validators.required],
            last_name  : ['', Validators.required],
            email: ['', [Validators.required, Validators.email, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],

            // email     : ['', [Validators.required,Validators.email]],
            // phone   : ['', Validators.required],
            phone: ['',  [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
            clientvertical:'',
            clientvertical1:'',
            free_link:'https://secure-ocs.transunion.ca/secureocs/credit-agree.html'
        });
  }

           public hasError = (controlName: string, errorName: string) =>{
              return this.adduserForm.controls[controlName].hasError(errorName);
            }
         
  addUser(){
    if(this.adduserForm.invalid){
      return false;
    }
   console.log(this.adduserForm.value)

         this.adduserForm.value.token="LIVESITE";
         console.log(this.adduserForm.value)
        this.user.POST(this.addUsers,this.adduserForm.value).subscribe(res => {
            this.common = res
            console.log(this.common)

                this.common=res
    this.added_status=this.common.success;
   
     localStorage.setItem('useradded_status',this.added_status)
          this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/user-mangement/user"]));
    this.dialogRef.close();
        })
  }

  show_transunion
  radioChange(value) {
    if (value) {
      this.show_transunion = value
    }
  }

    onClose() {
    this.dialogRef.close();
  }
  
   getCompany() {

        this.user.POST(this.getCompanies, {token: 'LIVESITE' }).subscribe(res => {
            this.common = res
            this.companiesData = this.common.data
        })
        }



    getClient(value) {
        this.user.POST(this.getClients, { company_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            console.log(res)

            this.clientData = this.common.data
        })

    }
}
