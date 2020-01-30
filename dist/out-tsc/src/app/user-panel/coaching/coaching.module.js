import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachingRoutingModule } from './coaching-routing.module';
import { CoachingComponent } from './coaching.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
let CoachingModule = class CoachingModule {
};
CoachingModule = tslib_1.__decorate([
    NgModule({
        declarations: [CoachingComponent],
        imports: [
            CommonModule, ReactiveFormsModule, FormsModule,
            MatCheckboxModule, CoachingRoutingModule, OwlModule, NgImageSliderModule
        ]
    })
], CoachingModule);
export { CoachingModule };
//# sourceMappingURL=coaching.module.js.map