import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
/**
 * @title Plain input autocomplete
 */
let PlainInputAutocompleteExample = class PlainInputAutocompleteExample {
    /**
     * @title Plain input autocomplete
     */
    constructor() {
        this.control = new FormControl();
        this.streets = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
    }
    ngOnInit() {
        this.filteredStreets = this.control.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
    }
    _filter(value) {
        const filterValue = this._normalizeValue(value);
        return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
    }
    _normalizeValue(value) {
        return value.toLowerCase().replace(/\s/g, '');
    }
};
PlainInputAutocompleteExample = tslib_1.__decorate([
    Component({
        selector: 'autocomplete-plain-input-example',
        templateUrl: 'autocomplete-plain-input-example.html',
        styleUrls: ['autocomplete-plain-input-example.css'],
    })
], PlainInputAutocompleteExample);
export { PlainInputAutocompleteExample };
//# sourceMappingURL=autocomplete-plain-input-example.js.map