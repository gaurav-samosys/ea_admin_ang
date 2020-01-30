import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
let CompaniesPopupComponent = class CompaniesPopupComponent {
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
CompaniesPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-companies-popup',
        templateUrl: './companies-popup.component.html',
        styleUrls: ['./companies-popup.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], CompaniesPopupComponent);
export { CompaniesPopupComponent };
//# sourceMappingURL=companies-popup.component.js.map