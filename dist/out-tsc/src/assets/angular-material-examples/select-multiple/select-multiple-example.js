import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/** @title Select with multiple selection */
let SelectMultipleExample = class SelectMultipleExample {
    /** @title Select with multiple selection */
    constructor() {
        this.toppings = new FormControl();
        this.toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    }
};
SelectMultipleExample = tslib_1.__decorate([
    Component({
        selector: 'select-multiple-example',
        templateUrl: 'select-multiple-example.html',
        styleUrls: ['select-multiple-example.css'],
    })
], SelectMultipleExample);
export { SelectMultipleExample };
//# sourceMappingURL=select-multiple-example.js.map