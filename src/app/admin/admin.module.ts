import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: AdminLoginComponent },
      {
        path: '**',
        redirectTo: '/admin/login'
      }
    ]
  }
]
@NgModule({
  declarations: [AdminComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  // providers:[AuthService]
})
export class AdminModule { }
