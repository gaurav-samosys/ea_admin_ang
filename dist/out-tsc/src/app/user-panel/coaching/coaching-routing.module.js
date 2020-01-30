import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoachingComponent } from './coaching.component';
const routes = [{ path: '', component: CoachingComponent }];
let CoachingRoutingModule = class CoachingRoutingModule {
};
CoachingRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CoachingRoutingModule);
export { CoachingRoutingModule };
//# sourceMappingURL=coaching-routing.module.js.map