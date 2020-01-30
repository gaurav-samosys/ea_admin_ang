import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAccessService } from '../admin-access.service';
import * as myGlobals from '../../../../../global';
/*import { EditdialogComponent} from './editdialog/editdialog.component';*/
let EditAdminComponent = class EditAdminComponent {
    constructor(rt, dialogRef, _formBuilder, service, data, dialog) {
        this.rt = rt;
        this.dialogRef = dialogRef;
        this._formBuilder = _formBuilder;
        this.service = service;
        this.data = data;
        this.dialog = dialog;
        this.getClients = myGlobals.getClients;
        this.getCompanies = myGlobals.getCompanies;
        this.editAdminUser = myGlobals.editAdminUser;
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.getCompany();
        this.res_data = this.data;
        console.log(this.res_data);
        // setting value
        // Reactive Form
        this.form = this._formBuilder.group({
            company_name: ['', Validators.required],
            client: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required]],
            password: [''],
        });
        this.form.patchValue({
            first_name: this.res_data.first_name,
            last_name: this.res_data.last_name,
            username: this.res_data.user_name,
            phone: this.res_data.phone_no,
            email: this.res_data.email
        });
        this.form.controls['company_name'].setValue(this.res_data.company_id, { onlySelf: true });
        this.getClient(this.res_data.company_id);
        this.form.controls['username'].disable();
    }
    updateForm() {
        if (this.form.invalid) {
            return false;
        }
        this.form.value.admin_user_id = this.res_data.id;
        this.form.value.token = "LIVESITE";
        this.service.Post(this.editAdminUser, this.form.value)
            .subscribe(res => {
            console.log(res);
            this.common = res;
            this.admin_updatestatus = this.common.success;
            localStorage.setItem("admin_updatestatus", this.admin_updatestatus);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/client-mangement/admin-access"]));
            this.dialogRef.close();
        });
    }
    getCompany() {
        this.service.Post(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.companiesData = this.common.data;
        });
    }
    getClient(value) {
        this.service.Post(this.getClients, { companies: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.clientData = this.common.data;
        });
    }
};
EditAdminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-admin',
        templateUrl: './edit-admin.component.html',
        styleUrls: ['./edit-admin.component.scss']
    }),
    tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Router, MatDialogRef, FormBuilder, AdminAccessService, Object, MatDialog])
], EditAdminComponent);
export { EditAdminComponent };
//# sourceMappingURL=edit-admin.component.js.map