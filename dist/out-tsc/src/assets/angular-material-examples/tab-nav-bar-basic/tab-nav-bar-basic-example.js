import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Basic use of the tab nav bar
 */
let TabNavBarBasicExample = class TabNavBarBasicExample {
    /**
     * @title Basic use of the tab nav bar
     */
    constructor() {
        this.links = ['First', 'Second', 'Third'];
        this.activeLink = this.links[0];
        this.background = '';
    }
    toggleBackground() {
        this.background = this.background ? '' : 'primary';
    }
};
TabNavBarBasicExample = tslib_1.__decorate([
    Component({
        selector: 'tab-nav-bar-basic-example',
        templateUrl: 'tab-nav-bar-basic-example.html',
        styleUrls: ['tab-nav-bar-basic-example.css'],
    })
], TabNavBarBasicExample);
export { TabNavBarBasicExample };
//# sourceMappingURL=tab-nav-bar-basic-example.js.map