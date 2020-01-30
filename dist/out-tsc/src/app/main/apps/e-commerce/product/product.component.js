import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
let EcommerceProductComponent = class EcommerceProductComponent {
    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(_ecommerceProductService, _formBuilder, _location, _matSnackBar) {
        this._ecommerceProductService = _ecommerceProductService;
        this._formBuilder = _formBuilder;
        this._location = _location;
        this._matSnackBar = _matSnackBar;
        // Set the default
        this.product = new Product();
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
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {
            if (product) {
                this.product = new Product(product);
                this.pageType = 'edit';
            }
            else {
                this.pageType = 'new';
                this.product = new Product();
            }
            this.productForm = this.createProductForm();
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
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm() {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            handle: [this.product.handle],
            description: [this.product.description],
            categories: [this.product.categories],
            tags: [this.product.tags],
            images: [this.product.images],
            priceTaxExcl: [this.product.priceTaxExcl],
            priceTaxIncl: [this.product.priceTaxIncl],
            taxRate: [this.product.taxRate],
            comparedPrice: [this.product.comparedPrice],
            quantity: [this.product.quantity],
            sku: [this.product.sku],
            width: [this.product.width],
            height: [this.product.height],
            depth: [this.product.depth],
            weight: [this.product.weight],
            extraShippingFee: [this.product.extraShippingFee],
            active: [this.product.active]
        });
    }
    /**
     * Save product
     */
    saveProduct() {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        this._ecommerceProductService.saveProduct(data)
            .then(() => {
            // Trigger the subscription with new data
            this._ecommerceProductService.onProductChanged.next(data);
            // Show the success message
            this._matSnackBar.open('Product saved', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
        });
    }
    /**
     * Add product
     */
    addProduct() {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        this._ecommerceProductService.addProduct(data)
            .then(() => {
            // Trigger the subscription with new data
            this._ecommerceProductService.onProductChanged.next(data);
            // Show the success message
            this._matSnackBar.open('Product added', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });
            // Change the location with new one
            this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
        });
    }
};
EcommerceProductComponent = tslib_1.__decorate([
    Component({
        selector: 'e-commerce-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [EcommerceProductService,
        FormBuilder,
        Location,
        MatSnackBar])
], EcommerceProductComponent);
export { EcommerceProductComponent };
//# sourceMappingURL=product.component.js.map