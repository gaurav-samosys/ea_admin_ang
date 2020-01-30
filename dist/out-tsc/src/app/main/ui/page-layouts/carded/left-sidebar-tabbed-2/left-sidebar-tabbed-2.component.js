import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedLeftSidebarTabbed2Component = class CardedLeftSidebarTabbed2Component {
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
CardedLeftSidebarTabbed2Component = tslib_1.__decorate([
    Component({
        selector: 'carded-left-sidebar-tabbed-2',
        templateUrl: './left-sidebar-tabbed-2.component.html',
        styleUrls: ['./left-sidebar-tabbed-2.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedLeftSidebarTabbed2Component);
export { CardedLeftSidebarTabbed2Component };
//# sourceMappingURL=left-sidebar-tabbed-2.component.js.map