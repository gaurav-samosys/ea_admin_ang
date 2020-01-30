import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import { takeUntil } from 'rxjs/internal/operators';
let EcommerceOrdersComponent = class EcommerceOrdersComponent {
    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     */
    constructor(_ecommerceOrdersService) {
        this._ecommerceOrdersService = _ecommerceOrdersService;
        this.displayedColumns = ['id', 'reference', 'customer', 'total', 'payment', 'status', 'date'];
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
        this.dataSource = new FilesDataSource(this._ecommerceOrdersService, this.paginator, this.sort);
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(takeUntil(this._unsubscribeAll), debounceTime(150), distinctUntilChanged())
            .subscribe(() => {
            if (!this.dataSource) {
                return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
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
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], EcommerceOrdersComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild('filter', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], EcommerceOrdersComponent.prototype, "filter", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], EcommerceOrdersComponent.prototype, "sort", void 0);
EcommerceOrdersComponent = tslib_1.__decorate([
    Component({
        selector: 'e-commerce-orders',
        templateUrl: './orders.component.html',
        styleUrls: ['./orders.component.scss'],
        animations: fuseAnimations,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [EcommerceOrdersService])
], EcommerceOrdersComponent);
export { EcommerceOrdersComponent };
export class FilesDataSource extends DataSource {
    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(_ecommerceOrdersService, _matPaginator, _matSort) {
        super();
        this._ecommerceOrdersService = _ecommerceOrdersService;
        this._matPaginator = _matPaginator;
        this._matSort = _matSort;
        // Private
        this._filterChange = new BehaviorSubject('');
        this._filteredDataChange = new BehaviorSubject('');
        this.filteredData = this._ecommerceOrdersService.orders;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    // Filtered data
    get filteredData() {
        return this._filteredDataChange.value;
    }
    set filteredData(value) {
        this._filteredDataChange.next(value);
    }
    // Filter
    get filter() {
        return this._filterChange.value;
    }
    set filter(filter) {
        this._filterChange.next(filter);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect() {
        const displayDataChanges = [
            this._ecommerceOrdersService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];
        return merge(...displayDataChanges).pipe(map(() => {
            let data = this._ecommerceOrdersService.orders.slice();
            data = this.filterData(data);
            this.filteredData = [...data];
            data = this.sortData(data);
            // Grab the page's slice of data.
            const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
            return data.splice(startIndex, this._matPaginator.pageSize);
        }));
    }
    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data) {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }
    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data) {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA = '';
            let propertyB = '';
            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.firstName, b.customer.firstName];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [a.payment.method, b.payment.method];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status[0].name, b.status[0].name];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }
    /**
     * Disconnect
     */
    disconnect() {
    }
}
//# sourceMappingURL=orders.component.js.map