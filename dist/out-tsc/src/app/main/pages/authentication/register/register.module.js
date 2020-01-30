import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { RegisterComponent } from 'app/main/pages/authentication/register/register.component';
const routes = [
    {
        path: 'auth/register',
        component: RegisterComponent
    }
];
let RegisterModule = class RegisterModule {
};
RegisterModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            RegisterComponent
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
], RegisterModule);
export { RegisterModule };
//# sourceMappingURL=register.module.js.map