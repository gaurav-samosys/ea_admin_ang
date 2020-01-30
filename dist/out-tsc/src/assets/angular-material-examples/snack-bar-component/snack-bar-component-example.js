import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * @title Snack-bar with a custom component
 */
let SnackBarComponentExample = class SnackBarComponentExample {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
        this.durationInSeconds = 5;
    }
    openSnackBar() {
        this._snackBar.openFromComponent(PizzaPartyComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }
};
SnackBarComponentExample = tslib_1.__decorate([
    Component({
        selector: 'snack-bar-component-example',
        templateUrl: 'snack-bar-component-example.html',
        styleUrls: ['snack-bar-component-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar])
], SnackBarComponentExample);
export { SnackBarComponentExample };
let PizzaPartyComponent = class PizzaPartyComponent {
};
PizzaPartyComponent = tslib_1.__decorate([
    Component({
        selector: 'snack-bar-component-example-snack',
        templateUrl: 'snack-bar-component-example-snack.html',
        styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
    })
], PizzaPartyComponent);
export { PizzaPartyComponent };
//# sourceMappingURL=snack-bar-component-example.js.map