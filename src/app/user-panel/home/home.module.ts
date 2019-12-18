import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderModule } from 'angular-image-slider';
import {
  SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG
} from 'ngx-swiper-wrapper';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   observer: true,
//   direction: 'horizontal',
//   threshold: 50,
//   spaceBetween: 5,
//   slidesPerView: 1,
//   centeredSlides: true
// };

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, MatIconModule, MatTabsModule, ReactiveFormsModule, FormsModule,
    HomeRoutingModule, SwiperModule, FlexLayoutModule, NgImageSliderModule, SliderModule, OwlModule
  ],
  providers: [
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: DEFAULT_SWIPER_CONFIG
    // }
  ]
})
export class HomeModule { }
