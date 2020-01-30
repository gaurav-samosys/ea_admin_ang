import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/** @title Implicit main content with two sidenavs */
let SidenavPositionExample = class SidenavPositionExample {
    /** @title Implicit main content with two sidenavs */
    constructor() {
        this.shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    }
};
SidenavPositionExample = tslib_1.__decorate([
    Component({
        selector: 'sidenav-position-example',
        templateUrl: 'sidenav-position-example.html',
        styleUrls: ['sidenav-position-example.css'],
    })
], SidenavPositionExample);
export { SidenavPositionExample };
//# sourceMappingURL=sidenav-position-example.js.map