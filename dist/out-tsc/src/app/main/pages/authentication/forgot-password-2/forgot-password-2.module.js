import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { ForgotPassword2Component } from 'app/main/pages/authentication/forgot-password-2/forgot-password-2.component';
const routes = [
    {
        path: 'auth/forgot-password-2',
        component: ForgotPassword2Component
    }
];
let ForgotPassword2Module = class ForgotPassword2Module {
};
ForgotPassword2Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            ForgotPassword2Component
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            FuseSharedModule,
        ]
    })
], ForgotPassword2Module);
export { ForgotPassword2Module };
//# sourceMappingURL=forgot-password-2.module.js.map