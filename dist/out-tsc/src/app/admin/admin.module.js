import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
const routes = [
    { path: '', component: AdminLoginComponent },
    {
        path: '', component: AdminComponent, children: [
            { path: '', component: AdminLoginComponent },
            {
                path: '**',
                redirectTo: '/admin/login'
            }
        ]
    }
];
let AdminModule = class AdminModule {
};
AdminModule = tslib_1.__decorate([
    NgModule({
        declarations: [AdminComponent, AdminLoginComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes)
        ],
    })
], AdminModule);
export { AdminModule };
//# sourceMappingURL=admin.module.js.map