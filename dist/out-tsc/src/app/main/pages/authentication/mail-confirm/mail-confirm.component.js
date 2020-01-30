import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let MailConfirmComponent = class MailConfirmComponent {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
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
};
MailConfirmComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-confirm',
        templateUrl: './mail-confirm.component.html',
        styleUrls: ['./mail-confirm.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], MailConfirmComponent);
export { MailConfirmComponent };
//# sourceMappingURL=mail-confirm.component.js.map