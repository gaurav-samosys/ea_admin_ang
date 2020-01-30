import * as tslib_1 from "tslib";
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
let MailNgrxComposeDialogComponent = class MailNgrxComposeDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<MailNgrxComposeDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(matDialogRef, _data, _formBuilder) {
        this.matDialogRef = matDialogRef;
        this._data = _data;
        this._formBuilder = _formBuilder;
        // Set the defaults
        this.composeForm = this.createComposeForm();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Create compose form
     *
     * @returns {FormGroup}
     */
    createComposeForm() {
        return this._formBuilder.group({
            from: {
                value: ['johndoe@creapond.com'],
                disabled: [true]
            },
            to: [''],
            cc: [''],
            bcc: [''],
            subject: [''],
            message: ['']
        });
    }
};
MailNgrxComposeDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx-compose',
        templateUrl: './compose.component.html',
        styleUrls: ['./compose.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, FormBuilder])
], MailNgrxComposeDialogComponent);
export { MailNgrxComposeDialogComponent };
//# sourceMappingURL=compose.component.js.map