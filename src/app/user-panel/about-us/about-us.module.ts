import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,OwlModule,NgImageSliderModule
  ]
})
export class AboutUsModule { }
