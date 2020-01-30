import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @title Filter autocomplete
 */
let AutocompleteFilterExample = class AutocompleteFilterExample {
    /**
     * @title Filter autocomplete
     */
    constructor() {
        this.myControl = new FormControl();
        this.options = ['One', 'Two', 'Three'];
    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(startWith(''), map(value => this._filter(value)));
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
};
AutocompleteFilterExample = tslib_1.__decorate([
    Component({
        selector: 'autocomplete-filter-example',
        templateUrl: 'autocomplete-filter-example.html',
        styleUrls: ['autocomplete-filter-example.css'],
    })
], AutocompleteFilterExample);
export { AutocompleteFilterExample };
//# sourceMappingURL=autocomplete-filter-example.js.map