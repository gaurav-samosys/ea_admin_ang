import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ContactsService } from 'app/main/apps/contacts/contacts.service';
let ContactsSelectedBarComponent = class ContactsSelectedBarComponent {
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {MatDialog} _matDialog
     */
    constructor(_contactsService, _matDialog) {
        this._contactsService = _contactsService;
        this._matDialog = _matDialog;
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
        this._contactsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
            this.selectedContacts = selectedContacts;
            setTimeout(() => {
                this.hasSelectedContacts = selectedContacts.length > 0;
                this.isIndeterminate = (selectedContacts.length !== this._contactsService.contacts.length && selectedContacts.length > 0);
            }, 0);
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
     * Select all
     */
    selectAll() {
        this._contactsService.selectContacts();
    }
    /**
     * Deselect all
     */
    deselectAll() {
        this._contactsService.deselectContacts();
    }
    /**
     * Delete selected contacts
     */
    deleteSelectedContacts() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected contacts?';
        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
            if (result) {
                this._contactsService.deleteSelectedContacts();
            }
            this.confirmDialogRef = null;
        });
    }
};
ContactsSelectedBarComponent = tslib_1.__decorate([
    Component({
        selector: 'selected-bar',
        templateUrl: './selected-bar.component.html',
        styleUrls: ['./selected-bar.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ContactsService,
        MatDialog])
], ContactsSelectedBarComponent);
export { ContactsSelectedBarComponent };
//# sourceMappingURL=selected-bar.component.js.map