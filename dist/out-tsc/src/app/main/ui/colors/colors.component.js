import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatColors } from '@fuse/mat-colors';
let ColorsComponent = class ColorsComponent {
    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.colors = MatColors.all;
        this._updateSelectedColor('primary');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Select color
     *
     * @param selected
     */
    selectColor(selected) {
        this._updateSelectedColor(selected.tab.textLabel);
    }
    /**
     * Update selected color
     *
     * @param colorName
     * @private
     */
    _updateSelectedColor(colorName) {
        this.selectedColor = colorName;
        this.selectedColorDefaultValue = MatColors.getColor(this.selectedColor)[500];
    }
};
ColorsComponent = tslib_1.__decorate([
    Component({
        selector: 'colors',
        templateUrl: './colors.component.html',
        styleUrls: ['./colors.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ColorsComponent);
export { ColorsComponent };
//# sourceMappingURL=colors.component.js.map