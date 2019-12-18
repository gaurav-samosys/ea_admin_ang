import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { OwlModule } from 'ngx-owl-carousel';
// import {TabModule} from 'angular-tabs-component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { GallerizeModule } from '@ngx-gallery/gallerize';
@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,MatFormFieldModule,MatCheckboxModule,ReactiveFormsModule,MatInputModule,
    EventRoutingModule,MatTabsModule,OwlModule,
  ]
})
export class EventModule { }
