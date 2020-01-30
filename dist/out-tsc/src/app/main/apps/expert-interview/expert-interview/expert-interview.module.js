import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpertInterviewComponent } from './expert-interview.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { EmbedVideo } from 'ngx-embed-video';
const routes = [
    {
        path: '**',
        component: ExpertInterviewComponent,
    }
];
let ExpertInterviewModule = class ExpertInterviewModule {
};
ExpertInterviewModule = tslib_1.__decorate([
    NgModule({
        declarations: [ExpertInterviewComponent],
        imports: [
            CommonModule, RouterModule.forChild(routes),
            EmbedVideo.forRoot(),
            MatIconModule, MatButtonModule,
            MatTableModule, UiSwitchModule,
            MatPaginatorModule, MatSlideToggleModule, MatMenuModule
        ]
    })
], ExpertInterviewModule);
export { ExpertInterviewModule };
//# sourceMappingURL=expert-interview.module.js.map