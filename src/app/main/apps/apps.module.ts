import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { AuthService } from './auth.service';
import { LoginGuard } from '../../login.guard';
// import { NotificationComponent } from './notification/notification/notification.component';
// import { ExpertInterviewComponent } from './expert-interview/expert-interview/expert-interview.component';
// import { AddInterviewComponent } from './expert-interview/add-interview/add-interview.component';
// import { WebinarListComponent } from './webinar/webinar-list/webinar-list.component';
// import { AddWebinarComponent } from './webinar/add-webinar/add-webinar.component';
const routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule',
    },
    {
        path: 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path: 'dashboards/users',
        loadChildren: './dashboards/users/users.module#UsersModule'
    },
    {
        path: 'dashboards/companies',
        loadChildren: './dashboards/companies/companies.module#CompaniesModule', canActivate: [LoginGuard]
    },
    {
        path: 'dashboards/company-detail/:id',
        loadChildren: './dashboards/company-detail/company-detail.module#CompanyDetailModule', canActivate: [LoginGuard]
    },
    {
        path: 'dashboards/clients',
        loadChildren: './dashboards/clients/clients.module#ClientsModule'
    },
    {
        path: 'Access-code/access',
        loadChildren: './Access-code/access-code/access-code.module#AccessCodeModule', canActivate: [LoginGuard]
    },
    {
        path: 'Access-code/viewdetails/:id/:id1',
        loadChildren: './Access-code/viewdetails/viewdetails.module#ViewdetailsModule', canActivate: [LoginGuard]
    },
    {
        path: 'download-management/download',
        loadChildren: './download-management/download/download.module#DownloadModule', canActivate: [LoginGuard]
    },
    {
        path: 'client-mangement/clients',
        loadChildren: './client-mangement/clients/clients.module#ClientsModule', canActivate: [LoginGuard]
    },
    // {
    //     path: 'client-mangement/client-detail/:id/:id1',
    //     loadChildren: './client-mangement/client-detail/client-detail.module#ClientDetailModule', canActivate: [LoginGuard]
    // },
    {
        path: 'client-mangement/client-detail/:id/:id1',
        loadChildren: './client-mangement/client-detail/client-detail.module#ClientDetailModule', 
    },
    {
        path: 'client-mangement/client-edit/:id/:id1',
        loadChildren: './client-mangement/client-edit/client-edit.module#ClientEditModule', canActivate: [LoginGuard]
    },
    {
        path: 'client-mangement/addclient',
        loadChildren: './client-mangement/addclient/addclient.module#AddclientModule', canActivate: [LoginGuard]
    },
    {
        path: 'client-mangement/admin-access',
        loadChildren: './client-mangement/admin-access/admin-access.module#AdminAccessModule', canActivate: [LoginGuard]
    },
    {
        path: 'user-mangement/user',
        loadChildren: './user-mangement/user/user.module#UserModule', canActivate: [LoginGuard]
    },
    {
        path: 'developer-app/developer-apis',
        loadChildren: './developer-app/developer-apis/developer-apis.module#DeveloperApisModule', canActivate: [LoginGuard]
    },
    {
        path: 'vertical-management/vertical',
        loadChildren: './vertical-management/vertical/vertical.module#VerticalModule', canActivate: [LoginGuard]
    },
    {
        path: 'vertical-management/management/:id',
        loadChildren: './vertical-management/management/management.module#ManagementModule', canActivate: [LoginGuard]
    },
    {
        path: 'vertical-management/videolist/:id',
        loadChildren: './vertical-management/videolist/videolist.module#VideolistModule', canActivate: [LoginGuard]
    },
    {
        path: 'vertical-management/quizzeslist/:id',
        loadChildren: './vertical-management/quizzeslist/quizzeslist.module#QuizzeslistModule', canActivate: [LoginGuard]
    },

    {
        path: 'vertical-management/showquiz/:id/:topicid',
        loadChildren: './vertical-management/showquiz/showquiz.module#ShowquizModule', canActivate: [LoginGuard]
    },
    {
        path: 'home-dashboard/version3',
        loadChildren: './home-dashboard/version3/version3.module#Version3Module', canActivate: [LoginGuard]
    },
    {
        path: 'home-dashboard/report',
        loadChildren: './home-dashboard/report/report.module#ReportModule', canActivate: [LoginGuard]
    },
    // {
    //     path: 'vertical-manage',
    //     loadChildren: './home-dashboard/vertical-manage/vertical-manage.module#VerticalManageModule', canActivate: [LoginGuard]
    // },
    // {
    //     path: 'add-vertical',
    //     loadChildren: './home-dashboard/add-vertical/add-vertical.module#AddVerticalModule', canActivate: [LoginGuard]
    // },

    {
        path: 'theme-management/manage-color',
        loadChildren: './theme-management/manage-color/manage-color.module#ManageColorModule'
    },
    {
        path: 'theme-management/mobile-color',
        loadChildren: './theme-management/mobile-color/mobile-color.module#MobileColorModule'
    },
    {
        path: 'blogs',
        loadChildren: './blogs/blog/blog.module#BlogModule'
    },
    {
        path: 'blog-post',
        loadChildren: './blogs/add-post/add-post.module#AddPostModule'
    },
     {
         path: 'comment',
         loadChildren: './blogs/comment/comment.module#CommentModule'
     },
    {
        path: 'blog-post/:id',
        loadChildren: './blogs/add-post/add-post.module#AddPostModule'
    },
    {
        path: 'expert_interview',
        loadChildren: './expert-interview/expert-interview/expert-interview.module#ExpertInterviewModule'
    },

    {
        path: 'add_expert_interview',
        loadChildren: './expert-interview/add-interview/add-interview.module#AddInterviewModule'
    },

    {
        path: 'add_expert_interview/:id',
        loadChildren: './expert-interview/add-interview/add-interview.module#AddInterviewModule'
    },

    {
        path: 'add_webinar',
        loadChildren: './webinar/add-webinar/add-webinar.module#AddWebinarModule'
    },

    {
        path: 'webinars',
        loadChildren: './webinar/webinar-list/webinar-list.module#WebinarListModule'
    },


    {
        path: 'profile',
        loadChildren: './profile/profile/profile.module#ProfileModule', canActivate: [LoginGuard]
    },
    {
        path: 'notification',
        loadChildren: './notification/notification/notification.module#NotificationModule', canActivate: [LoginGuard]
    },
    {
        path: 'admin/login',
        loadChildren: './admin/login/login.module#LoginModule', canLoad: [LoginGuard]
    },
    {
        path: 'admin/forgot',
        loadChildren: './admin/forgot/forgot.module#ForgotModule'
    },

    {
        path: 'mail',
        loadChildren: './mail/mail.module#MailModule'
    },
    {
        path: 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#MailNgrxModule'
    },
    {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        path: 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    },
    {
        path: 'academy',
        loadChildren: './academy/academy.module#AcademyModule'
    },
    {
        path: 'todo',
        loadChildren: './todo/todo.module#TodoModule'
    },
    {
        path: 'file-manager',
        loadChildren: './file-manager/file-manager.module#FileManagerModule'
    },
    {
        path: 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path: 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    },


    { path: '** ', redirectTo: '/apps/admin/login' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: [
    ]
})
export class AppsModule {
}

    ///////////////////////////////////////////////////
    // {
    //     path        : 'dashboards/analytics',
    //     loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    // },
    // {
    //     path        : 'dashboards/project',
    //     loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    // },
    // {
    //     path        : 'mail',
    //     loadChildren: './mail/mail.module#MailModule'
    // },
    // {
    //     path        : 'mail-ngrx',
    //     loadChildren: './mail-ngrx/mail.module#MailNgrxModule'
    // },
    // {
    //     path        : 'chat',
    //     loadChildren: './chat/chat.module#ChatModule'
    // },
    // {
    //     path        : 'calendar',
    //     loadChildren: './calendar/calendar.module#CalendarModule'
    // },
    // {
    //     path        : 'e-commerce',
    //     loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    // },
    // {
    //     path        : 'academy',
    //     loadChildren: './academy/academy.module#AcademyModule'
    // },
    // {
    //     path        : 'todo',
    //     loadChildren: './todo/todo.module#TodoModule'
    // },
    // {
    //     path        : 'file-manager',
    //     loadChildren: './file-manager/file-manager.module#FileManagerModule'
    // },
    // {
    //     path        : 'contacts',
    //     loadChildren: './contacts/contacts.module#ContactsModule'
    // },
    // {
    //     path        : 'scrumboard',
    //     loadChildren: './scrumboard/scrumboard.module#ScrumboardModule'
    // }