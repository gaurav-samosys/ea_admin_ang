import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpertInterviewComponent } from './expert-interview.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';

const routes: Routes = [
  {
      path     : '**',
      component: ExpertInterviewComponent,
      // resolve  : {
      //     data: ManagementService
      // }


  }
];
@NgModule({
  declarations: [ExpertInterviewComponent],
  imports: [
    CommonModule,  RouterModule.forChild(routes),

        MatIconModule,MatButtonModule,
        MatTableModule,UiSwitchModule,
        MatPaginatorModule,MatSlideToggleModule,MatMenuModule
  ]
})
export class ExpertInterviewModule { }
