import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/**
 * @title Dialog with header, scrollable content and actions
 */
let DialogContentExample = class DialogContentExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
};
DialogContentExample = tslib_1.__decorate([
    Component({
        selector: 'dialog-content-example',
        templateUrl: 'dialog-content-example.html',
        styleUrls: ['dialog-content-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog])
], DialogContentExample);
export { DialogContentExample };
let DialogContentExampleDialog = class DialogContentExampleDialog {
};
DialogContentExampleDialog = tslib_1.__decorate([
    Component({
        selector: 'dialog-content-example-dialog',
        templateUrl: 'dialog-content-example-dialog.html',
    })
], DialogContentExampleDialog);
export { DialogContentExampleDialog };
//# sourceMappingURL=dialog-content-example.js.map