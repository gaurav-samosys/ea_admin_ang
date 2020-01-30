import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Expansion panel as accordion
 */
let ExpansionStepsExample = class ExpansionStepsExample {
    /**
     * @title Expansion panel as accordion
     */
    constructor() {
        this.step = 0;
    }
    setStep(index) {
        this.step = index;
    }
    nextStep() {
        this.step++;
    }
    prevStep() {
        this.step--;
    }
};
ExpansionStepsExample = tslib_1.__decorate([
    Component({
        selector: 'expansion-steps-example',
        templateUrl: 'expansion-steps-example.html',
        styleUrls: ['expansion-steps-example.css'],
    })
], ExpansionStepsExample);
export { ExpansionStepsExample };
//# sourceMappingURL=expansion-steps-example.js.map