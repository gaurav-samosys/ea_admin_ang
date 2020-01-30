import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/** @title Datepicker with filter validation */
let DatepickerFilterExample = class DatepickerFilterExample {
    /** @title Datepicker with filter validation */
    constructor() {
        this.myFilter = (d) => {
            const day = d.getDay();
            // Prevent Saturday and Sunday from being selected.
            return day !== 0 && day !== 6;
        };
    }
};
DatepickerFilterExample = tslib_1.__decorate([
    Component({
        selector: 'datepicker-filter-example',
        templateUrl: 'datepicker-filter-example.html',
        styleUrls: ['datepicker-filter-example.css'],
    })
], DatepickerFilterExample);
export { DatepickerFilterExample };
//# sourceMappingURL=datepicker-filter-example.js.map