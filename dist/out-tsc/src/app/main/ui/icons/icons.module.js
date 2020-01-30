import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseSharedModule } from '@fuse/shared.module';
import { IconsComponent } from 'app/main/ui/icons/icons.component';
const routes = [
    {
        path: 'icons',
        component: IconsComponent
    }
];
let UIIconsModule = class UIIconsModule {
};
UIIconsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            IconsComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatProgressSpinnerModule,
            FuseSharedModule
        ]
    })
], UIIconsModule);
export { UIIconsModule };
//# sourceMappingURL=icons.module.js.map