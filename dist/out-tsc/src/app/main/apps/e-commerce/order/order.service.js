import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let EcommerceOrderService = class EcommerceOrderService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onOrderChanged = new BehaviorSubject({});
    }
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getOrder()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get order
     *
     * @returns {Promise<any>}
     */
    getOrder() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-orders/' + this.routeParams.id)
                .subscribe((response) => {
                this.order = response;
                this.onOrderChanged.next(this.order);
                resolve(response);
            }, reject);
        });
    }
    /**
     * Save order
     *
     * @param order
     * @returns {Promise<any>}
     */
    saveOrder(order) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-orders/' + order.id, order)
                .subscribe((response) => {
                resolve(response);
            }, reject);
        });
    }
    /**
     * Add order
     *
     * @param order
     * @returns {Promise<any>}
     */
    addOrder(order) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-orders/', order)
                .subscribe((response) => {
                resolve(response);
            }, reject);
        });
    }
};
EcommerceOrderService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], EcommerceOrderService);
export { EcommerceOrderService };
//# sourceMappingURL=order.service.js.map