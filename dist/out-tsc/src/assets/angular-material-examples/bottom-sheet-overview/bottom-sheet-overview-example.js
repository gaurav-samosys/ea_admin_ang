import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
/**
 * @title Bottom Sheet Overview
 */
let BottomSheetOverviewExample = class BottomSheetOverviewExample {
    constructor(_bottomSheet) {
        this._bottomSheet = _bottomSheet;
    }
    openBottomSheet() {
        this._bottomSheet.open(BottomSheetOverviewExampleSheet);
    }
};
BottomSheetOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'bottom-sheet-overview-example',
        templateUrl: 'bottom-sheet-overview-example.html',
        styleUrls: ['bottom-sheet-overview-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatBottomSheet])
], BottomSheetOverviewExample);
export { BottomSheetOverviewExample };
let BottomSheetOverviewExampleSheet = class BottomSheetOverviewExampleSheet {
    constructor(_bottomSheetRef) {
        this._bottomSheetRef = _bottomSheetRef;
    }
    openLink(event) {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
};
BottomSheetOverviewExampleSheet = tslib_1.__decorate([
    Component({
        selector: 'bottom-sheet-overview-example-sheet',
        templateUrl: 'bottom-sheet-overview-example-sheet.html',
    }),
    tslib_1.__metadata("design:paramtypes", [MatBottomSheetRef])
], BottomSheetOverviewExampleSheet);
export { BottomSheetOverviewExampleSheet };
//# sourceMappingURL=bottom-sheet-overview-example.js.map