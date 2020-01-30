import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let FaqService = class FaqService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onFaqsChanged = new BehaviorSubject({});
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
                this.getFaqs()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get faqs
     */
    getFaqs() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/faq')
                .subscribe((response) => {
                this.faqs = response;
                this.onFaqsChanged.next(this.faqs);
                resolve(this.faqs);
            }, reject);
        });
    }
};
FaqService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], FaqService);
export { FaqService };
//# sourceMappingURL=faq.service.js.map