import * as tslib_1 from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
/**
 * @title Chips Autocomplete
 */
let ChipsAutocompleteExample = class ChipsAutocompleteExample {
    constructor() {
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.fruitCtrl = new FormControl();
        this.fruits = ['Lemon'];
        this.allFruits = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(startWith(null), map((fruit) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    }
    add(event) {
        // Add fruit only when MatAutocomplete is not open
        // To make sure this does not conflict with OptionSelected Event
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;
            // Add our fruit
            if ((value || '').trim()) {
                this.fruits.push(value.trim());
            }
            // Reset the input value
            if (input) {
                input.value = '';
            }
            this.fruitCtrl.setValue(null);
        }
    }
    remove(fruit) {
        const index = this.fruits.indexOf(fruit);
        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }
    selected(event) {
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
};
tslib_1.__decorate([
    ViewChild('fruitInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], ChipsAutocompleteExample.prototype, "fruitInput", void 0);
tslib_1.__decorate([
    ViewChild('auto', { static: false }),
    tslib_1.__metadata("design:type", MatAutocomplete)
], ChipsAutocompleteExample.prototype, "matAutocomplete", void 0);
ChipsAutocompleteExample = tslib_1.__decorate([
    Component({
        selector: 'chips-autocomplete-example',
        templateUrl: 'chips-autocomplete-example.html',
        styleUrls: ['chips-autocomplete-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ChipsAutocompleteExample);
export { ChipsAutocompleteExample };
//# sourceMappingURL=chips-autocomplete-example.js.map