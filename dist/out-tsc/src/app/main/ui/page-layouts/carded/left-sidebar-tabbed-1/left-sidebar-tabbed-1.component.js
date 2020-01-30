import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedLeftSidebarTabbed1Component = class CardedLeftSidebarTabbed1Component {
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
CardedLeftSidebarTabbed1Component = tslib_1.__decorate([
    Component({
        selector: 'carded-left-sidebar-tabbed-1',
        templateUrl: './left-sidebar-tabbed-1.component.html',
        styleUrls: ['./left-sidebar-tabbed-1.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedLeftSidebarTabbed1Component);
export { CardedLeftSidebarTabbed1Component };
//# sourceMappingURL=left-sidebar-tabbed-1.component.js.map