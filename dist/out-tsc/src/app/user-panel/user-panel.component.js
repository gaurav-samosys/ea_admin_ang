import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
let UserPanelComponent = class UserPanelComponent {
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
UserPanelComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-panel',
        templateUrl: './user-panel.component.html',
        styleUrls: ['./user-panel.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FuseConfigService])
], UserPanelComponent);
export { UserPanelComponent };
//# sourceMappingURL=user-panel.component.js.map