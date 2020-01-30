import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let AcademyCoursesService = class AcademyCoursesService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onCoursesChanged = new BehaviorSubject({});
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
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
                this.getCategories(),
                this.getCourses()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-categories')
                .subscribe((response) => {
                this.onCategoriesChanged.next(response);
                resolve(response);
            }, reject);
        });
    }
    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getCourses() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-courses')
                .subscribe((response) => {
                this.onCoursesChanged.next(response);
                resolve(response);
            }, reject);
        });
    }
};
AcademyCoursesService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AcademyCoursesService);
export { AcademyCoursesService };
//# sourceMappingURL=courses.service.js.map