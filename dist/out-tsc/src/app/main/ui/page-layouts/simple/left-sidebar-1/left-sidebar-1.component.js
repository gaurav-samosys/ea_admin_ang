import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let SimpleLeftSidebar1Component = class SimpleLeftSidebar1Component {
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
SimpleLeftSidebar1Component = tslib_1.__decorate([
    Component({
        selector: 'simple-left-sidebar-1',
        templateUrl: './left-sidebar-1.component.html',
        styleUrls: ['./left-sidebar-1.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], SimpleLeftSidebar1Component);
export { SimpleLeftSidebar1Component };
//# sourceMappingURL=left-sidebar-1.component.js.map