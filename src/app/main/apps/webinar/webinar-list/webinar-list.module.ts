import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WebinarListComponent } from './webinar-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatPaginatorModule, MatSlideToggleModule, MatMenuModule, MatButtonModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';
import { UiSwitchModule } from 'ngx-toggle-switch';
const routes: Routes = [
  {
      path     : '**',
      component: WebinarListComponent,
      // resolve  : {
      //     data: ManagementService
      // }


  }
];

@NgModule({
  declarations: [WebinarListComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    MatIconModule,MatButtonModule,MatProgressSpinnerModule, MatCardModule,
    MatTableModule,UiSwitchModule,MatPaginatorModule,MatSlideToggleModule,MatMenuModule
  ]
})
export class WebinarListModule { }
