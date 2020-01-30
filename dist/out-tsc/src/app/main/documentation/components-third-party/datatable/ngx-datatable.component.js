import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let DocsComponentsThirdPartyNgxDatatableComponent = class DocsComponentsThirdPartyNgxDatatableComponent {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.loadingIndicator = true;
        this.reorderable = true;
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
        this._httpClient.get('api/contacts-contacts')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts) => {
            this.rows = contacts;
            this.loadingIndicator = false;
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
DocsComponentsThirdPartyNgxDatatableComponent = tslib_1.__decorate([
    Component({
        selector: 'docs-components-third-party-ngx-datatable',
        templateUrl: './ngx-datatable.component.html',
        styleUrls: ['./ngx-datatable.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], DocsComponentsThirdPartyNgxDatatableComponent);
export { DocsComponentsThirdPartyNgxDatatableComponent };
//# sourceMappingURL=ngx-datatable.component.js.map