import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
let UserEditComponent = class UserEditComponent {
    constructor(http, rt, dialogRef, _formBuilder, user, data, dialog) {
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
        // setting value
        // Reactive Form
        this.form = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            phone: ['', Validators.required],
            city: ['', Validators.required],
        });
        this.form.patchValue({
            firstName: this.res_data.first_name,
            lastName: this.res_data.last_name,
            username: this.res_data.user_name,
            city: this.res_data.city,
            phone: this.res_data.phone_no
        });
    }
    updateForm() {
        if (this.form.invalid) {
            this.dialog.open(EditdialogComponent);
            return false;
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.http.post(this.editUsers, { id: '49335' }, httpOptions)
            .subscribe(res => {
            console.log(res);
        });
    }
};
UserEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-edit',
        templateUrl: './user-edit.component.html',
        styleUrls: ['./user-edit.component.scss']
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router, MatDialogRef, FormBuilder, UsersService, Object, MatDialog])
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map