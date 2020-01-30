import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
let FormsComponent = class FormsComponent {
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Reactive Form
        this.form = this._formBuilder.group({
            company: [
                {
                    value: 'Google',
                    disabled: true
                }, Validators.required
            ],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            address2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country: ['', Validators.required]
        });
        // Horizontal Stepper form steps
        this.horizontalStepperStep1 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
        this.horizontalStepperStep2 = this._formBuilder.group({
            address: ['', Validators.required]
        });
        this.horizontalStepperStep3 = this._formBuilder.group({
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });
        // Vertical Stepper form stepper
        this.verticalStepperStep1 = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
        this.verticalStepperStep2 = this._formBuilder.group({
            address: ['', Validators.required]
        });
        this.verticalStepperStep3 = this._formBuilder.group({
            city: ['', Validators.required],
            state: ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper() {
        alert('You have finished the horizontal stepper!');
    }
    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper() {
        alert('You have finished the vertical stepper!');
    }
};
FormsComponent = tslib_1.__decorate([
    Component({
        selector: 'forms',
        templateUrl: './forms.component.html',
        styleUrls: ['./forms.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], FormsComponent);
export { FormsComponent };
//# sourceMappingURL=forms.component.js.map