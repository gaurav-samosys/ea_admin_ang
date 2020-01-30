import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
import { FileManagerComponent } from 'app/main/apps/file-manager/file-manager.component';
import { FileManagerDetailsSidebarComponent } from 'app/main/apps/file-manager/sidebars/details/details.component';
import { FileManagerFileListComponent } from 'app/main/apps/file-manager/file-list/file-list.component';
import { FileManagerMainSidebarComponent } from 'app/main/apps/file-manager/sidebars/main/main.component';
const routes = [
    {
        path: '**',
        component: FileManagerComponent,
        children: [],
        resolve: {
            files: FileManagerService
        }
    }
];
let FileManagerModule = class FileManagerModule {
};
FileManagerModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            FileManagerComponent,
            FileManagerFileListComponent,
            FileManagerMainSidebarComponent,
            FileManagerDetailsSidebarComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatIconModule,
            MatRippleModule,
            MatSlideToggleModule,
            MatTableModule,
            FuseSharedModule,
            FuseSidebarModule
        ],
        providers: [
            FileManagerService
        ]
    })
], FileManagerModule);
export { FileManagerModule };
//# sourceMappingURL=file-manager.module.js.map