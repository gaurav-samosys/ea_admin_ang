import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { OwlModule } from 'ngx-owl-carousel';
let BlogsModule = class BlogsModule {
};
BlogsModule = tslib_1.__decorate([
    NgModule({
        declarations: [BlogsComponent],
        imports: [
            NgImageSliderModule,
            CommonModule,
            BlogsRoutingModule, OwlModule
        ]
    })
], BlogsModule);
export { BlogsModule };
//# sourceMappingURL=blogs.module.js.map