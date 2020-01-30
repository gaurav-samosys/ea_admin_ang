import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserPanelComponent } from './user-panel.component';
import { LoginUserComponent } from './login-user/login-user.component';
const routes = [
    { path: 'login', component: LoginUserComponent },
    {
        path: '',
        component: UserPanelComponent,
        children: [
            { path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) },
            { path: 'event', loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
            { path: 'coaching', loadChildren: () => import('./coaching/coaching.module').then(m => m.CoachingModule) },
            { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            // { path: '**', redirectTo: '/user/home' },
            { path: '**', redirectTo: '/user/login' },
        ]
    },
];
let UserPanelModule = class UserPanelModule {
};
UserPanelModule = tslib_1.__decorate([
    NgModule({
        declarations: [UserPanelComponent, LoginUserComponent],
        imports: [
            CommonModule,
            RouterModule.forChild(routes),
        ]
    })
], UserPanelModule);
export { UserPanelModule };
//# sourceMappingURL=user-panel.module.js.map