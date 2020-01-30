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
/** @title Input with a custom ErrorStateMatcher */
let InputErrorStateMatcherExample = class InputErrorStateMatcherExample {
    /** @title Input with a custom ErrorStateMatcher */
    constructor() {
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
};
InputErrorStateMatcherExample = tslib_1.__decorate([
    Component({
        selector: 'input-error-state-matcher-example',
        templateUrl: './input-error-state-matcher-example.html',
        styleUrls: ['./input-error-state-matcher-example.css'],
    })
], InputErrorStateMatcherExample);
export { InputErrorStateMatcherExample };
//# sourceMappingURL=input-error-state-matcher-example.js.map