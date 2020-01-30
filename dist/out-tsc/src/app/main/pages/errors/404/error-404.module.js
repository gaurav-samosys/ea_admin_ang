import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { Error404Component } from 'app/main/pages/errors/404/error-404.component';
const routes = [
    {
        path: 'errors/error-404',
        component: Error404Component
    }
];
let Error404Module = class Error404Module {
};
Error404Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            Error404Component
        ],
        imports: [
            RouterModule.forChild(routes),
            MatIconModule,
            FuseSharedModule
        ]
    })
], Error404Module);
export { Error404Module };
//# sourceMappingURL=error-404.module.js.map