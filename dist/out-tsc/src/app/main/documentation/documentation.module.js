import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { DocsChangelogComponent } from 'app/main/documentation/changelog/changelog.component';
const routes = [
    {
        path: 'changelog',
        component: DocsChangelogComponent
    },
    {
        path: 'getting-started',
        loadChildren: './getting-started/getting-started.module#GettingStartedModule'
    },
    {
        path: 'working-with-fuse',
        loadChildren: './working-with-fuse/working-with-fuse.module#WorkingWithFuseModule'
    },
    {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
    },
    {
        path: 'components-third-party',
        loadChildren: './components-third-party/components-third-party.module#ComponentsThirdPartyModule'
    },
    {
        path: 'directives',
        loadChildren: './directives/directives.module#DirectivesModule'
    },
    {
        path: 'services',
        loadChildren: './services/services.module#ServicesModule'
    }
];
let DocumentationModule = class DocumentationModule {
};
DocumentationModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DocsChangelogComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatIconModule,
            FuseSharedModule
        ]
    })
], DocumentationModule);
export { DocumentationModule };
//# sourceMappingURL=documentation.module.js.map