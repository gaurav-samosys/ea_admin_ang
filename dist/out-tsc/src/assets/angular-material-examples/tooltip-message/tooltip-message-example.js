import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/**
 * @title Tooltip with a changing message
 */
let TooltipMessageExample = class TooltipMessageExample {
    /**
     * @title Tooltip with a changing message
     */
    constructor() {
        this.message = new FormControl('Info about the action');
    }
};
TooltipMessageExample = tslib_1.__decorate([
    Component({
        selector: 'tooltip-message-example',
        templateUrl: 'tooltip-message-example.html',
        styleUrls: ['tooltip-message-example.css'],
    })
], TooltipMessageExample);
export { TooltipMessageExample };
//# sourceMappingURL=tooltip-message-example.js.map