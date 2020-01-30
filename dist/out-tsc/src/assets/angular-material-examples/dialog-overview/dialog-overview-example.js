import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * @title Dialog Overview
 */
let DialogOverviewExample = class DialogOverviewExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
};
DialogOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'dialog-overview-example',
        templateUrl: 'dialog-overview-example.html',
        styleUrls: ['dialog-overview-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog])
], DialogOverviewExample);
export { DialogOverviewExample };
let DialogOverviewExampleDialog = class DialogOverviewExampleDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
DialogOverviewExampleDialog = tslib_1.__decorate([
    Component({
        selector: 'dialog-overview-example-dialog',
        templateUrl: 'dialog-overview-example-dialog.html',
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], DialogOverviewExampleDialog);
export { DialogOverviewExampleDialog };
//# sourceMappingURL=dialog-overview-example.js.map