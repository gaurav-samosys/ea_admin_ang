import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
const routes = [{ path: '', component: AboutUsComponent }];
let AboutUsRoutingModule = class AboutUsRoutingModule {
};
AboutUsRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AboutUsRoutingModule);
export { AboutUsRoutingModule };
//# sourceMappingURL=about-us-routing.module.js.map