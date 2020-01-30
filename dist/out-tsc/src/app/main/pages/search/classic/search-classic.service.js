import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let SearchClassicService = class SearchClassicService {
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
SearchClassicService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], SearchClassicService);
export { SearchClassicService };
//# sourceMappingURL=search-classic.service.js.map