import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

// import { ForgotPasswordComponent } from 'app/main/pages/authentication/forgot-password/forgot-password.component';
import { ForgotService } from 'app/main/apps/admin/forgot/forgot.service';
import { AuthService } from 'app/main/apps/auth.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MatCardModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
// admin/forgot-password
const routes = [
    {
        path     : '**',
        component: ForgotPasswordComponent
    }
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        FuseSharedModule
    ],
    providers   : [
        ForgotService,
        AuthService 
     ],
})
export class ForgotPasswordModule
{
}
