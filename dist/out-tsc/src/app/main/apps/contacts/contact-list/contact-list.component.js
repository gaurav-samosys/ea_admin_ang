import * as tslib_1 from "tslib";
import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ContactsService } from 'app/main/apps/contacts/contacts.service';
import { ContactsContactFormDialogComponent } from 'app/main/apps/contacts/contact-form/contact-form.component';
let ContactsContactListComponent = class ContactsContactListComponent {
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     * @param {MatDialog} _matDialog
     */
    constructor(_contactsService, _matDialog) {
        this._contactsService = _contactsService;
        this._matDialog = _matDialog;
        this.displayedColumns = ['checkbox', 'avatar', 'name', 'email', 'phone', 'jobTitle', 'buttons'];
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
        this.dataSource = new FilesDataSource(this._contactsService);
        this._contactsService.onContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(contacts => {
            this.contacts = contacts;
            this.checkboxes = {};
            contacts.map(contact => {
                this.checkboxes[contact.id] = false;
            });
        });
        this._contactsService.onSelectedContactsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedContacts => {
            for (const id in this.checkboxes) {
                if (!this.checkboxes.hasOwnProperty(id)) {
                    continue;
                }
                this.checkboxes[id] = selectedContacts.includes(id);
            }
            this.selectedContacts = selectedContacts;
        });
        this._contactsService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
            this.user = user;
        });
        this._contactsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            this._contactsService.deselectContacts();
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
     * Edit contact
     *
     * @param contact
     */
    editContact(contact) {
        this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: {
                contact: contact,
                action: 'edit'
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
            if (!response) {
                return;
            }
            const actionType = response[0];
            const formData = response[1];
            switch (actionType) {
                /**
                 * Save
                 */
                case 'save':
                    this._contactsService.updateContact(formData.getRawValue());
                    break;
                /**
                 * Delete
                 */
                case 'delete':
                    this.deleteContact(contact);
                    break;
            }
        });
    }
    /**
     * Delete Contact
     */
    deleteContact(contact) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._contactsService.deleteContact(contact);
            }
            this.confirmDialogRef = null;
        });
    }
    /**
     * On selected change
     *
     * @param contactId
     */
    onSelectedChange(contactId) {
        this._contactsService.toggleSelectedContact(contactId);
    }
    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(contactId) {
        if (this.user.starred.includes(contactId)) {
            this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
        }
        else {
            this.user.starred.push(contactId);
        }
        this._contactsService.updateUserData(this.user);
    }
};
tslib_1.__decorate([
    ViewChild('dialogContent', { static: false }),
    tslib_1.__metadata("design:type", TemplateRef)
], ContactsContactListComponent.prototype, "dialogContent", void 0);
ContactsContactListComponent = tslib_1.__decorate([
    Component({
        selector: 'contacts-contact-list',
        templateUrl: './contact-list.component.html',
        styleUrls: ['./contact-list.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ContactsService,
        MatDialog])
], ContactsContactListComponent);
export { ContactsContactListComponent };
export class FilesDataSource extends DataSource {
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(_contactsService) {
        super();
        this._contactsService = _contactsService;
    }
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect() {
        return this._contactsService.onContactsChanged;
    }
    /**
     * Disconnect
     */
    disconnect() {
    }
}
//# sourceMappingURL=contact-list.component.js.map