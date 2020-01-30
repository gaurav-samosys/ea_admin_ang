import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseHighlightModule } from '@fuse/components/index';
import { DocsComponentsThirdPartyGoogleMapsComponent } from './google-maps.component';
const routes = [
    {
        path: 'google-maps',
        component: DocsComponentsThirdPartyGoogleMapsComponent
    }
];
let GoogleMapsModule = class GoogleMapsModule {
};
GoogleMapsModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            DocsComponentsThirdPartyGoogleMapsComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatButtonModule,
            MatIconModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
            }),
            FuseSharedModule,
            FuseHighlightModule
        ],
    })
], GoogleMapsModule);
export { GoogleMapsModule };
//# sourceMappingURL=google-maps.module.js.map