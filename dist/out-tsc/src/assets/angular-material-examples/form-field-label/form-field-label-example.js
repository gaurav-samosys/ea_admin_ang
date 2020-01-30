import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
/** @title Form field with label */
let FormFieldLabelExample = class FormFieldLabelExample {
    constructor(fb) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
    }
};
FormFieldLabelExample = tslib_1.__decorate([
    Component({
        selector: 'form-field-label-example',
        templateUrl: 'form-field-label-example.html',
        styleUrls: ['form-field-label-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], FormFieldLabelExample);
export { FormFieldLabelExample };
//# sourceMappingURL=form-field-label-example.js.map