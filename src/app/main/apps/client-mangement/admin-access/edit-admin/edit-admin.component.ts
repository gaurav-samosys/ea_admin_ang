import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAccessService } from '../admin-access.service';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
/*import { EditdialogComponent} from './editdialog/editdialog.component';*/

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  form: FormGroup;
  res_data: any;
  common: any;
  companiesData: any;
  clientData: any;
  getClients = myGlobals.getClients;
  getCompanies = myGlobals.getCompanies;
  editAdminUser = myGlobals.editAdminUser;
  admin_updatestatus: any;
  ClientName;
  // client_name: any;
  constructor(
    public toasr: ToastrService, private rt: Router, public dialogRef: MatDialogRef<EditAdminComponent>,
    private _formBuilder: FormBuilder, private service: AdminAccessService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    console.log(data)
      // Reactive Form
      this.form = this._formBuilder.group({
        company_name: ['', Validators.required],
        client_name: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required]],
        password: [''],
        /*    state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required]*/
      });
  }



  ngOnInit(): void {
    this.getCompany();
    this.res_data = this.data;
    console.log(this.res_data)
    this.form.patchValue({
      first_name: this.res_data.first_name,
      last_name: this.res_data.last_name,
      username: this.res_data.user_name,
      password: this.res_data.password,
      email: this.res_data.email,
      client_name:this.res_data.client_name,
    });
    // client_name
    this.ClientName=this.res_data.client_name
    console.log(this.res_data.client_id,  this.ClientName)
    
    this.form.controls['company_name'].setValue(this.res_data.company_id, { onlySelf: true });
    this.form.controls['client_name'].setValue(this.res_data.client_name, { onlySelf: true });

    this.getClient(this.res_data.company_id);
    this.form.controls['username'].disable();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  onClose() {
    this.dialogRef.close();
  }

  updateForm() {
    if (this.form.invalid) {
      return false;
    }

let item={
      first_name: this.res_data.first_name,
      last_name: this.res_data.last_name,
      username: this.res_data.user_name,
      password: this.res_data.password,
      email: this.res_data.email,
}
    this.form.value.admin_user_id = this.res_data.id;
    this.form.value.token = "LIVESITE";
    this.service.Post(this.editAdminUser, this.form.value)
      .subscribe(res => {
        console.log(res)

        this.common = res;
        this.admin_updatestatus = this.common.success;
        if (this.common['success'] == true) {
          this.toasr.success('Admin User Update SuccessFully')
          this.dialogRef.close(true);
        }
        localStorage.setItem("admin_updatestatus", this.admin_updatestatus);

        this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
          this.rt.navigate(["/apps/client-mangement/admin-access"]));

      });
  }

  getCompany() {

    this.service.Post(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.companiesData = this.common.data
    })
  }



  getClient(value) {
    console.log(value)
    this.service.Post(this.getClients, { companies: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res;
      this.clientData = this.common.data
      console.log( this.clientData)
    })

  }
  setClient(value) {
    console.log(value)
  }

}
