import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let QuickPanelComponent = class QuickPanelComponent {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud: false,
            retro: true
        };
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to the events
        this._httpClient.get('api/quick-panel-events')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
            this.events = response;
        });
        // Subscribe to the notes
        this._httpClient.get('api/quick-panel-notes')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
            this.notes = response;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
};
QuickPanelComponent = tslib_1.__decorate([
    Component({
        selector: 'quick-panel',
        templateUrl: './quick-panel.component.html',
        styleUrls: ['./quick-panel.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], QuickPanelComponent);
export { QuickPanelComponent };
//# sourceMappingURL=quick-panel.component.js.map