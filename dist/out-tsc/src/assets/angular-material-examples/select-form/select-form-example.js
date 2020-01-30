import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Select in a form
 */
let SelectFormExample = class SelectFormExample {
    /**
     * @title Select in a form
     */
    constructor() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        this.cars = [
            { value: 'volvo', viewValue: 'Volvo' },
            { value: 'saab', viewValue: 'Saab' },
            { value: 'mercedes', viewValue: 'Mercedes' }
        ];
    }
};
SelectFormExample = tslib_1.__decorate([
    Component({
        selector: 'select-form-example',
        templateUrl: 'select-form-example.html',
        styleUrls: ['select-form-example.css'],
    })
], SelectFormExample);
export { SelectFormExample };
//# sourceMappingURL=select-form-example.js.map