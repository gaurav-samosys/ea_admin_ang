import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let FileManagerService = class FileManagerService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onFilesChanged = new BehaviorSubject({});
        this.onFileSelected = new BehaviorSubject({});
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
                this.getFiles()
            ]).then(([files]) => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get files
     *
     * @returns {Promise<any>}
     */
    getFiles() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/file-manager')
                .subscribe((response) => {
                this.onFilesChanged.next(response);
                this.onFileSelected.next(response[0]);
                resolve(response);
            }, reject);
        });
    }
};
FileManagerService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], FileManagerService);
export { FileManagerService };
//# sourceMappingURL=file-manager.service.js.map