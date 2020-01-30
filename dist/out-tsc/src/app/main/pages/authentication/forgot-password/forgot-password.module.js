import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { ForgotPasswordComponent } from 'app/main/pages/authentication/forgot-password/forgot-password.component';
const routes = [
    {
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent
    }
];
let ForgotPasswordModule = class ForgotPasswordModule {
};
ForgotPasswordModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ForgotPasswordComponent
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
], ForgotPasswordModule);
export { ForgotPasswordModule };
//# sourceMappingURL=forgot-password.module.js.map