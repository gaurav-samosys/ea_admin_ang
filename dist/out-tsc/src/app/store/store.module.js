import * as tslib_1 from "tslib";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'environments/environment';
import { reducers, effects, CustomSerializer } from 'app/store';
export const metaReducers = !environment.production
    ? [storeFreeze]
    : [];
let AppStoreModule = class AppStoreModule {
};
AppStoreModule = tslib_1.__decorate([
    NgModule({
        imports: [
            StoreModule.forRoot(reducers, { metaReducers }),
            EffectsModule.forRoot(effects),
            !environment.production ? StoreDevtoolsModule.instrument() : [],
            StoreRouterConnectingModule.forRoot()
        ],
        providers: [
            {
                provide: RouterStateSerializer,
                useClass: CustomSerializer
            }
        ]
    })
], AppStoreModule);
export { AppStoreModule };
//# sourceMappingURL=store.module.js.map