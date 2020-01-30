import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let LockComponent = class LockComponent {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(_fuseConfigService, _formBuilder) {
        this._fuseConfigService = _fuseConfigService;
        this._formBuilder = _formBuilder;
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
        this.lockForm = this._formBuilder.group({
            username: [
                {
                    value: 'Katherine',
                    disabled: true
                }, Validators.required
            ],
            password: ['', Validators.required]
        });
    }
};
LockComponent = tslib_1.__decorate([
    Component({
        selector: 'lock',
        templateUrl: './lock.component.html',
        styleUrls: ['./lock.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService,
        FormBuilder])
], LockComponent);
export { LockComponent };
//# sourceMappingURL=lock.component.js.map