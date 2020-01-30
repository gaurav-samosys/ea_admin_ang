import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
/** @title Form field theming */
let FormFieldThemingExample = class FormFieldThemingExample {
    constructor(fb) {
        this.options = fb.group({
            color: 'primary',
            fontSize: [16, Validators.min(10)],
        });
    }
    getFontSize() {
        return Math.max(10, this.options.value.fontSize);
    }
};
FormFieldThemingExample = tslib_1.__decorate([
    Component({
        selector: 'form-field-theming-example',
        templateUrl: 'form-field-theming-example.html',
        styleUrls: ['form-field-theming-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], FormFieldThemingExample);
export { FormFieldThemingExample };
//# sourceMappingURL=form-field-theming-example.js.map