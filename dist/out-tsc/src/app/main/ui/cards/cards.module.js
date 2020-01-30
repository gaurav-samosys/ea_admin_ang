import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';
import { FuseHighlightModule } from '@fuse/components';
import { CardsComponent } from 'app/main/ui/cards/cards.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes = [
    {
        path: 'cards',
        component: CardsComponent
    }
];
let UICardsModule = class UICardsModule {
};
UICardsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            CardsComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatButtonToggleModule,
            MatIconModule,
            MatListModule,
            MatMenuModule,
            MatSelectModule,
            MatSlideToggleModule,
            MatTabsModule,
            NgxChartsModule,
            FuseSharedModule,
            FuseDemoModule,
            FuseHighlightModule,
        ]
    })
], UICardsModule);
export { UICardsModule };
//# sourceMappingURL=cards.module.js.map