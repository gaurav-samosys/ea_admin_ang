import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchClassicService } from 'app/main/pages/search/classic/search-classic.service';
let SearchClassicComponent = class SearchClassicComponent {
    /**
     * Constructor
     *
     * @param {SearchClassicService} _searchClassicService
     */
    constructor(_searchClassicService) {
        this._searchClassicService = _searchClassicService;
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
        this._searchClassicService.dataOnChanged
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
SearchClassicComponent = tslib_1.__decorate([
    Component({
        selector: 'search-classic',
        templateUrl: './search-classic.component.html',
        styleUrls: ['./search-classic.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [SearchClassicService])
], SearchClassicComponent);
export { SearchClassicComponent };
//# sourceMappingURL=search-classic.component.js.map