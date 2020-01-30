import * as tslib_1 from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
/** @title Monitoring focus with FocusMonitor */
let FocusMonitorOverviewExample = class FocusMonitorOverviewExample {
    constructor(_focusMonitor, _cdr, _ngZone) {
        this._focusMonitor = _focusMonitor;
        this._cdr = _cdr;
        this._ngZone = _ngZone;
        this.elementOrigin = this.formatOrigin(null);
        this.subtreeOrigin = this.formatOrigin(null);
    }
    ngAfterViewInit() {
        this._focusMonitor.monitor(this.element)
            .subscribe(origin => this._ngZone.run(() => {
            this.elementOrigin = this.formatOrigin(origin);
            this._cdr.markForCheck();
        }));
        this._focusMonitor.monitor(this.subtree, true)
            .subscribe(origin => this._ngZone.run(() => {
            this.subtreeOrigin = this.formatOrigin(origin);
            this._cdr.markForCheck();
        }));
    }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.element);
        this._focusMonitor.stopMonitoring(this.subtree);
    }
    formatOrigin(origin) {
        return origin ? origin + ' focused' : 'blurred';
    }
};
tslib_1.__decorate([
    ViewChild('element', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FocusMonitorOverviewExample.prototype, "element", void 0);
tslib_1.__decorate([
    ViewChild('subtree', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FocusMonitorOverviewExample.prototype, "subtree", void 0);
FocusMonitorOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'focus-monitor-overview-example',
        templateUrl: 'focus-monitor-overview-example.html',
        styleUrls: ['focus-monitor-overview-example.css']
    }),
    tslib_1.__metadata("design:paramtypes", [FocusMonitor,
        ChangeDetectorRef,
        NgZone])
], FocusMonitorOverviewExample);
export { FocusMonitorOverviewExample };
//# sourceMappingURL=focus-monitor-overview-example.js.map