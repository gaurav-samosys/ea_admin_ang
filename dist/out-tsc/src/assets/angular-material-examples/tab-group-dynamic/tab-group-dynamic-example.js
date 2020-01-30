import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/**
 * @title Tab group with dynamically changing tabs
 */
let TabGroupDynamicExample = class TabGroupDynamicExample {
    /**
     * @title Tab group with dynamically changing tabs
     */
    constructor() {
        this.tabs = ['First', 'Second', 'Third'];
        this.selected = new FormControl(0);
    }
    addTab(selectAfterAdding) {
        this.tabs.push('New');
        if (selectAfterAdding) {
            this.selected.setValue(this.tabs.length - 1);
        }
    }
    removeTab(index) {
        this.tabs.splice(index, 1);
    }
};
TabGroupDynamicExample = tslib_1.__decorate([
    Component({
        selector: 'tab-group-dynamic-example',
        templateUrl: 'tab-group-dynamic-example.html',
        styleUrls: ['tab-group-dynamic-example.css'],
    })
], TabGroupDynamicExample);
export { TabGroupDynamicExample };
//# sourceMappingURL=tab-group-dynamic-example.js.map