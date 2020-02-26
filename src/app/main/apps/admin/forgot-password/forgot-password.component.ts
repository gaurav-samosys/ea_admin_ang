import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as myGlobals from '../../../../global';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ForgotService } from 'app/main/apps/admin/forgot/forgot.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { invalid } from 'moment';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
    msgShow: number = 0
    showloader: boolean = true
    bottomMsg: boolean = true
    forgotPasswordForm: FormGroup;
    forgetPassword = myGlobals.forgetPassword;
    common: any;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private service: ForgotService,
        private toastr: ToastrService,
        private myRoute: Router

    ) {
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/)]],

        });
    }

    updatePassword() {
        console.log(this.forgotPasswordForm.value.email)
        var type = "admin"
        // if (this.forgotPasswordForm.invalid) {
        //     // return false
        //     this.msgShow = 1
        //     this.bottomMsg = true
        //     this.showloader = true
        // } else { }

        if (this.forgotPasswordForm.invalid) {
                return false
        }

        this.service.Post(this.forgetPassword, {
            username: this.forgotPasswordForm.value.email, token: 'LIVESITE',
            type: type
        })
            .subscribe(res => {
                this.common = res;
                console.log(this.common)
                if (res['status'] == true) {
                    this.showloader = false
                    this.msgShow = 0
                    this.bottomMsg = false

                    this.toastr.success('password Reset Successfully');
                    this.myRoute.navigate(["/apps/admin/login"]);
                } else {
                    
                    this.bottomMsg = true
                    this.showloader = true
                    setTimeout(() => {
                        this.msgShow = 1
                    }, 500);
                    setTimeout(() => {
                        this.bottomMsg = false
                        this.showloader = false
                    }, 3000);
                    // this.toastr.warning("We could not find an account with that information. Please try searching again, or simply contact us at support@enrichedacademy.com and we’ll be happy to help!");

                }
            })
    }
}
