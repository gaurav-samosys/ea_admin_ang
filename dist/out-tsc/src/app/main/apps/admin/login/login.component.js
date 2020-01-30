import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../../auth.service';
import * as myGlobals from '../../../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let LoginComponent = class LoginComponent {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(_fuseConfigService, _formBuilder, _snackBar, rt, login_service, auth, myRoute) {
        this._fuseConfigService = _fuseConfigService;
        this._formBuilder = _formBuilder;
        this._snackBar = _snackBar;
        this.rt = rt;
        this.login_service = login_service;
        this.auth = auth;
        this.myRoute = myRoute;
        this.login = myGlobals.login;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        if (this.auth.isLoggedIn() == true) {
            this.rt.navigate(['apps/home-dashboard/version3']);
        }
        else {
            this.rt.navigate(['']);
        }
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    openaddSnackBar() {
        this._snackBar.open('Either email or password is incorrect. !!', 'End now', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    Login() {
        this.login_service.Post(this.login, { email: this.loginForm.value.email, password: this.loginForm.value.password, role: 0, token: 'LIVESITE' })
            .subscribe(res => {
            console.log(res);
            this.common = res;
            this.login_data = this.common.data;
            console.log(this.common);
            this.auth.sendToken(this.login_data.auth_secret_key);
            localStorage.setItem('user_id', this.login_data.id);
            if (localStorage.getItem("LoggedInUser") == this.login_data.auth_secret_key) {
                this.myRoute.navigate(["apps/home-dashboard/version3"]);
            }
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService,
        FormBuilder,
        MatSnackBar,
        Router,
        LoginService,
        AuthService,
        Router])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map