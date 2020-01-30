import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
const routes = [{ path: '', component: BlogsComponent }];
let BlogsRoutingModule = class BlogsRoutingModule {
};
BlogsRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BlogsRoutingModule);
export { BlogsRoutingModule };
//# sourceMappingURL=blogs-routing.module.js.map