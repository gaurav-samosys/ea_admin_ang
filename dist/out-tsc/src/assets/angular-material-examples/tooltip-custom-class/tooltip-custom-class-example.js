import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
/**
 * @title Tooltip that can have a custom class applied.
 */
let TooltipCustomClassExample = class TooltipCustomClassExample {
};
TooltipCustomClassExample = tslib_1.__decorate([
    Component({
        selector: 'tooltip-custom-class-example',
        templateUrl: 'tooltip-custom-class-example.html',
        styleUrls: ['tooltip-custom-class-example.css'],
        // Need to remove view encapsulation so that the custom tooltip style defined in
        // `tooltip-custom-class-example.css` will not be scoped to this component's view.
        encapsulation: ViewEncapsulation.None,
    })
], TooltipCustomClassExample);
export { TooltipCustomClassExample };
//# sourceMappingURL=tooltip-custom-class-example.js.map