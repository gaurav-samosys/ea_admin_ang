import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaintenanceComponent } from 'app/main/pages/maintenance/maintenance.component';
const routes = [
    {
        path: 'maintenance',
        component: MaintenanceComponent
    }
];
let MaintenanceModule = class MaintenanceModule {
};
MaintenanceModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            MaintenanceComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            FuseSharedModule
        ]
    })
], MaintenanceModule);
export { MaintenanceModule };
//# sourceMappingURL=maintenence.module.js.map