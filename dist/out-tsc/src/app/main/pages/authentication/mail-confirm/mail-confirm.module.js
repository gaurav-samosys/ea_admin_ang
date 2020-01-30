import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';
import { MailConfirmComponent } from 'app/main/pages/authentication/mail-confirm/mail-confirm.component';
const routes = [
    {
        path: 'auth/mail-confirm',
        component: MailConfirmComponent
    }
];
let MailConfirmModule = class MailConfirmModule {
};
MailConfirmModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            MailConfirmComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            MatIconModule,
            FuseSharedModule
        ]
    })
], MailConfirmModule);
export { MailConfirmModule };
//# sourceMappingURL=mail-confirm.module.js.map