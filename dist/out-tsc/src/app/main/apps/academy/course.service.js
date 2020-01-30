import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let AcademyCourseService = class AcademyCourseService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onCourseChanged = new BehaviorSubject({});
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
                this.getCourse(route.params.courseId, route.params.courseSlug)
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get course
     *
     * @param courseId
     * @param courseSlug
     * @returns {Promise<any>}
     */
    getCourse(courseId, courseSlug) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-course/' + courseId + '/' + courseSlug)
                .subscribe((response) => {
                this.onCourseChanged.next(response);
                resolve(response);
            }, reject);
        });
    }
};
AcademyCourseService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AcademyCourseService);
export { AcademyCourseService };
//# sourceMappingURL=course.service.js.map