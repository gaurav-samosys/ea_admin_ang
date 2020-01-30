import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components/index';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { MaterialModule } from 'app/main/angular-material-elements/material.module';
import { EXAMPLE_LIST } from 'app/main/angular-material-elements/example-components';
import { AngularMaterialElementsComponent } from 'app/main/angular-material-elements/angular-material-elements.component';
import { ExampleViewerComponent } from 'app/main/angular-material-elements/example-viewer/example-viewer';
const routes = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: AngularMaterialElementsComponent
            }
        ]
    }
];
let AngularMaterialElementsModule = class AngularMaterialElementsModule {
};
AngularMaterialElementsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            [...EXAMPLE_LIST],
            AngularMaterialElementsComponent,
            ExampleViewerComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MaterialModule,
            FuseSharedModule,
            FuseHighlightModule,
            FuseWidgetModule
        ],
        entryComponents: EXAMPLE_LIST,
    })
], AngularMaterialElementsModule);
export { AngularMaterialElementsModule };
//# sourceMappingURL=angular-material-elements.module.js.map