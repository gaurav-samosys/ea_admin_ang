import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FuseSharedModule } from '@fuse/shared.module';
import { GoogleMapsModule } from 'app/main/documentation/components-third-party/google-maps/google-maps.module';
import { DocsComponentsThirdPartyNgxDatatableComponent } from 'app/main/documentation/components-third-party/datatable/ngx-datatable.component';
const routes = [
    {
        path: 'datatables/ngx-datatable',
        component: DocsComponentsThirdPartyNgxDatatableComponent
    }
];
let ComponentsThirdPartyModule = class ComponentsThirdPartyModule {
};
ComponentsThirdPartyModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DocsComponentsThirdPartyNgxDatatableComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatCheckboxModule,
            MatIconModule,
            NgxDatatableModule,
            FuseSharedModule,
            GoogleMapsModule
        ]
    })
], ComponentsThirdPartyModule);
export { ComponentsThirdPartyModule };
//# sourceMappingURL=components-third-party.module.js.map