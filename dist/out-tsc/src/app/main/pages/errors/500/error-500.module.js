import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { Error500Component } from 'app/main/pages/errors/500/error-500.component';
const routes = [
    {
        path: 'errors/error-500',
        component: Error500Component
    }
];
let Error500Module = class Error500Module {
};
Error500Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            Error500Component
        ],
        imports: [
            RouterModule.forChild(routes),
            FuseSharedModule
        ]
    })
], Error500Module);
export { Error500Module };
//# sourceMappingURL=error-500.module.js.map