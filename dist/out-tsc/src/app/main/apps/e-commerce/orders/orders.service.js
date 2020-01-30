import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let EcommerceOrdersService = class EcommerceOrdersService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onOrdersChanged = new BehaviorSubject({});
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
                this.getOrders()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    getOrders() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-orders')
                .subscribe((response) => {
                this.orders = response;
                this.onOrdersChanged.next(this.orders);
                resolve(response);
            }, reject);
        });
    }
};
EcommerceOrdersService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], EcommerceOrdersService);
export { EcommerceOrdersService };
//# sourceMappingURL=orders.service.js.map