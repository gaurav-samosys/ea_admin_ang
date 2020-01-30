import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactsService } from 'app/main/apps/contacts/contacts.service';
let ContactsMainSidebarComponent = class ContactsMainSidebarComponent {
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(_contactsService) {
        this._contactsService = _contactsService;
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
        this.filterBy = this._contactsService.filterBy || 'all';
        this._contactsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
            this.user = user;
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
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter) {
        this.filterBy = filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }
};
ContactsMainSidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'contacts-main-sidebar',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactsService])
], ContactsMainSidebarComponent);
export { ContactsMainSidebarComponent };
//# sourceMappingURL=main.component.js.map