import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedRightSidebar2Component = class CardedRightSidebar2Component {
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(_fuseSidebarService) {
        this._fuseSidebarService = _fuseSidebarService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
};
CardedRightSidebar2Component = tslib_1.__decorate([
    Component({
        selector: 'carded-right-sidebar-2',
        templateUrl: './right-sidebar-2.component.html',
        styleUrls: ['./right-sidebar-2.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedRightSidebar2Component);
export { CardedRightSidebar2Component };
//# sourceMappingURL=right-sidebar-2.component.js.map