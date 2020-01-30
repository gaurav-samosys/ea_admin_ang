import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let InvoiceService = class InvoiceService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.invoiceOnChanged = new BehaviorSubject({});
    }
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getInvoice()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get invoice
     */
    getInvoice() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/invoice')
                .subscribe((timeline) => {
                this.invoice = timeline;
                this.invoiceOnChanged.next(this.invoice);
                resolve(this.invoice);
            }, reject);
        });
    }
};
InvoiceService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], InvoiceService);
export { InvoiceService };
//# sourceMappingURL=invoice.service.js.map