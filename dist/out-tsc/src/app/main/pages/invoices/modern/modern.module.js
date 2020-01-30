import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { InvoiceService } from 'app/main/pages/invoices/invoice.service';
import { InvoiceModernComponent } from 'app/main/pages/invoices/modern/modern.component';
const routes = [
    {
        path: 'invoices/modern',
        component: InvoiceModernComponent,
        resolve: {
            search: InvoiceService
        }
    }
];
let InvoiceModernModule = class InvoiceModernModule {
};
InvoiceModernModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            InvoiceModernComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            FuseSharedModule
        ],
        providers: [
            InvoiceService
        ]
    })
], InvoiceModernModule);
export { InvoiceModernModule };
//# sourceMappingURL=modern.module.js.map