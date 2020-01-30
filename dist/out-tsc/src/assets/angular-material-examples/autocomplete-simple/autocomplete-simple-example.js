import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
/**
 * @title Simple autocomplete
 */
let AutocompleteSimpleExample = class AutocompleteSimpleExample {
    /**
     * @title Simple autocomplete
     */
    constructor() {
        this.myControl = new FormControl();
        this.options = ['One', 'Two', 'Three'];
    }
};
AutocompleteSimpleExample = tslib_1.__decorate([
    Component({
        selector: 'autocomplete-simple-example',
        templateUrl: 'autocomplete-simple-example.html',
        styleUrls: ['autocomplete-simple-example.css'],
    })
], AutocompleteSimpleExample);
export { AutocompleteSimpleExample };
//# sourceMappingURL=autocomplete-simple-example.js.map