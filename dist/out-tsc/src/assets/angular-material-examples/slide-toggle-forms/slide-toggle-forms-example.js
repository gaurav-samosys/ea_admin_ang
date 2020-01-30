import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * @title Slide-toggle with forms
 */
let SlideToggleFormsExample = class SlideToggleFormsExample {
    constructor(formBuilder) {
        this.isChecked = true;
        this.formGroup = formBuilder.group({
            enableWifi: '',
            acceptTerms: ['', Validators.requiredTrue]
        });
    }
    onFormSubmit() {
        alert(JSON.stringify(this.formGroup.value, null, 2));
    }
};
SlideToggleFormsExample = tslib_1.__decorate([
    Component({
        selector: 'slide-toggle-forms-example',
        templateUrl: './slide-toggle-forms-example.html',
        styleUrls: ['./slide-toggle-forms-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], SlideToggleFormsExample);
export { SlideToggleFormsExample };
//# sourceMappingURL=slide-toggle-forms-example.js.map