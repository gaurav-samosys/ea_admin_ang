import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @title Highlight the first autocomplete option
 */
let AutocompleteAutoActiveFirstOptionExample = class AutocompleteAutoActiveFirstOptionExample {
    /**
     * @title Highlight the first autocomplete option
     */
    constructor() {
        this.myControl = new FormControl();
        this.options = ['One', 'Two', 'Three'];
    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
};
AutocompleteAutoActiveFirstOptionExample = tslib_1.__decorate([
    Component({
        selector: 'autocomplete-auto-active-first-option-example',
        templateUrl: 'autocomplete-auto-active-first-option-example.html',
        styleUrls: ['autocomplete-auto-active-first-option-example.css'],
    })
], AutocompleteAutoActiveFirstOptionExample);
export { AutocompleteAutoActiveFirstOptionExample };
//# sourceMappingURL=autocomplete-auto-active-first-option-example.js.map