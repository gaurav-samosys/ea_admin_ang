import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
let UserPopupComponent = class UserPopupComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
        this.res_data = this.data;
    }
    onClose() {
        this.dialogRef.close();
    }
};
UserPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-popup',
        templateUrl: './user-popup.component.html',
        styleUrls: ['./user-popup.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], UserPopupComponent);
export { UserPopupComponent };
//# sourceMappingURL=user-popup.component.js.map