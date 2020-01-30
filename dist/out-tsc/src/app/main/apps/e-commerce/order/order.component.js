import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { orderStatuses } from 'app/main/apps/e-commerce/order/order-statuses';
import { Order } from 'app/main/apps/e-commerce/order/order.model';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
let EcommerceOrderComponent = class EcommerceOrderComponent {
    /**
     * Constructor
     *
     * @param {EcommerceOrderService} _ecommerceOrderService
     * @param {FormBuilder} _formBuilder
     */
    constructor(_ecommerceOrderService, _formBuilder) {
        this._ecommerceOrderService = _ecommerceOrderService;
        this._formBuilder = _formBuilder;
        // Set the defaults
        this.order = new Order();
        this.orderStatuses = orderStatuses;
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
        // Subscribe to update order on changes
        this._ecommerceOrderService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
            this.order = new Order(order);
        });
        this.statusForm = this._formBuilder.group({
            newStatus: ['']
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Update status
     */
    updateStatus() {
        const newStatusId = Number.parseInt(this.statusForm.get('newStatus').value);
        if (!newStatusId) {
            return;
        }
        const newStatus = this.orderStatuses.find((status) => {
            return status.id === newStatusId;
        });
        newStatus['date'] = new Date().toString();
        this.order.status.unshift(newStatus);
    }
};
EcommerceOrderComponent = tslib_1.__decorate([
    Component({
        selector: 'e-commerce-order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [EcommerceOrderService,
        FormBuilder])
], EcommerceOrderComponent);
export { EcommerceOrderComponent };
//# sourceMappingURL=order.component.js.map