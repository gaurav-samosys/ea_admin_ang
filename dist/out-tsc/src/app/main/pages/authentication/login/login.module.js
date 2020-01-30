import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
const routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    }
];
let LoginModule = class LoginModule {
};
LoginModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LoginComponent
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
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map