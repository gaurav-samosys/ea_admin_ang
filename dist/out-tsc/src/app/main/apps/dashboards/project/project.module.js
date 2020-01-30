import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { ProjectDashboardComponent } from 'app/main/apps/dashboards/project/project.component';
import { ProjectDashboardService } from 'app/main/apps/dashboards/project/project.service';
const routes = [
    {
        path: '**',
        component: ProjectDashboardComponent,
        resolve: {
            data: ProjectDashboardService
        }
    }
];
let ProjectDashboardModule = class ProjectDashboardModule {
};
ProjectDashboardModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ProjectDashboardComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatDividerModule,
            MatFormFieldModule,
            MatIconModule,
            MatMenuModule,
            MatSelectModule,
            MatTableModule,
            MatTabsModule,
            NgxChartsModule,
            FuseSharedModule,
            FuseSidebarModule,
            FuseWidgetModule
        ],
        providers: [
            ProjectDashboardService
        ]
    })
], ProjectDashboardModule);
export { ProjectDashboardModule };
//# sourceMappingURL=project.module.js.map