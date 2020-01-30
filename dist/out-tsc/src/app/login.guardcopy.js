import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './main/apps/auth.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
let LoginGuard = class LoginGuard {
    constructor(auth, myRoute, _fuseSidebarService) {
        this.auth = auth;
        this.myRoute = myRoute;
        this._fuseSidebarService = _fuseSidebarService;
    }
    canActivate(next, state) {
        this.url = state.url;
        console.log('Url:' + this.url);
        /*    if(this.url == '/apps/home-dashboard/version3')
           {
               this._fuseSidebarService.getSidebar('navbar').toggleFold();
           }
            else if(this.url == 'apps/admin/login')
           {
               //this._fuseSidebarService.getSidebar('navbar').toggleFold();
               console.log("here")
           }
           else
           {
            this._fuseSidebarService.getSidebar('navbar').toggleOpen();
           }*/
        if (this.auth.isLoggedIn()) {
            return true;
        }
        else {
            this.myRoute.navigate(["apps/admin/login"]);
            return false;
        }
    }
    canActivateChild(next, state) {
        return true;
    }
    canLoad(route, segments) {
        let url = route.path;
        console.log('Url:' + url);
        if (!this.auth.isLoggedIn()) {
            return true;
        }
        else {
            this.myRoute.navigate(["apps/home-dashboard/version3"]);
            return false;
        }
    }
};
LoginGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [AuthService,
        Router, FuseSidebarService])
], LoginGuard);
export { LoginGuard };
//# sourceMappingURL=login.guardcopy.js.map