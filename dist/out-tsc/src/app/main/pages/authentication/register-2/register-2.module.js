import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { Register2Component } from 'app/main/pages/authentication/register-2/register-2.component';
const routes = [
    {
        path: 'auth/register-2',
        component: Register2Component
    }
];
let Register2Module = class Register2Module {
};
Register2Module = tslib_1.__decorate([
    NgModule({
        declarations: [
            Register2Component
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
], Register2Module);
export { Register2Module };
//# sourceMappingURL=register-2.module.js.map