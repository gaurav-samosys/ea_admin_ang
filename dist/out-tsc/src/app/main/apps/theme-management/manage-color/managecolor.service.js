import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
let ManagecolorService = class ManagecolorService {
    constructor(_httpClient, rt) {
        this._httpClient = _httpClient;
        this.rt = rt;
    }
    Post(URL, value) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return this._httpClient.post(URL, value, httpOptions);
    }
};
ManagecolorService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], ManagecolorService);
export { ManagecolorService };
//# sourceMappingURL=managecolor.service.js.map