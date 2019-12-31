import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [
  {
      path: '**',
      component: ReportComponent,
      // resolve: {
      //     data: Version3Service
      // }
  }
];
@NgModule({
  declarations: [ReportComponent],
  imports: [MatSelectModule,NgxDaterangepickerMd.forRoot(),MatFormFieldModule,MatInputModule,FlexLayoutModule,
    CommonModule,RouterModule.forChild(routes),MatButtonModule
  ]
})
export class ReportModule { }
