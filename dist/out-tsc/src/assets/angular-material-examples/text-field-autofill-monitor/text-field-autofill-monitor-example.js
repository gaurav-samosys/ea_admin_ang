import * as tslib_1 from "tslib";
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, ElementRef, ViewChild } from '@angular/core';
/** @title Monitoring autofill state with AutofillMonitor */
let TextFieldAutofillMonitorExample = class TextFieldAutofillMonitorExample {
    constructor(_autofill) {
        this._autofill = _autofill;
    }
    ngAfterViewInit() {
        this._autofill.monitor(this.firstName)
            .subscribe(e => this.firstNameAutofilled = e.isAutofilled);
        this._autofill.monitor(this.lastName)
            .subscribe(e => this.lastNameAutofilled = e.isAutofilled);
    }
    ngOnDestroy() {
        this._autofill.stopMonitoring(this.firstName);
        this._autofill.stopMonitoring(this.lastName);
    }
};
tslib_1.__decorate([
    ViewChild('first', { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], TextFieldAutofillMonitorExample.prototype, "firstName", void 0);
tslib_1.__decorate([
    ViewChild('last', { read: ElementRef, static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], TextFieldAutofillMonitorExample.prototype, "lastName", void 0);
TextFieldAutofillMonitorExample = tslib_1.__decorate([
    Component({
        selector: 'text-field-autofill-monitor-example',
        templateUrl: './text-field-autofill-monitor-example.html',
        styleUrls: ['./text-field-autofill-monitor-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [AutofillMonitor])
], TextFieldAutofillMonitorExample);
export { TextFieldAutofillMonitorExample };
//# sourceMappingURL=text-field-autofill-monitor-example.js.map