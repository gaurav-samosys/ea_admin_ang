import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CommentComponent } from './comment.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
const routes = [
    {
        path: '**',
        component: CommentComponent,
    }
];
let CommentModule = class CommentModule {
};
CommentModule = tslib_1.__decorate([
    NgModule({
        declarations: [CommentComponent, ConfirmDialogComponent],
        imports: [
            CommonModule, RouterModule.forChild(routes), MatFormFieldModule, MatSnackBarModule, MatIconModule, MatDatepickerModule, MatInputModule,
            MatButtonModule,
            MatDividerModule,
            MatFormFieldModule,
            MatIconModule,
            MatMenuModule,
            MatSelectModule,
            UiSwitchModule,
            MatTableModule,
            MatTabsModule,
            MatBottomSheetModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatPaginatorModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatSliderModule,
            MatSnackBarModule,
            MatSortModule,
            MatTableModule,
            MatTabsModule,
            MatTooltipModule,
            MatTreeModule,
        ], entryComponents: [ConfirmDialogComponent]
    })
], CommentModule);
export { CommentModule };
//# sourceMappingURL=comment.module.js.map