import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAccessService } from '../admin-access.service';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent implements OnInit {
  form: FormGroup;
  res_data: any;
  common: any;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  getClients = myGlobals.getClients;
  getCompanies = myGlobals.getCompanies;
  addAdminUser = myGlobals.addAdminUser;
  country: any;
  states: any;
  companiesData: any;
  clientData: any;
  added_status: any;
  formData: any;
  constructor(public toastr: ToastrService, public dialogRef: MatDialogRef<AddadminComponent>, private rt: Router, private _formBuilder: FormBuilder, private service: AdminAccessService) { }

  ngOnInit() {
    this.getCompany();
    this.fetchCountry();
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clienttName: ['', Validators.required],

    });
    // this.form.controls['email'].disable();
    // this.form.patchValue({
    //   email: 'admin@samosys.com'
    // })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  onClose() {
    this.dialogRef.close();
  }

  Addadmin() {
    console.log(this.form.value)
    if (this.form.invalid) {
      return false;
    }
    console.log(this.form.value);
    this.formData = {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      client: this.form.value.clienttName,
      company: this.form.value.companyName,
      token: "LIVESITE"
    }
    console.log(this.formData)
    //  this.service.Post(this.addAdminUser,this.formData)
    this.service.Post(this.addAdminUser, {
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      client: this.form.value.clienttName,
      company: this.form.value.companyName,
      email:this.form.value.email,
      token: "LIVESITE"
    })

      .subscribe(res => {
        this.common = res;
        console.log(this.common)
        this.added_status = this.common.success;
        if (this.common['success'] == true) {
          this.toastr.success('Admin user added Successfully')

          this.dialogRef.close(true);
          localStorage.setItem('adminadded_status', this.added_status)
          this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
            this.rt.navigate(["/apps/client-mangement/admin-access"]));

        }
      })

  }
  fetchCountry() {


    this.service.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }
  getState(value) {
    this.service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }
  getCompany() {

    this.service.Post(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
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
