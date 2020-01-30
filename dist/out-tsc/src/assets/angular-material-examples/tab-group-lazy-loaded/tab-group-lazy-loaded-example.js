import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
let TabGroupLazyLoadedExample = class TabGroupLazyLoadedExample {
    /**
     * @title Tab group where the tab content is loaded lazily (when activated)
     */
    constructor() {
        this.tabLoadTimes = [];
    }
    getTimeLoaded(index) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }
        return this.tabLoadTimes[index];
    }
};
TabGroupLazyLoadedExample = tslib_1.__decorate([
    Component({
        selector: 'tab-group-lazy-loaded-example',
        templateUrl: 'tab-group-lazy-loaded-example.html',
        styleUrls: ['tab-group-lazy-loaded-example.css'],
    })
], TabGroupLazyLoadedExample);
export { TabGroupLazyLoadedExample };
//# sourceMappingURL=tab-group-lazy-loaded-example.js.map