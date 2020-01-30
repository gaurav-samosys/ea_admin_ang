import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Configurable progress-bar
 */
let ProgressBarConfigurableExample = class ProgressBarConfigurableExample {
    /**
     * @title Configurable progress-bar
     */
    constructor() {
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.bufferValue = 75;
    }
};
ProgressBarConfigurableExample = tslib_1.__decorate([
    Component({
        selector: 'progress-bar-configurable-example',
        templateUrl: 'progress-bar-configurable-example.html',
        styleUrls: ['progress-bar-configurable-example.css'],
    })
], ProgressBarConfigurableExample);
export { ProgressBarConfigurableExample };
//# sourceMappingURL=progress-bar-configurable-example.js.map