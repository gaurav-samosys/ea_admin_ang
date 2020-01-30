import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';
import { ColorsComponent } from 'app/main/ui/colors/colors.component';
const routes = [
    {
        path: 'colors',
        component: ColorsComponent
    }
];
let UIColorsModule = class UIColorsModule {
};
UIColorsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ColorsComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatIconModule,
            MatTabsModule,
            FuseSharedModule,
            FuseDemoModule
        ]
    })
], UIColorsModule);
export { UIColorsModule };
//# sourceMappingURL=colors.module.js.map