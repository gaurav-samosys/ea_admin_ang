import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedLeftSidebar1Component = class CardedLeftSidebar1Component {
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
CardedLeftSidebar1Component = tslib_1.__decorate([
    Component({
        selector: 'carded-left-sidebar-1',
        templateUrl: './left-sidebar-1.component.html',
        styleUrls: ['./left-sidebar-1.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedLeftSidebar1Component);
export { CardedLeftSidebar1Component };
//# sourceMappingURL=left-sidebar-1.component.js.map