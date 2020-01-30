import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { DocsDirectivesFuseIfOnDomComponent } from 'app/main/documentation/directives/fuseIfOnDom/fuse-if-on-dom.component';
import { DocsDirectivesFuseInnerScrollComponent } from 'app/main/documentation/directives/fuseInnerScroll/fuse-inner-scroll.component';
import { DocsDirectivesFuseMatSidenavComponent } from 'app/main/documentation/directives/fuseMatSidenav/fuse-mat-sidenav.component';
import { DocsDirectivesFusePerfectScrollbarComponent } from 'app/main/documentation/directives/fusePerfectScrollbar/fuse-perfect-scrollbar.component';
const routes = [
    {
        path: 'fuse-if-on-dom',
        component: DocsDirectivesFuseIfOnDomComponent
    },
    {
        path: 'fuse-inner-scroll',
        component: DocsDirectivesFuseInnerScrollComponent
    },
    {
        path: 'fuse-mat-sidenav',
        component: DocsDirectivesFuseMatSidenavComponent
    },
    {
        path: 'fuse-perfect-scrollbar',
        component: DocsDirectivesFusePerfectScrollbarComponent
    }
];
let DirectivesModule = class DirectivesModule {
};
DirectivesModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DocsDirectivesFuseIfOnDomComponent,
            DocsDirectivesFuseInnerScrollComponent,
            DocsDirectivesFuseMatSidenavComponent,
            DocsDirectivesFusePerfectScrollbarComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatIconModule,
            FuseSharedModule,
            FuseHighlightModule
        ]
    })
], DirectivesModule);
export { DirectivesModule };
//# sourceMappingURL=directives.module.js.map