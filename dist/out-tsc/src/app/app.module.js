import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginGuard } from './login.guard';
import { AuthService } from './main/apps/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
// import { AddverticalComponent } from './main/apps/vertical-management/vertical/addvertical/addvertical.component';
// import { AdminComponent } from './admin/admin.component';
// import { AuthGuard } from './auth.guard';
// import { UserPanelComponent } from './user-panel/user-panel.component';
const appRoutes = [
    // {
    //     path        : 'user',
    //     loadChildren: './user-panel/user-panel.module#UserPanelModule'
    // },
    // {
    //     path: 'admin',
    //     loadChildren: './admin/admin.module#AdminModule'
    // },
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule'
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path: 'documentation',
        loadChildren: './main/documentation/documentation.module#DocumentationModule'
    },
    {
        path: 'angular-material-elements',
        loadChildren: './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    },
    {
        path: '**',
        redirectTo: 'apps/admin/login'
    },
];
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            RouterModule.forRoot(appRoutes),
            ToastrModule.forRoot(),
            TranslateModule.forRoot(),
            InMemoryWebApiModule.forRoot(FakeDbService, {
                delay: 0,
                passThruUnknownUrl: true
            }),
            // Material moment date module
            MatMomentDateModule,
            // Material
            MatButtonModule,
            MatIconModule,
            CKEditorModule,
            // Fuse modules
            FuseModule.forRoot(fuseConfig),
            FuseProgressBarModule,
            FuseSharedModule,
            FuseSidebarModule,
            FuseThemeOptionsModule,
            // App modules
            LayoutModule,
            AppStoreModule
        ],
        bootstrap: [
            AppComponent
        ],
        providers: [LoginGuard, AuthService],
    })
], AppModule);
export { AppModule };
// install user panel //npm install ngx-owl-carousel owl.carousel jquery --save 
//# sourceMappingURL=app.module.js.map