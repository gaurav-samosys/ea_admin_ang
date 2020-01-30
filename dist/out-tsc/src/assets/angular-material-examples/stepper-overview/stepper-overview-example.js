import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * @title Stepper overview
 */
let StepperOverviewExample = class StepperOverviewExample {
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.isLinear = false;
    }
    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
};
StepperOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'stepper-overview-example',
        templateUrl: 'stepper-overview-example.html',
        styleUrls: ['stepper-overview-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], StepperOverviewExample);
export { StepperOverviewExample };
//# sourceMappingURL=stepper-overview-example.js.map