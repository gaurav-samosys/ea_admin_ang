import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { ReportServiceService } from './report-service.service';
import { ReactiveFormsModule } from '@angular/forms';
// import {ReportServiceService} from 'app/main/apps/home-dashboard/report/report-service-service'
const routes = [
    {
        path: '**',
        component: ReportComponent,
    }
];
let ReportModule = class ReportModule {
};
ReportModule = tslib_1.__decorate([
    NgModule({
        declarations: [ReportComponent],
        imports: [MatSelectModule, ReactiveFormsModule, NgxDaterangepickerMd.forRoot(), MatFormFieldModule, MatInputModule, FlexLayoutModule,
            CommonModule, RouterModule.forChild(routes), MatButtonModule
        ],
        providers: [
            ReportServiceService
        ],
    })
], ReportModule);
export { ReportModule };
//# sourceMappingURL=report.module.js.map