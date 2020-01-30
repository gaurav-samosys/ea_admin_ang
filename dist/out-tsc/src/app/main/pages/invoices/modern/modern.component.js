import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvoiceService } from 'app/main/pages/invoices/invoice.service';
let InvoiceModernComponent = class InvoiceModernComponent {
    /**
     * Constructor
     *
     * @param {InvoiceService} _invoiceService
     */
    constructor(_invoiceService) {
        this._invoiceService = _invoiceService;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this._invoiceService.invoiceOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((invoice) => {
            this.invoice = invoice;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
};
InvoiceModernComponent = tslib_1.__decorate([
    Component({
        selector: 'invoice-modern',
        templateUrl: './modern.component.html',
        styleUrls: ['./modern.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [InvoiceService])
], InvoiceModernComponent);
export { InvoiceModernComponent };
//# sourceMappingURL=modern.component.js.map