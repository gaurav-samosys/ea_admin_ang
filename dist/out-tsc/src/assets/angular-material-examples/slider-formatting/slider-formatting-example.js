import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Slider with custom thumb label formatting.
 */
let SliderFormattingExample = class SliderFormattingExample {
    formatLabel(value) {
        if (!value) {
            return 0;
        }
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    }
};
SliderFormattingExample = tslib_1.__decorate([
    Component({
        selector: 'slider-formatting-example',
        templateUrl: 'slider-formatting-example.html',
        styleUrls: ['slider-formatting-example.css'],
    })
], SliderFormattingExample);
export { SliderFormattingExample };
//# sourceMappingURL=slider-formatting-example.js.map