import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
let AuthGuard = class AuthGuard {
    constructor(auth, myRoute) {
        this.auth = auth;
        this.myRoute = myRoute;
    }
    canActivate(next, state) {
        let url = state.url;
        console.log('Url:' + url);
        if (this.auth.isLoggedIn()) {
            return true;
        }
        else {
            this.myRoute.navigate(["apps/admin/login"]);
            return false;
        }
    }
    CanLoad(route) {
        let url = route.path;
        console.log('Url:' + url);
        if (this.auth.isLoggedIn()) {
            return true;
        }
        else {
            this.myRoute.navigate(["apps/admin/login"]);
            return false;
        }
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map