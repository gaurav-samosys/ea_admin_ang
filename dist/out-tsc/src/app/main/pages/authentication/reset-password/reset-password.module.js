import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { ResetPasswordComponent } from 'app/main/pages/authentication/reset-password/reset-password.component';
const routes = [
    {
        path: 'auth/reset-password',
        component: ResetPasswordComponent
    }
];
let ResetPasswordModule = class ResetPasswordModule {
};
ResetPasswordModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ResetPasswordComponent
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
], ResetPasswordModule);
export { ResetPasswordModule };
//# sourceMappingURL=reset-password.module.js.map