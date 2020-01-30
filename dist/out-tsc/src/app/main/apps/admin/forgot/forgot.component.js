import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ForgotService } from './forgot.service';
import * as myGlobals from '../../../../global';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let ForgotComponent = class ForgotComponent {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(_fuseConfigService, _formBuilder, service) {
        this._fuseConfigService = _fuseConfigService;
        this._formBuilder = _formBuilder;
        this.service = service;
        this.forgetPassword = myGlobals.forgetPassword;
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }
    updatePassword() {
        console.log(this.forgotPasswordForm.value.email);
        this.service.Post(this.forgetPassword, { email: this.forgotPasswordForm.value.email, token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            console.log(this.common);
        });
    }
};
ForgotComponent = tslib_1.__decorate([
    Component({
        selector: 'app-forgot',
        templateUrl: './forgot.component.html',
        styleUrls: ['./forgot.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService,
        FormBuilder,
        ForgotService])
], ForgotComponent);
export { ForgotComponent };
//# sourceMappingURL=forgot.component.js.map