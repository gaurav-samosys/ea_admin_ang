import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
let ClientsPopupComponent = class ClientsPopupComponent {
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
ClientsPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-clients-popup',
        templateUrl: './clients-popup.component.html',
        styleUrls: ['./clients-popup.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], ClientsPopupComponent);
export { ClientsPopupComponent };
//# sourceMappingURL=clients-popup.component.js.map