import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/** @title Sidenav with configurable mode */
let SidenavModeExample = class SidenavModeExample {
    /** @title Sidenav with configurable mode */
    constructor() {
        this.mode = new FormControl('over');
        this.shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
    }
};
SidenavModeExample = tslib_1.__decorate([
    Component({
        selector: 'sidenav-mode-example',
        templateUrl: 'sidenav-mode-example.html',
        styleUrls: ['sidenav-mode-example.css'],
    })
], SidenavModeExample);
export { SidenavModeExample };
//# sourceMappingURL=sidenav-mode-example.js.map