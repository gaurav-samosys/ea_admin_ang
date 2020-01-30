import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
let UserEditComponent = class UserEditComponent {
    constructor(toastr, http, rt, dialogRef, _formBuilder, user, data, dialog) {
        this.toastr = toastr;
        this.http = http;
        this.rt = rt;
        this.dialogRef = dialogRef;
        this._formBuilder = _formBuilder;
        this.user = user;
        this.data = data;
        this.dialog = dialog;
        this.editUsers = myGlobals.editUsers;
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.res_data = this.data;
        console.log(this.res_data);
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
    updateForm() {
        if (this.form.invalid) {
            this.dialog.open(EditdialogComponent);
            return false;
        }
        this.user.POST(this.editUsers, { id: this.res_data.id,
            First_name: this.form.value.firstName,
            last_name: this.form.value.lastName,
            email: this.form.value.email,
            phone_no: this.form.value.phone,
            Password: this.form.value.password,
            token: 'LIVESITE' })
            .subscribe(res => {
            console.log(res);
            this.common = res;
            this.status = this.common.status;
            console.log(this.status);
            if (this.status == true) {
                localStorage.setItem("status", this.status);
                this.toastr.success('User Update Successfully');
            }
            else {
                this.toastr.warning('There are some field required');
            }
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/user-mangement/user"]));
            this.dialogRef.close();
        });
    }
    onClose() {
        this.dialogRef.close();
    }
};
UserEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-edit',
        templateUrl: './user-edit.component.html',
        styleUrls: ['./user-edit.component.scss']
    }),
    tslib_1.__param(6, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [ToastrService,
        HttpClient, Router, MatDialogRef, FormBuilder, UserService, Object, MatDialog])
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map