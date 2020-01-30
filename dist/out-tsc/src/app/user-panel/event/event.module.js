import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { OwlModule } from 'ngx-owl-carousel';
// import {TabModule} from 'angular-tabs-component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { GallerizeModule } from '@ngx-gallery/gallerize';
let EventModule = class EventModule {
};
EventModule = tslib_1.__decorate([
    NgModule({
        declarations: [EventComponent],
        imports: [
            CommonModule, MatFormFieldModule, MatCheckboxModule, ReactiveFormsModule, MatInputModule,
            EventRoutingModule, MatTabsModule, OwlModule,
        ]
    })
], EventModule);
export { EventModule };
//# sourceMappingURL=event.module.js.map