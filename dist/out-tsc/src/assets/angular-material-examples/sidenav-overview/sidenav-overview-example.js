import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/** @title Basic sidenav */
let SidenavOverviewExample = class SidenavOverviewExample {
    /** @title Basic sidenav */
    constructor() {
        this.shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    }
};
SidenavOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'sidenav-overview-example',
        templateUrl: 'sidenav-overview-example.html',
        styleUrls: ['sidenav-overview-example.css'],
    })
], SidenavOverviewExample);
export { SidenavOverviewExample };
//# sourceMappingURL=sidenav-overview-example.js.map