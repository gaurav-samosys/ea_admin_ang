import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @title Injecting data when opening a dialog
 */
let DialogDataExample = class DialogDataExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        this.dialog.open(DialogDataExampleDialog, {
            data: {
                animal: 'panda'
            }
        });
    }
};
DialogDataExample = tslib_1.__decorate([
    Component({
        selector: 'dialog-data-example',
        templateUrl: 'dialog-data-example.html',
        styleUrls: ['dialog-data-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog])
], DialogDataExample);
export { DialogDataExample };
let DialogDataExampleDialog = class DialogDataExampleDialog {
    constructor(data) {
        this.data = data;
    }
};
DialogDataExampleDialog = tslib_1.__decorate([
    Component({
        selector: 'dialog-data-example-dialog',
        templateUrl: 'dialog-data-example-dialog.html',
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object])
], DialogDataExampleDialog);
export { DialogDataExampleDialog };
//# sourceMappingURL=dialog-data-example.js.map