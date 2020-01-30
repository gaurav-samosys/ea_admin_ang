import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/**
 * @title Dialog elements
 */
let DialogElementsExample = class DialogElementsExample {
    constructor(dialog) {
        this.dialog = dialog;
    }
    openDialog() {
        this.dialog.open(DialogElementsExampleDialog);
    }
};
DialogElementsExample = tslib_1.__decorate([
    Component({
        selector: 'dialog-elements-example',
        templateUrl: 'dialog-elements-example.html',
        styleUrls: ['dialog-elements-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog])
], DialogElementsExample);
export { DialogElementsExample };
let DialogElementsExampleDialog = class DialogElementsExampleDialog {
};
DialogElementsExampleDialog = tslib_1.__decorate([
    Component({
        selector: 'dialog-elements-example-dialog',
        templateUrl: 'dialog-elements-example-dialog.html',
    })
], DialogElementsExampleDialog);
export { DialogElementsExampleDialog };
//# sourceMappingURL=dialog-elements-example.js.map