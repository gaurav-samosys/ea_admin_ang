import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { DocsGettingStartedIntroductionComponent } from 'app/main/documentation/getting-started/introduction/introduction.component';
import { DocsGettingStartedInstallationComponent } from 'app/main/documentation/getting-started/installation/installation.component';
const routes = [
    {
        path: 'introduction',
        component: DocsGettingStartedIntroductionComponent
    },
    {
        path: 'installation',
        component: DocsGettingStartedInstallationComponent
    }
];
let GettingStartedModule = class GettingStartedModule {
};
GettingStartedModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DocsGettingStartedIntroductionComponent,
            DocsGettingStartedInstallationComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatIconModule,
            FuseSharedModule,
            FuseHighlightModule
        ]
    })
], GettingStartedModule);
export { GettingStartedModule };
//# sourceMappingURL=getting-started.module.js.map