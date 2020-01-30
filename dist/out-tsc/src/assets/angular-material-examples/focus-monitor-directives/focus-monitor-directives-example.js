import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
/** @title Monitoring focus with FocusMonitor */
let FocusMonitorDirectivesExample = class FocusMonitorDirectivesExample {
    constructor(_ngZone, _cdr) {
        this._ngZone = _ngZone;
        this._cdr = _cdr;
        this.elementOrigin = this.formatOrigin(null);
        this.subtreeOrigin = this.formatOrigin(null);
    }
    formatOrigin(origin) {
        return origin ? origin + ' focused' : 'blurred';
    }
    // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
    markForCheck() {
        this._ngZone.run(() => this._cdr.markForCheck());
    }
};
FocusMonitorDirectivesExample = tslib_1.__decorate([
    Component({
        selector: 'focus-monitor-directives-example',
        templateUrl: 'focus-monitor-directives-example.html',
        styleUrls: ['focus-monitor-directives-example.css']
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone, ChangeDetectorRef])
], FocusMonitorDirectivesExample);
export { FocusMonitorDirectivesExample };
//# sourceMappingURL=focus-monitor-directives-example.js.map