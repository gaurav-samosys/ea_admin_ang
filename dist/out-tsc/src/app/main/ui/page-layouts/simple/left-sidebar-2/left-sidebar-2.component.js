import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let SimpleLeftSidebar2Component = class SimpleLeftSidebar2Component {
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
SimpleLeftSidebar2Component = tslib_1.__decorate([
    Component({
        selector: 'simple-left-sidebar-2',
        templateUrl: './left-sidebar-2.component.html',
        styleUrls: ['./left-sidebar-2.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], SimpleLeftSidebar2Component);
export { SimpleLeftSidebar2Component };
//# sourceMappingURL=left-sidebar-2.component.js.map