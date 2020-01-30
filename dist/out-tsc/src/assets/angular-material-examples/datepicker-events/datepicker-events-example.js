import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/** @title Datepicker input and change events */
let DatepickerEventsExample = class DatepickerEventsExample {
    /** @title Datepicker input and change events */
    constructor() {
        this.events = [];
    }
    addEvent(type, event) {
        this.events.push(`${type}: ${event.value}`);
    }
};
DatepickerEventsExample = tslib_1.__decorate([
    Component({
        selector: 'datepicker-events-example',
        templateUrl: 'datepicker-events-example.html',
        styleUrls: ['datepicker-events-example.css'],
    })
], DatepickerEventsExample);
export { DatepickerEventsExample };
//# sourceMappingURL=datepicker-events-example.js.map