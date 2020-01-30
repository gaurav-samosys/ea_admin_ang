import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
let ClientPopupComponent = class ClientPopupComponent {
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
ClientPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-clients-popup',
        templateUrl: './client-popup.component.html',
        styleUrls: ['./client-popup.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], ClientPopupComponent);
export { ClientPopupComponent };
//# sourceMappingURL=client-popup.component.js.map