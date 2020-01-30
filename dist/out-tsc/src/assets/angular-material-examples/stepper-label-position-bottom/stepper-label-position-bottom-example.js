import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * @title Stepper label bottom position
 */
let StepperLabelPositionBottomExample = class StepperLabelPositionBottomExample {
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
StepperLabelPositionBottomExample = tslib_1.__decorate([
    Component({
        selector: 'stepper-label-position-bottom-example',
        templateUrl: 'stepper-label-position-bottom-example.html',
        styleUrls: ['stepper-label-position-bottom-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], StepperLabelPositionBottomExample);
export { StepperLabelPositionBottomExample };
//# sourceMappingURL=stepper-label-position-bottom-example.js.map