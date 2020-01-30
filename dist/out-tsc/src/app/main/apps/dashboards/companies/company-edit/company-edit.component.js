import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CompaniesService } from '../companies.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
import * as myGlobals from '../../../../../global';
import { ToastrService } from 'ngx-toastr';
let CompanyEditComponent = class CompanyEditComponent {
    constructor(toastr, rt, dialogRef, _formBuilder, company, datas, dialog) {
        this.toastr = toastr;
        this.rt = rt;
        this.dialogRef = dialogRef;
        this._formBuilder = _formBuilder;
        this.company = company;
        this.datas = datas;
        this.dialog = dialog;
        this.editCompany = myGlobals.editCompany;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.getIndustry = myGlobals.getIndustry;
        this.getCompanies = myGlobals.getCompanies;
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
    ;
    // city: "ds"
    // company_name: "vista"
    // countries_name: "Brazil"
    // id: 164
    // industries_name: "Consumer Goods / Manufacturing"
    // state_name: "Rio de Janeiro"
    // status: "Active"
    // totalClients: 0
    ngOnInit() {
        this.res_data = this.datas;
        // console.log(this.res_data)
        this.fetchCountry();
        this.getIndustries();
        // setting value
        // Reactive Form
        this.form = this._formBuilder.group({
            companyName: ['', Validators.required],
            password: [''],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            state: ['', Validators.required],
            industry: ['', [Validators.required]],
            country: ['', Validators.required]
        });
        this.company.Post(this.getCompanies, { token: 'LIVESITE', company_id: this.res_data.id, fields: '*' }).subscribe(res => {
            this.common = res;
            this.data = this.common.data;
            // console.log("get company ============",   this.common," this.data Array==========", this.data )
            this.form.patchValue({
                companyName: this.res_data.company_name,
                firstName: this.data[0].first_name,
                lastName: this.data[0].last_name,
                username: this.data[0].user_name,
                city: this.data[0].city,
                phone: this.data[0].phone,
                email: this.data[0].email,
            });
            this.form.controls['country'].setValue(this.data[0].country, { onlySelf: true });
            this.getState(this.data[0].country_id);
            this.form.controls['industry'].setValue(this.data[0].industry, { onlySelf: true });
        });
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
        this.form.value.company_id = this.res_data.id;
        this.form.value.token = "LIVESITE";
        this.company.Post(this.editCompany, this.form.value).subscribe(res => {
            console.log(res);
            this.common = res;
            this.status = this.common.status;
            console.log(this.status);
            if (this.status == true) {
                localStorage.setItem("status", this.status);
            }
            this.dialogRef.close();
            console.log(this.status);
            localStorage.setItem("status", this.status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/dashboards/companies"]));
            this.dialogRef.close();
            this.toastr.success('Update company Successfully');
        });
    }
    /**
     * fetch country
     */
    fetchCountry() {
        this.company.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    /**
     *
     * @param value get states
     */
    getState(value) {
        // console.log(value)
        this.company.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
            console.log(this.common);
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
};
CompanyEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-company-edit',
        templateUrl: './company-edit.component.html',
        styleUrls: ['./company-edit.component.scss']
    }),
    tslib_1.__param(5, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [ToastrService, Router, MatDialogRef, FormBuilder, CompaniesService, Object, MatDialog])
], CompanyEditComponent);
export { CompanyEditComponent };
//# sourceMappingURL=company-edit.component.js.map