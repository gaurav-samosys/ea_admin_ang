import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
let IconsComponent = class IconsComponent {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.loading = true;
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
        this._httpClient.get('api/icons')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((icons) => {
            this.icons = icons;
            this.filteredIcons = this.icons;
            this.loading = false;
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
     * Filter icons
     *
     * @param event
     */
    filterIcons(event) {
        const value = event.target.value;
        this.filteredIcons = this.icons.filter(icon => {
            return icon.name.includes(value) || icon.tags.includes(value);
        });
    }
};
IconsComponent = tslib_1.__decorate([
    Component({
        selector: 'icons',
        templateUrl: './icons.component.html',
        styleUrls: ['./icons.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], IconsComponent);
export { IconsComponent };
//# sourceMappingURL=icons.component.js.map