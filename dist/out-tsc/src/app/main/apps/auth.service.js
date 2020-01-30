import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let AuthService = class AuthService {
    constructor(myRoute) {
        this.myRoute = myRoute;
    }
    sendToken(token) {
        localStorage.setItem("LoggedInUser", token);
    }
    getToken() {
        return localStorage.getItem("LoggedInUser");
    }
    isLoggedIn() {
        return this.getToken() !== null;
    }
    logout() {
        localStorage.removeItem("LoggedInUser");
        localStorage.clear();
        this.myRoute.navigate(["apps/admin/login"]);
    }
};
AuthService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map