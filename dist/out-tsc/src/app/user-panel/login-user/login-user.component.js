import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let LoginUserComponent = class LoginUserComponent {
    /**
       * Constructor
       *
       * @param {FuseConfigService} _fuseConfigService
       * @param {FormBuilder} _formBuilder
       */
    constructor(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
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
    ngOnInit() {
    }
};
LoginUserComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login-user',
        templateUrl: './login-user.component.html',
        styleUrls: ['./login-user.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], LoginUserComponent);
export { LoginUserComponent };
//# sourceMappingURL=login-user.component.js.map