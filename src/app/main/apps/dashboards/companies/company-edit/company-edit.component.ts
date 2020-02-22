import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  form: FormGroup;
  res_data: any;
  editCompany = myGlobals.editCompany;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  getIndustry = myGlobals.getIndustry;
  getCompanies = myGlobals.getCompanies;state_name: any;
  myModel;
;
  common: any;
  status: any;
  country: any;
  states: any;
  industry: any;
  data: any;
  constructor(
    private toastr: ToastrService, private rt: Router,
     public dialogRef: MatDialogRef<CompanyEditComponent>, 
     private _formBuilder: FormBuilder, private company: CompaniesService,
      @Inject(MAT_DIALOG_DATA) public datas: any, public dialog: MatDialog) {
        this.res_data = this.datas;
    console.log(this.res_data)
  }

  
add_user_restrict1
  ngOnInit(): void {
    
    this.fetchCountry();
    this.getIndustries();
    // setting value

    // Reactive Form
    this.form = this._formBuilder.group({
      company_name: ['', Validators.required],
      password: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      industry: ['', [Validators.required]],
      country: ['', Validators.required],
      add_user_restrict:'',
      //third field add 31/01/20
      // res_add_user: [''], defoult_vertical: [''], client_vertical: ['']

    });
    this.company.Post(this.getCompanies, { token: 'LIVESITE', company_id: this.res_data.id, fields: '*' }).subscribe(res => {
      this.common = res;
      console.log(this.common, "====================")
      this.data = this.common.data;
    //  this.add_user_restrict1= this.data[0].add_user_restrict
      // console.log("get company ============",  this.add_user_restrict1,   this.common," this.data Array==========", this.data )

      this.form.patchValue({
        company_name: this.res_data.company_name,
        first_name: this.data[0].first_name,
        last_name: this.data[0].last_name,
        user_name: this.data[0].user_name,
        city: this.data[0].city,
        phone: this.data[0].phone,
        email: this.data[0].email,
        // add_user_restrict:this.data[0].add_user_restrict
      });
      this.state_name=this.data[0].state_name;
      this.myModel=this.data[0].add_user_restrict == 0 ? true : false
      console.log(this.data[0].state_name, this.state_name,this.data[0].add_user_restrict)
      this.form.controls['add_user_restrict'].setValue(this.data[0].add_user_restrict, { onlySelf: true });
      this.form.controls['state'].setValue(this.data[0].state_name);

      this.form.controls['country'].setValue(this.data[0].country, { onlySelf: true });
      this.form.controls['industry'].setValue(this.data[0].industry, { onlySelf: true });
      this.getcountry(this.data[0].country_id)
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  /**
   * close Dialog
   */
  onClose() {
    this.dialogRef.close();
  }

  /**
   * Update Company Form
   */

  updateForm() {
    if (this.form.invalid) {
      this.dialog.open(EditdialogComponent);
      return false;
    }
    console.log(this.form.value,"==============form value")
    this.form.value.company_id = this.res_data.id;
    this.form.value.add_user_restrict = true?0:1

    this.form.value.token = "LIVESITE";
    this.company.Post(this.editCompany, this.form.value).subscribe(res => {
      console.log(res);
      this.common = res;
      if(res['status']==true){

        this.dialogRef.close(res['status']);
      }
      this.status = this.common.status;
      console.log(this.status)
      if (this.status == true) {

        localStorage.setItem("status", this.status);
      }
      console.log(this.status)
      localStorage.setItem("status", this.status);
      this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
        this.rt.navigate(["/apps/dashboards/companies"]));
      this.dialogRef.close();
      this.toastr.success('Update company Successfully');
      this.ngOnInit();
    })
  }

  /**
   * fetch country
   */
  fetchCountry() {
    this.company.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }

  /**
   * 
   * @param value get states
   */
  getcountry(value) {
    // console.log(value)
    this.company.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data;
      console.log(this.common)
    })
  }

  submitState(value){
    console.log(value)

  }
  /**
   * get Industry
   */
  getIndustries() {
    this.company.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.industry = this.common.data;
    })
  }

}
// city: "ds"
  // company_name: "vista"
  // countries_name: "Brazil"
  // id: 164
  // industries_name: "Consumer Goods / Manufacturing"
  // state_name: "Rio de Janeiro"
  // status: "Active"
  // totalClients: 0