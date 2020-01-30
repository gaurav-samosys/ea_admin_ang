import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * @title Basic snack-bar
 */
let SnackBarOverviewExample = class SnackBarOverviewExample {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
    }
    openSnackBar(message, action) {
        this._snackBar.open(message, action, {
            duration: 2000,
        });
    }
};
SnackBarOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'snack-bar-overview-example',
        templateUrl: 'snack-bar-overview-example.html',
        styleUrls: ['snack-bar-overview-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar])
], SnackBarOverviewExample);
export { SnackBarOverviewExample };
//# sourceMappingURL=snack-bar-overview-example.js.map