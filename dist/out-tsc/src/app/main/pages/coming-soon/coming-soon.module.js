import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';
import { ComingSoonComponent } from 'app/main/pages/coming-soon/coming-soon.component';
const routes = [
    {
        path: 'coming-soon',
        component: ComingSoonComponent
    }
];
let ComingSoonModule = class ComingSoonModule {
};
ComingSoonModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            ComingSoonComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            FuseSharedModule,
            FuseCountdownModule
        ]
    })
], ComingSoonModule);
export { ComingSoonModule };
//# sourceMappingURL=coming-soon.module.js.map