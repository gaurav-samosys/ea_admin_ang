import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
/**
 * @title Display value autocomplete
 */
let AutocompleteDisplayExample = class AutocompleteDisplayExample {
    /**
     * @title Display value autocomplete
     */
    constructor() {
        this.myControl = new FormControl();
        this.options = [
            { name: 'Mary' },
            { name: 'Shelley' },
            { name: 'Igor' }
        ];
    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(startWith(''), map(value => typeof value === 'string' ? value : value.name), map(name => name ? this._filter(name) : this.options.slice()));
    }
    displayFn(user) {
        return user ? user.name : undefined;
    }
    _filter(name) {
        const filterValue = name.toLowerCase();
        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
};
AutocompleteDisplayExample = tslib_1.__decorate([
    Component({
        selector: 'autocomplete-display-example',
        templateUrl: 'autocomplete-display-example.html',
        styleUrls: ['autocomplete-display-example.css'],
    })
], AutocompleteDisplayExample);
export { AutocompleteDisplayExample };
//# sourceMappingURL=autocomplete-display-example.js.map