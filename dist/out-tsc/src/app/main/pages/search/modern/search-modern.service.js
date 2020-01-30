import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let SearchModernService = class SearchModernService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.dataOnChanged = new BehaviorSubject({});
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
                this.getSearchData()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get search data
     */
    getSearchData() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/search')
                .subscribe((data) => {
                this.data = data;
                this.dataOnChanged.next(this.data);
                resolve(this.data);
            }, reject);
        });
    }
};
SearchModernService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], SearchModernService);
export { SearchModernService };
//# sourceMappingURL=search-modern.service.js.map