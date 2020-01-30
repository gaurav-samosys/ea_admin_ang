import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let EcommerceProductsService = class EcommerceProductsService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onProductsChanged = new BehaviorSubject({});
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
                this.getProducts()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/e-commerce-products')
                .subscribe((response) => {
                this.products = response;
                this.onProductsChanged.next(this.products);
                resolve(response);
            }, reject);
        });
    }
};
EcommerceProductsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], EcommerceProductsService);
export { EcommerceProductsService };
//# sourceMappingURL=products.service.js.map