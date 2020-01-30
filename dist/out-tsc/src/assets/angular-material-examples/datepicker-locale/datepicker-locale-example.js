import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
/** @title Datepicker with different locale */
let DatepickerLocaleExample = class DatepickerLocaleExample {
    constructor(_adapter) {
        this._adapter = _adapter;
    }
    french() {
        this._adapter.setLocale('fr');
    }
};
DatepickerLocaleExample = tslib_1.__decorate([
    Component({
        selector: 'datepicker-locale-example',
        templateUrl: 'datepicker-locale-example.html',
        styleUrls: ['datepicker-locale-example.css'],
        providers: [
            // The locale would typically be provided on the root module of your application. We do it at
            // the component level here, due to limitations of our example generation script.
            { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
            // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
            // `MatMomentDateModule` in your applications root module. We provide it at the component level
            // here, due to limitations of our example generation script.
            { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
            { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        ],
    }),
    tslib_1.__metadata("design:paramtypes", [DateAdapter])
], DatepickerLocaleExample);
export { DatepickerLocaleExample };
//# sourceMappingURL=datepicker-locale-example.js.map