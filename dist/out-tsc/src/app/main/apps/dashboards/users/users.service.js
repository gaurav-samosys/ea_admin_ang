import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
let UsersService = class UsersService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
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
                this.getProjects(),
                this.getWidgets()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get projects
     *
     * @returns {Promise<any>}
     */
    getProjects() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-projects')
                .subscribe((response) => {
                this.projects = response;
                resolve(response);
            }, reject);
        });
    }
    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/project-dashboard-widgets')
                .subscribe((response) => {
                this.widgets = response;
                resolve(response);
            }, reject);
        });
    }
    POST(URL, data) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this._httpClient.post(URL, data, httpOptions);
    }
};
UsersService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map