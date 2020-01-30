import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
let EditdialogComponent = class EditdialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
    onDismiss() {
        this.dialogRef.close();
    }
};
EditdialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editdialog',
        templateUrl: './editdialog.component.html',
        styleUrls: ['./editdialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], EditdialogComponent);
export { EditdialogComponent };
//# sourceMappingURL=editdialog.component.js.map