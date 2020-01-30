import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
let UserConfirmboxComponent = class UserConfirmboxComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }
    onConfirm() {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
};
UserConfirmboxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-confirmbox',
        templateUrl: './user-confirmbox.component.html',
        styleUrls: ['./user-confirmbox.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], UserConfirmboxComponent);
export { UserConfirmboxComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=user-confirmbox.component.js.map