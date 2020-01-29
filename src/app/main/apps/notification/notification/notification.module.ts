import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification.component';
const routes: Routes = [
  {
      path     : '**',
      component: NotificationComponent,
      // resolve  : {
      //     data: ProfileService
      // }
  }
];
@NgModule({
  declarations: [],
  imports: [
        RouterModule.forChild(routes),
        CommonModule,
  ]
})
export class NotificationModule { }
