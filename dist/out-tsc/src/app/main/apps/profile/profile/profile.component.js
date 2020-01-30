import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import * as myGlobals from '../../../../global';
import { ProfileService } from './profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
let ProfileComponent = class ProfileComponent {
    constructor(toastr, _snackBar, http, profile_service, _formBuilder) {
        this.toastr = toastr;
        this._snackBar = _snackBar;
        this.http = http;
        this.profile_service = profile_service;
        this._formBuilder = _formBuilder;
        this.getProfile = myGlobals.getProfile;
        this.setProfile = myGlobals.setProfile;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.hasError = (controlName, errorName) => {
            return this.profileForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.fetchCountry();
        this.profileForm = this._formBuilder.group({
            user_name: [''],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone_no: ['', Validators.required],
            password: [''],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
        });
        this.profile_service.Post(this.getProfile, { user_id: localStorage.getItem('user_id'), token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.data = this.common.data;
            console.log(this.data);
            this.profileForm.patchValue({
                user_name: this.data[0].user_name,
                first_name: this.data[0].first_name,
                last_name: this.data[0].last_name,
                email: this.data[0].email,
                phone_no: this.data[0].phone_no,
                city: this.data[0].city,
            });
            this.profileForm.controls['country'].setValue(this.data[0].country, { onlySelf: true });
            this.getState(this.data[0].country);
            this.profileForm.controls['state'].setValue(this.data[0].state, { onlySelf: true });
            this.profileForm.controls['user_name'].disable();
        });
    }
    /**
   * Submit Form
   * @param value
   */
    onSubmit() {
        if (this.profileForm.invalid) {
            return false;
        }
        this.profileForm.value.user_id = localStorage.getItem('user_id');
        this.profileForm.value.token = 'LIVESITE';
        console.log(this.profileForm.value);
        this.profile_service.Post(this.setProfile, this.profileForm.value)
            .subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.toastr.success('profile Update Successfully');
        });
    }
    /**
   *
   * @param value get country
   */
    fetchCountry() {
        this.profile_service.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    /**
     *
     * @param value get state
     */
    getState(value) {
        console.log(value);
        this.profile_service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
        });
    }
};
ProfileComponent = tslib_1.__decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService, MatSnackBar, HttpClient, ProfileService, FormBuilder])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map