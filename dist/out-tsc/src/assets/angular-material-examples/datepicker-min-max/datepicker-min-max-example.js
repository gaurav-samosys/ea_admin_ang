import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/** @title Datepicker with min & max validation */
let DatepickerMinMaxExample = class DatepickerMinMaxExample {
    /** @title Datepicker with min & max validation */
    constructor() {
        this.minDate = new Date(2000, 0, 1);
        this.maxDate = new Date(2020, 0, 1);
    }
};
DatepickerMinMaxExample = tslib_1.__decorate([
    Component({
        selector: 'datepicker-min-max-example',
        templateUrl: 'datepicker-min-max-example.html',
        styleUrls: ['datepicker-min-max-example.css'],
    })
], DatepickerMinMaxExample);
export { DatepickerMinMaxExample };
//# sourceMappingURL=datepicker-min-max-example.js.map