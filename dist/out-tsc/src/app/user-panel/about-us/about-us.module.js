import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
let AboutUsModule = class AboutUsModule {
};
AboutUsModule = tslib_1.__decorate([
    NgModule({
        declarations: [AboutUsComponent],
        imports: [
            CommonModule,
            AboutUsRoutingModule, OwlModule, NgImageSliderModule
        ]
    })
], AboutUsModule);
export { AboutUsModule };
//# sourceMappingURL=about-us.module.js.map