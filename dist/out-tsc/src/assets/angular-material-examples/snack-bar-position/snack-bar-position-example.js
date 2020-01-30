import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatSnackBar, } from '@angular/material/snack-bar';
/**
 * @title Snack-bar with configurable position
 */
let SnackBarPositionExample = class SnackBarPositionExample {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
        this.horizontalPosition = 'start';
        this.verticalPosition = 'bottom';
    }
    openSnackBar() {
        this._snackBar.open('Canonball!!', 'End now', {
            duration: 500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
};
SnackBarPositionExample = tslib_1.__decorate([
    Component({
        selector: 'snack-bar-position-example',
        templateUrl: 'snack-bar-position-example.html',
        styleUrls: ['snack-bar-position-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar])
], SnackBarPositionExample);
export { SnackBarPositionExample };
//# sourceMappingURL=snack-bar-position-example.js.map