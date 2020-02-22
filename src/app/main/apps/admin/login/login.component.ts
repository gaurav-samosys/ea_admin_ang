import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../../auth.service';
import * as myGlobals from '../../../../global';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    login = myGlobals.login;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    common: any;
    show: boolean;
    login_data: any;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private toastr: ToastrService,

        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private rt: Router,
        public login_service: LoginService,
        private auth: AuthService,
        private myRoute: Router,
    ) {
        this.show = false;

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
    ngOnInit(): void {

        if (this.auth.isLoggedIn() == true) {
            this.rt.navigate(['apps/home-dashboard/version3'])
        }
        else {
            this.rt.navigate([''])
        }
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],

            // email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    goback(){
        this.myRoute.navigate(['/apps/admin/forgot'])
    }

    openaddSnackBar() {
        this._snackBar.open('Either email or password is incorrect. !!', 'End now', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
 

    Login() {
        this.login_service.Post(this.login, {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password, role: 0, token: 'LIVESITE'
        })
            .subscribe(res => {
                console.log(res)
                // message: "Either email or password is incorrect."
                // status: false
                if (res['status'] == 'success') {
                    this.common = res;
                    this.login_data = this.common.data
                    console.log(this.common)
                    this.auth.sendToken(this.login_data.auth_secret_key)
                    localStorage.setItem('user_id', this.login_data.id)
                    if (localStorage.getItem("LoggedInUser") == this.login_data.auth_secret_key) {
                        this.toastr.success('Login Successfully');

                        this.myRoute.navigate(["apps/home-dashboard/version3"]);
                    }
                } else {
                    this.toastr.warning("Email or password is incorrect");

                }

            })
    }



    toggleShow() {
        this.show = !this.show;
    }
}

                // this.common=res;
                // this.login_data=this.common.data
                // console.log(this.common)
                // this.auth.sendToken(this.login_data.auth_secret_key)
                // localStorage.setItem('user_id',this.login_data.id)
                // if(localStorage.getItem("LoggedInUser") == this.login_data.auth_secret_key)
                // {
                //     this.toastr.success('Login Successfully');

                //   this.myRoute.navigate(["apps/home-dashboard/version3"]);
                // }