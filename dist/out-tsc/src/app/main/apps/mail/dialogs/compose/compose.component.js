import * as tslib_1 from "tslib";
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
let MailComposeDialogComponent = class MailComposeDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<MailComposeDialogComponent>} matDialogRef
     * @param _data
     */
    constructor(matDialogRef, _data) {
        this.matDialogRef = matDialogRef;
        this._data = _data;
        // Set the defaults
        this.composeForm = this.createComposeForm();
        this.showExtraToFields = false;
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
        return new FormGroup({
            from: new FormControl({
                value: 'johndoe@creapond.com',
                disabled: true
            }),
            to: new FormControl(''),
            cc: new FormControl(''),
            bcc: new FormControl(''),
            subject: new FormControl(''),
            message: new FormControl('')
        });
    }
    /**
     * Toggle extra to fields
     */
    toggleExtraToFields() {
        this.showExtraToFields = !this.showExtraToFields;
    }
};
MailComposeDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-compose',
        templateUrl: './compose.component.html',
        styleUrls: ['./compose.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], MailComposeDialogComponent);
export { MailComposeDialogComponent };
//# sourceMappingURL=compose.component.js.map