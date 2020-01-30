import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { Login2Component } from 'app/main/pages/authentication/login-2/login-2.component';
const routes = [
    {
        path: 'auth/login-2',
        component: Login2Component
    }
];
let Login2Module = class Login2Module {
};
Login2Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            Login2Component
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatCheckboxModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            FuseSharedModule
        ]
    })
], Login2Module);
export { Login2Module };
//# sourceMappingURL=login-2.module.js.map