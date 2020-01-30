import * as tslib_1 from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
/** @title Focusing with a specific FocusOrigin */
let FocusMonitorFocusViaExample = class FocusMonitorFocusViaExample {
    constructor(focusMonitor, _cdr, _ngZone) {
        this.focusMonitor = focusMonitor;
        this._cdr = _cdr;
        this._ngZone = _ngZone;
        this.origin = this.formatOrigin(null);
    }
    ngAfterViewInit() {
        this.focusMonitor.monitor(this.monitoredEl)
            .subscribe(origin => this._ngZone.run(() => {
            this.origin = this.formatOrigin(origin);
            this._cdr.markForCheck();
        }));
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.monitoredEl);
    }
    formatOrigin(origin) {
        return origin ? origin + ' focused' : 'blurred';
    }
};
tslib_1.__decorate([
    ViewChild('monitored', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], FocusMonitorFocusViaExample.prototype, "monitoredEl", void 0);
FocusMonitorFocusViaExample = tslib_1.__decorate([
    Component({
        selector: 'focus-monitor-focus-via-example',
        templateUrl: 'focus-monitor-focus-via-example.html',
        styleUrls: ['focus-monitor-focus-via-example.css']
    }),
    tslib_1.__metadata("design:paramtypes", [FocusMonitor,
        ChangeDetectorRef,
        NgZone])
], FocusMonitorFocusViaExample);
export { FocusMonitorFocusViaExample };
//# sourceMappingURL=focus-monitor-focus-via-example.js.map