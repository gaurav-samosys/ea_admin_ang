import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/**
 * @title Tooltip with a show and hide delay
 */
let TooltipDelayExample = class TooltipDelayExample {
    /**
     * @title Tooltip with a show and hide delay
     */
    constructor() {
        this.showDelay = new FormControl(1000);
        this.hideDelay = new FormControl(2000);
    }
};
TooltipDelayExample = tslib_1.__decorate([
    Component({
        selector: 'tooltip-delay-example',
        templateUrl: 'tooltip-delay-example.html',
        styleUrls: ['tooltip-delay-example.css'],
    })
], TooltipDelayExample);
export { TooltipDelayExample };
//# sourceMappingURL=tooltip-delay-example.js.map