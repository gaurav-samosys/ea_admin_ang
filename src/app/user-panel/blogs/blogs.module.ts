import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { OwlModule } from 'ngx-owl-carousel';

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    NgImageSliderModule,
    CommonModule,
    BlogsRoutingModule,OwlModule
  ]
})
export class BlogsModule { }
