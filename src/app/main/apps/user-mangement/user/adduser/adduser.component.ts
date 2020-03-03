
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as myGlobals from '../../../../../global';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  adduserForm: FormGroup;
  res_data: any;
  getClients = myGlobals.getClients;
  getCompanies = myGlobals.getCompanies;
  addUsers = myGlobals.addUser;
  client_vertical_list = myGlobals.client_vertical_list
  common: any;
  companiesData: any;
  clientData = [];
  added_status: any;
  client_vertical_id;
  formData: any;
  client_vertical: any;
  client_vertical_name = [];
  constructor(public dialogRef: MatDialogRef<AdduserComponent>, private rt: Router, public _formBuilder: FormBuilder, private user: UserService) { }
  TransunionArray = [
    'CreditView',
    'Free Consumer Disclosure',
  ];
  ngOnInit() {
    // this.adduserForm.patchValue({
    //   free_link: 'https://secure-ocs.transunion.ca/secureocs/credit-agree.html'
    // })

    this.getCompany();
    this.adduserForm = this._formBuilder.group({
      company: ['', Validators.required],
      client: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],

      // email     : ['', [Validators.required,Validators.email]],
      // phone   : ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      clientvertical: '',
      clientvertical1: '',
      free_link: 'https://secure-ocs.transunion.ca/secureocs/credit-agree.html',
      show_transunion_button: ''
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.adduserForm.controls[controlName].hasError(errorName);
  }

  addUser() {
    if (this.adduserForm.invalid) {
      return false;
    }
    // console.log(this.adduserForm.value)

    this.adduserForm.value.token = "LIVESITE";
    // console.log(this.adduserForm.value)
    this.user.POST(this.addUsers, this.adduserForm.value).subscribe(res => {
      this.common = res
      // console.log(this.common)
      if (this.common['success'] == true) {

        // this.added_status = this.common.success;

        // localStorage.setItem('useradded_status', this.added_status)
        this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
          this.rt.navigate(["/apps/user-mangement/user"]));
        this.dialogRef.close(true);
      }
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

    this.user.POST(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.companiesData = this.common.data
    })
  }


  clientDataHidden: number = 0
  getClient(value) {
    // console.log("comp id===========",value)
    this.user.POST(this.getClients, { company_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res;
      // console.log(res)
      this.clientData = this.common.data
      // console.log  (this.clientData)
      if (this.clientData.length == 1) {
        this.clientDataHidden = 1
      }
      // console.log(this.clientData[0].id,this.clientData[0].client_vertical, this.clientData.length)
      // if (this.clientData[0].id == this.client_vertical_id) {
      //   this.client_vertical = this.clientData[0].client_vertical
      //   console.log(this.client_vertical)
      // } else {
      // }
    })

  }
  defaultVerticalArray = []
  disabledArray = []
  changeCLient(id) {
    // console.log("client id===========",id)
    // this.client_vertical_name.push( id)
    // console.log(this.client_vertical_name)
    this.defaultVertical(id)
  }
  hideVertical: number = 0
  defaultVertical(id) {
    this.user.POST(this.client_vertical_list, { client_id: id, token: 'LIVESITE' }).subscribe(res => {
      this.common = res;
      // console.log("client vertical====================",res)
      this.defaultVerticalArray = this.common.data
      // console.log("default vertical array=============",this.defaultVerticalArray)
      this.disabledArray = this.common.disabled
      // console.log("disabled array===========",this.disabledArray)
      // if(this.defaultVerticalArray.length<=1){
      //   this.hideVertical=1
      // }else{
      //   this.hideVertical=0

      // }
    })
  }
}
