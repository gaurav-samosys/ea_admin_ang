import * as tslib_1 from "tslib";
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'app/main/apps/mail-ngrx/store/reducers';
import { effects } from 'app/main/apps/mail-ngrx/store/effects';
let MailNgrxStoreModule = class MailNgrxStoreModule {
};
MailNgrxStoreModule = tslib_1.__decorate([
    NgModule({
        imports: [
            StoreModule.forFeature('mail-app', reducers),
            EffectsModule.forFeature(effects)
        ],
        providers: []
    })
], MailNgrxStoreModule);
export { MailNgrxStoreModule };
//# sourceMappingURL=store.module.js.map