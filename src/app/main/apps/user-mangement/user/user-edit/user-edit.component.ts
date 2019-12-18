import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  res_data: any;
  editUsers = myGlobals.editUsers;
  common: any;
  status: any;

  constructor(
    private toastr: ToastrService,

    private http: HttpClient, private rt: Router, public dialogRef: MatDialogRef<UserEditComponent>, private _formBuilder: FormBuilder, private user: UserService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {

  }



  ngOnInit(): void {
    this.res_data = this.data;
    console.log(this.res_data)

    // setting value


    // Reactive Form
    this.form = this._formBuilder.group({
      companyName: ['', Validators.required],
      clienttName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      user_name: ['', Validators.required],
      activate_user: [''],
      password: [''],


    });

    this.form.patchValue({
      companyName: this.res_data.company_name,
      clienttName: this.res_data.client_name,
      firstName: this.res_data.first_name,
      lastName: this.res_data.last_name,
      email: this.res_data.email,
      phone: this.res_data.phone_no,
      user_name: this.res_data.user_name

    });
    this.form.controls['companyName'].disable();
    this.form.controls['clienttName'].disable();
    this.form.controls['user_name'].disable();
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  updateForm() {
    if (this.form.invalid) {
      this.dialog.open(EditdialogComponent);
      return false;
    }
    this.user.POST(this.editUsers, { id: this.res_data.id, First_name: this.form.value.firstName, last_name: this.form.value.lastName, email: this.form.value.email, phone_no: this.form.value.phone, Password: this.form.value.password, token: 'LIVESITE' })
      .subscribe(res => {
        console.log(res)

        this.common = res;
        this.status = this.common.status;
        console.log(this.status)
        if (this.status == true) {

          localStorage.setItem("status", this.status);
        }
        this.toastr.success('User Update Successfully');

        this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
          this.rt.navigate(["/apps/user-mangement/user"]));
        this.dialogRef.close();

      });

  }

  onClose() {
    this.dialogRef.close();
  }

}

