import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WebinarListComponent } from './webinar-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';
const routes = [
    {
        path: '**',
        component: WebinarListComponent,
    }
];
let WebinarListModule = class WebinarListModule {
};
WebinarListModule = tslib_1.__decorate([
    NgModule({
        declarations: [WebinarListComponent],
        imports: [
            CommonModule, RouterModule.forChild(routes),
            MatIconModule, MatButtonModule,
            MatTableModule, UiSwitchModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule
        ]
    })
], WebinarListModule);
export { WebinarListModule };
//# sourceMappingURL=webinar-list.module.js.map