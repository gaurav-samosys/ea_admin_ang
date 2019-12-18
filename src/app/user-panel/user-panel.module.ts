import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserPanelComponent } from './user-panel.component';
import { LoginUserComponent } from './login-user/login-user.component';
const routes = [{path:'login',component:LoginUserComponent},
  {
    path: '',
    component: UserPanelComponent,
    children: [
      { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) },
      { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
      { path: 'coaching', loadChildren: () => import('./coaching/coaching.module').then(m => m.CoachingModule) },
      { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: '**', redirectTo: '/user/login' },

    ]
  }
]

@NgModule({
  declarations: [UserPanelComponent, LoginUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class UserPanelModule { }


  // {
  //   path: 'user',
  //   loadChildren: './user-panel/user-panel.module#UserPanelModule',
  // },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomeModule',
  // },
  // {
  //   path: 'about-us',
  //   loadChildren: './about-us/about-us.module#AboutUsModule',
  // },
  // {
  //   path: 'blogs',
  //   loadChildren: './blogs/blogs.module#BlogsModule',
  // },
  // {
  //   path: 'event',
  //   loadChildren: './event/event.module#EventModule',
  // },
  // {
  //   path: 'coaching',
  //   loadChildren: './coaching/coaching.module#CoachingModule',
  // },

  // {path:'user',component:UserPanelComponent},
  // { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) },
  // { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
  // { path: 'coaching', loadChildren: () => import('./coaching/coaching.module').then(m => m.CoachingModule) },
  // { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' }
