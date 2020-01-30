import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let CardedLeftSidebar2Component = class CardedLeftSidebar2Component {
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
CardedLeftSidebar2Component = tslib_1.__decorate([
    Component({
        selector: 'carded-left-sidebar-2',
        templateUrl: './left-sidebar-2.component.html',
        styleUrls: ['./left-sidebar-2.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], CardedLeftSidebar2Component);
export { CardedLeftSidebar2Component };
//# sourceMappingURL=left-sidebar-2.component.js.map