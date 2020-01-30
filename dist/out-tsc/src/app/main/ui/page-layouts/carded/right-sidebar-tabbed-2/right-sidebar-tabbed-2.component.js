import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedRightSidebarTabbed2Component = class CardedRightSidebarTabbed2Component {
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
CardedRightSidebarTabbed2Component = tslib_1.__decorate([
    Component({
        selector: 'carded-right-sidebar-tabbed-2',
        templateUrl: './right-sidebar-tabbed-2.component.html',
        styleUrls: ['./right-sidebar-tabbed-2.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedRightSidebarTabbed2Component);
export { CardedRightSidebarTabbed2Component };
//# sourceMappingURL=right-sidebar-tabbed-2.component.js.map