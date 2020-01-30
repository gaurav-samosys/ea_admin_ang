import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
/**
 * @title Stepper that displays errors in the steps
 */
let StepperErrorsExample = class StepperErrorsExample {
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
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
StepperErrorsExample = tslib_1.__decorate([
    Component({
        selector: 'stepper-errors-example',
        templateUrl: 'stepper-errors-example.html',
        styleUrls: ['stepper-errors-example.css'],
        providers: [{
                provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
            }]
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], StepperErrorsExample);
export { StepperErrorsExample };
//# sourceMappingURL=stepper-errors-example.js.map