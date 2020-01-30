import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let EcommerceProductService = class EcommerceProductService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
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
                this.getProduct()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct() {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else {
                this._httpClient.get('api/e-commerce-products/' + this.routeParams.id)
                    .subscribe((response) => {
                    this.product = response;
                    this.onProductChanged.next(this.product);
                    resolve(response);
                }, reject);
            }
        });
    }
    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-products/' + product.id, product)
                .subscribe((response) => {
                resolve(response);
            }, reject);
        });
    }
    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-products/', product)
                .subscribe((response) => {
                resolve(response);
            }, reject);
        });
    }
};
EcommerceProductService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], EcommerceProductService);
export { EcommerceProductService };
//# sourceMappingURL=product.service.js.map