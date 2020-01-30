import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
let AddCompanyComponent = class AddCompanyComponent {
    constructor(toastr, dialogRef, rt, _formBuilder, company) {
        this.toastr = toastr;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.company = company;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.getIndustry = myGlobals.getIndustry;
        this.addCompany = myGlobals.addCompany;
        /**
         * has error
         */
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
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
    onClose() {
        this.dialogRef.close();
    }
    /**
     * get country
     */
    fetchCountry() {
        this.company.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    /**
    * get state
    */
    getState(value) {
        this.company.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
        });
    }
    /**
     * get Industry
     */
    getIndustries() {
        this.company.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.industry = this.common.data;
        });
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
        };
        if (this.form.invalid) {
            return false;
        }
        this.company.Post(this.addCompany, this.formData).subscribe(res => {
            console.log(res);
            this.common = res;
            if (res['success'] == true) {
                this.added_status = this.common.success;
                localStorage.setItem('companystatus', this.added_status);
                this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/dashboards/companies"]));
                this.dialogRef.close();
                this.toastr.success('Added company Successfully');
            }
            else {
                this.toastr.success('There are Some Issue');
            }
        });
    }
};
AddCompanyComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-company',
        templateUrl: './add-company.component.html',
        styleUrls: ['./add-company.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService,
        MatDialogRef, Router, FormBuilder, CompaniesService])
], AddCompanyComponent);
export { AddCompanyComponent };
//# sourceMappingURL=add-company.component.js.map