import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher {
    isErrorState(control, form) {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
/** @title Select with a custom ErrorStateMatcher */
let SelectErrorStateMatcherExample = class SelectErrorStateMatcherExample {
    /** @title Select with a custom ErrorStateMatcher */
    constructor() {
        this.selected = new FormControl('valid', [
            Validators.required,
            Validators.pattern('valid'),
        ]);
        this.selectFormControl = new FormControl('valid', [
            Validators.required,
            Validators.pattern('valid'),
        ]);
        this.nativeSelectFormControl = new FormControl('valid', [
            Validators.required,
            Validators.pattern('valid'),
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
};
SelectErrorStateMatcherExample = tslib_1.__decorate([
    Component({
        selector: 'select-error-state-matcher-example',
        templateUrl: 'select-error-state-matcher-example.html',
        styleUrls: ['select-error-state-matcher-example.css'],
    })
], SelectErrorStateMatcherExample);
export { SelectErrorStateMatcherExample };
//# sourceMappingURL=select-error-state-matcher-example.js.map