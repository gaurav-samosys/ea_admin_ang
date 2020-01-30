import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let SimpleRightSidebar4Component = class SimpleRightSidebar4Component {
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
SimpleRightSidebar4Component = tslib_1.__decorate([
    Component({
        selector: 'simple-right-sidebar-4',
        templateUrl: './right-sidebar-4.component.html',
        styleUrls: ['./right-sidebar-4.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FuseSidebarService])
], SimpleRightSidebar4Component);
export { SimpleRightSidebar4Component };
//# sourceMappingURL=right-sidebar-4.component.js.map