import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components';
import { HelperClassesComponent } from 'app/main/ui/helper-classes/helper-classes.component';
import { HelperClassesPaddingMarginComponent } from 'app/main/ui/helper-classes/tabs/padding-margin/padding-margin.component';
import { HelperClassesWidthHeightComponent } from 'app/main/ui/helper-classes/tabs/width-height/width-height.component';
const routes = [
    {
        path: 'helper-classes',
        component: HelperClassesComponent
    }
];
let UIHelperClassesModule = class UIHelperClassesModule {
};
UIHelperClassesModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            HelperClassesComponent,
            HelperClassesPaddingMarginComponent,
            HelperClassesWidthHeightComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatIconModule,
            MatTabsModule,
            FuseSharedModule,
            FuseHighlightModule,
        ],
    })
], UIHelperClassesModule);
export { UIHelperClassesModule };
//# sourceMappingURL=helper-classes.module.js.map