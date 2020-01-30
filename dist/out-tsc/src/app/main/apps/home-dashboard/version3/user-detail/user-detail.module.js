import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
let UserDetailModule = class UserDetailModule {
};
UserDetailModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        imports: [
            FlexLayoutModule, MatSlideToggleModule,
            CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, ScrollingModule, MatProgressBarModule
        ]
    })
], UserDetailModule);
export { UserDetailModule };
//# sourceMappingURL=user-detail.module.js.map