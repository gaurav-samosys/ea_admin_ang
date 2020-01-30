import * as tslib_1 from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
/**
 * @title Chips with input
 */
let ChipsInputExample = class ChipsInputExample {
    /**
     * @title Chips with input
     */
    constructor() {
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.fruits = [
            { name: 'Lemon' },
            { name: 'Lime' },
            { name: 'Apple' },
        ];
    }
    add(event) {
        const input = event.input;
        const value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    remove(fruit) {
        const index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }
};
ChipsInputExample = tslib_1.__decorate([
    Component({
        selector: 'chips-input-example',
        templateUrl: 'chips-input-example.html',
        styleUrls: ['chips-input-example.css'],
    })
], ChipsInputExample);
export { ChipsInputExample };
//# sourceMappingURL=chips-input-example.js.map