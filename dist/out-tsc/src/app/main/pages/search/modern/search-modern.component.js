import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchModernService } from 'app/main/pages/search/modern/search-modern.service';
let SearchModernComponent = class SearchModernComponent {
    /**
     * Constructor
     *
     * @param {SearchModernService} _searchModernService
     */
    constructor(_searchModernService) {
        this._searchModernService = _searchModernService;
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
        this._searchModernService.dataOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(searchItems => {
            this.searchItems = searchItems;
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
SearchModernComponent = tslib_1.__decorate([
    Component({
        selector: 'search-modern',
        templateUrl: './search-modern.component.html',
        styleUrls: ['./search-modern.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [SearchModernService])
], SearchModernComponent);
export { SearchModernComponent };
//# sourceMappingURL=search-modern.component.js.map