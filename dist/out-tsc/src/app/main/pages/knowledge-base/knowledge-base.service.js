import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let KnowledgeBaseService = class KnowledgeBaseService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onKnowledgeBaseChanged = new BehaviorSubject({});
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
                this.getKnowledgeBase()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get knowledge base
     */
    getKnowledgeBase() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/knowledge-base')
                .subscribe((response) => {
                this.knowledgeBase = response;
                this.onKnowledgeBaseChanged.next(this.knowledgeBase);
                resolve(this.knowledgeBase);
            }, reject);
        });
    }
};
KnowledgeBaseService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], KnowledgeBaseService);
export { KnowledgeBaseService };
//# sourceMappingURL=knowledge-base.service.js.map