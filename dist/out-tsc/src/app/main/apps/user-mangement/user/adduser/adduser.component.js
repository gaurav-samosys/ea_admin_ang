import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as myGlobals from '../../../../../global';
let AdduserComponent = class AdduserComponent {
    constructor(dialogRef, rt, _formBuilder, user) {
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.user = user;
        this.getClients = myGlobals.getClients;
        this.getCompanies = myGlobals.getCompanies;
        this.addUsers = myGlobals.addUser;
        this.hasError = (controlName, errorName) => {
            return this.adduserForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.getCompany();
        this.adduserForm = this._formBuilder.group({
            company: ['', Validators.required],
            client: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
        });
    }
    addUser() {
        if (this.adduserForm.invalid) {
            return false;
        }
        console.log(this.adduserForm.value);
        this.adduserForm.value.token = "LIVESITE";
        console.log(this.adduserForm.value);
        this.user.POST(this.addUsers, this.adduserForm.value).subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.common = res;
            this.added_status = this.common.success;
            localStorage.setItem('useradded_status', this.added_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/user-mangement/user"]));
            this.dialogRef.close();
        });
    }
    onClose() {
        this.dialogRef.close();
    }
    getCompany() {
        this.user.POST(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.companiesData = this.common.data;
        });
    }
    getClient(value) {
        this.user.POST(this.getClients, { company_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.clientData = this.common.data;
        });
    }
};
AdduserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-adduser',
        templateUrl: './adduser.component.html',
        styleUrls: ['./adduser.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Router, FormBuilder, UserService])
], AdduserComponent);
export { AdduserComponent };
//# sourceMappingURL=adduser.component.js.map