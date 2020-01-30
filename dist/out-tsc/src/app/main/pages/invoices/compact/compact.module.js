import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { InvoiceService } from 'app/main/pages/invoices/invoice.service';
import { InvoiceCompactComponent } from 'app/main/pages/invoices/compact/compact.component';
const routes = [
    {
        path: 'invoices/compact',
        component: InvoiceCompactComponent,
        resolve: {
            search: InvoiceService
        }
    }
];
let InvoiceCompactModule = class InvoiceCompactModule {
};
InvoiceCompactModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            InvoiceCompactComponent
        ],
        imports: [
            RouterModule.forChild(routes),
            FuseSharedModule
        ],
        providers: [
            InvoiceService
        ]
    })
], InvoiceCompactModule);
export { InvoiceCompactModule };
//# sourceMappingURL=compact.module.js.map