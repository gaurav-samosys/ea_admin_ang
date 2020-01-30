import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedRightSidebar1Component = class CardedRightSidebar1Component {
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
CardedRightSidebar1Component = tslib_1.__decorate([
    Component({
        selector: 'carded-right-sidebar-1',
        templateUrl: './right-sidebar-1.component.html',
        styleUrls: ['./right-sidebar-1.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedRightSidebar1Component);
export { CardedRightSidebar1Component };
//# sourceMappingURL=right-sidebar-1.component.js.map