import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPassword2Component } from 'app/main/pages/authentication/reset-password-2/reset-password-2.component';
const routes = [
    {
        path: 'auth/reset-password-2',
        component: ResetPassword2Component
    }
];
let ResetPassword2Module = class ResetPassword2Module {
};
ResetPassword2Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            ResetPassword2Component
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            FuseSharedModule
        ]
    })
], ResetPassword2Module);
export { ResetPassword2Module };
//# sourceMappingURL=reset-password-2.module.js.map