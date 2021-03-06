import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
let MobilecolorService = class MobilecolorService {
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
MobilecolorService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
], MobilecolorService);
export { MobilecolorService };
//# sourceMappingURL=mobilecolor.service.js.map