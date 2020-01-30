import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { LockComponent } from 'app/main/pages/authentication/lock/lock.component';
const routes = [
    {
        path: 'auth/lock',
        component: LockComponent
    }
];
let LockModule = class LockModule {
};
LockModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LockComponent
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
], LockModule);
export { LockModule };
//# sourceMappingURL=lock.module.js.map