import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddInterviewComponent } from './add-interview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatTableModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { AddInterviewService } from './add-interview.service';
const routes = [
    {
        path: '**',
        component: AddInterviewComponent,
        resolve: {
            data: AddInterviewService
        }
    }
];
let AddInterviewModule = class AddInterviewModule {
};
AddInterviewModule = tslib_1.__decorate([
    NgModule({
        declarations: [AddInterviewComponent],
        imports: [
            CommonModule, RouterModule.forChild(routes),
            MatFormFieldModule, ReactiveFormsModule, MatInputModule,
            MatIconModule,
            MatMenuModule,
            MatSelectModule,
            MatTableModule,
            MatTabsModule,
            MatButtonModule,
            MatButtonToggleModule,
        ], providers: [AddInterviewService]
    })
], AddInterviewModule);
export { AddInterviewModule };
//# sourceMappingURL=add-interview.module.js.map