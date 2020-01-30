import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';
const routes = [
    {
        path: '**',
        component: NotificationComponent,
    }
];
let NotificationModule = class NotificationModule {
};
NotificationModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            RouterModule.forChild(routes),
            CommonModule,
        ]
    })
], NotificationModule);
export { NotificationModule };
//# sourceMappingURL=notification.module.js.map