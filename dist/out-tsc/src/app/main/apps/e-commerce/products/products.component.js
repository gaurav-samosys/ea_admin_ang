import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
let EcommerceProductsComponent = class EcommerceProductsComponent {
    constructor(_ecommerceProductsService) {
        this._ecommerceProductsService = _ecommerceProductsService;
        this.displayedColumns = ['id', 'image', 'name', 'category', 'price', 'quantity', 'active'];
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
        this.dataSource = new FilesDataSource(this._ecommerceProductsService, this.paginator, this.sort);
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(takeUntil(this._unsubscribeAll), debounceTime(150), distinctUntilChanged())
            .subscribe(() => {
            if (!this.dataSource) {
                return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], EcommerceProductsComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: true }),
    tslib_1.__metadata("design:type", MatSort)
], EcommerceProductsComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild('filter', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], EcommerceProductsComponent.prototype, "filter", void 0);
EcommerceProductsComponent = tslib_1.__decorate([
    Component({
        selector: 'e-commerce-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.scss'],
        animations: fuseAnimations,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [EcommerceProductsService])
], EcommerceProductsComponent);
export { EcommerceProductsComponent };
export class FilesDataSource extends DataSource {
    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(_ecommerceProductsService, _matPaginator, _matSort) {
        super();
        this._ecommerceProductsService = _ecommerceProductsService;
        this._matPaginator = _matPaginator;
        this._matSort = _matSort;
        this._filterChange = new BehaviorSubject('');
        this._filteredDataChange = new BehaviorSubject('');
        this.filteredData = this._ecommerceProductsService.products;
    }
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect() {
        const displayDataChanges = [
            this._ecommerceProductsService.onProductsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];
        return merge(...displayDataChanges)
            .pipe(map(() => {
            let data = this._ecommerceProductsService.products.slice();
            data = this.filterData(data);
            this.filteredData = [...data];
            data = this.sortData(data);
            // Grab the page's slice of data.
            const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
            return data.splice(startIndex, this._matPaginator.pageSize);
        }));
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
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'active':
                    [propertyA, propertyB] = [a.active, b.active];
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
//# sourceMappingURL=products.component.js.map