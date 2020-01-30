import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { FaqService } from 'app/main/pages/faq/faq.service';
import { FaqComponent } from 'app/main/pages/faq/faq.component';
const routes = [
    {
        path: 'faq',
        component: FaqComponent,
        resolve: {
            faq: FaqService
        }
    }
];
let FaqModule = class FaqModule {
};
FaqModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            FaqComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatExpansionModule,
            MatIconModule,
            FuseSharedModule
        ],
        providers: [
            FaqService
        ]
    })
], FaqModule);
export { FaqModule };
//# sourceMappingURL=faq.module.js.map