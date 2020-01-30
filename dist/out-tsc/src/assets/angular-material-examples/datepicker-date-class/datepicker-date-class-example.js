import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
/** @title Datepicker with custom date classes */
let DatepickerDateClassExample = class DatepickerDateClassExample {
    /** @title Datepicker with custom date classes */
    constructor() {
        this.dateClass = (d) => {
            const date = d.date();
            // Highlight the 1st and 20th day of each month.
            return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
        };
    }
};
DatepickerDateClassExample = tslib_1.__decorate([
    Component({
        selector: 'datepicker-date-class-example',
        templateUrl: 'datepicker-date-class-example.html',
        styleUrls: ['datepicker-date-class-example.css'],
        encapsulation: ViewEncapsulation.None,
    })
], DatepickerDateClassExample);
export { DatepickerDateClassExample };
//# sourceMappingURL=datepicker-date-class-example.js.map