import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
/**
 * @title Tooltip with a show and hide delay
 */
let TooltipModifiedDefaultsExample = class TooltipModifiedDefaultsExample {
};
TooltipModifiedDefaultsExample = tslib_1.__decorate([
    Component({
        selector: 'tooltip-modified-defaults-example',
        templateUrl: 'tooltip-modified-defaults-example.html',
        styleUrls: ['tooltip-modified-defaults-example.css'],
        providers: [
            { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
        ],
    })
], TooltipModifiedDefaultsExample);
export { TooltipModifiedDefaultsExample };
//# sourceMappingURL=tooltip-modified-defaults-example.js.map