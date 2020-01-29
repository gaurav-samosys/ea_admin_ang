import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  form: FormGroup;
  res_data: any;
  common: any;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  getIndustry = myGlobals.getIndustry;
  addCompany = myGlobals.addCompany;
  country: any;
  states: any;
  formData: any;
  industry: any;
  added_status: any;
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddCompanyComponent>, private rt: Router, private _formBuilder: FormBuilder, private company: CompaniesService) { }

  ngOnInit() {
    this.fetchCountry();
    this.getIndustries();
    this.form = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      industry: ['', [Validators.required]],

    });
  }

  /**
   * has error
   */
  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  onClose() {
    this.dialogRef.close();
  }

  /**
   * get country
   */
  fetchCountry() {
    this.company.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }

   /**
   * get state
   */

  getState(value) {
    this.company.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }

  /**
   * get Industry
   */
  getIndustries() {
    this.company.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.industry = this.common.data
    })
  }

  /**
   * update form
   */
  updateForm() {
    this.formData = {
      company_name: this.form.value.companyname,
      first_name: this.form.value.firstName,
      last_name: this.form.value.lastName,
      email: this.form.value.email,
      Phone: this.form.value.phone,
      country: this.form.value.country,
      state: this.form.value.state,
      city: this.form.value.city,
      industry: this.form.value.industry,
      token: "LIVESITE"
    }
    if (this.form.invalid) {
      return false;
    }
    this.company.Post(this.addCompany, this.formData).subscribe(res => {
      console.log(res)
      this.common = res
      if(res['success']==true){
      this.added_status = this.common.success;

      localStorage.setItem('companystatus', this.added_status)

      this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
        this.rt.navigate(["/apps/dashboards/companies"]));
      this.dialogRef.close();
      this.toastr.success('Added company Successfully');
      }else{
        this.toastr.success('There are Some Issue');

      }
    })
  }
}
