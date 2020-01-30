import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let SimpleLeftSidebar4Component = class SimpleLeftSidebar4Component {
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
SimpleLeftSidebar4Component = tslib_1.__decorate([
    Component({
        selector: 'simple-left-sidebar-4',
        templateUrl: './left-sidebar-4.component.html',
        styleUrls: ['./left-sidebar-4.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], SimpleLeftSidebar4Component);
export { SimpleLeftSidebar4Component };
//# sourceMappingURL=left-sidebar-4.component.js.map