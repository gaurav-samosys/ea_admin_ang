import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminAccessService } from '../admin-access.service';
import * as myGlobals from '../../../../../global';
let AddadminComponent = class AddadminComponent {
    constructor(dialogRef, rt, _formBuilder, service) {
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.service = service;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.getClients = myGlobals.getClients;
        this.getCompanies = myGlobals.getCompanies;
        this.addAdminUser = myGlobals.addAdminUser;
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
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
        this.form.controls['email'].disable();
        this.form.patchValue({
            email: 'admin@samosys.com'
        });
    }
    onClose() {
        this.dialogRef.close();
    }
    Addadmin() {
        console.log(this.form.value);
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
        };
        console.log(this.formData);
        this.service.Post(this.addAdminUser, this.formData)
            .subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.added_status = this.common.success;
            localStorage.setItem('adminadded_status', this.added_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/client-mangement/admin-access"]));
            this.dialogRef.close();
        });
    }
    fetchCountry() {
        this.service.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    getState(value) {
        this.service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
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
AddadminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addadmin',
        templateUrl: './addadmin.component.html',
        styleUrls: ['./addadmin.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Router, FormBuilder, AdminAccessService])
], AddadminComponent);
export { AddadminComponent };
//# sourceMappingURL=addadmin.component.js.map