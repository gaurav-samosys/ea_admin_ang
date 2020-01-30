import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { Contact } from 'app/main/apps/contacts/contact.model';
let ContactsService = class ContactsService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this.selectedContacts = [];
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getUserData()
            ]).then(([files]) => {
                this.onSearchTextChanged.subscribe(searchText => {
                    this.searchText = searchText;
                    this.getContacts();
                });
                this.onFilterChanged.subscribe(filter => {
                    this.filterBy = filter;
                    this.getContacts();
                });
                resolve();
            }, reject);
        });
    }
    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/contacts-contacts')
                .subscribe((response) => {
                this.contacts = response;
                if (this.filterBy === 'starred') {
                    this.contacts = this.contacts.filter(_contact => {
                        return this.user.starred.includes(_contact.id);
                    });
                }
                if (this.filterBy === 'frequent') {
                    this.contacts = this.contacts.filter(_contact => {
                        return this.user.frequentContacts.includes(_contact.id);
                    });
                }
                if (this.searchText && this.searchText !== '') {
                    this.contacts = FuseUtils.filterArrayByString(this.contacts, this.searchText);
                }
                this.contacts = this.contacts.map(contact => {
                    return new Contact(contact);
                });
                this.onContactsChanged.next(this.contacts);
                resolve(this.contacts);
            }, reject);
        });
    }
    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/contacts-user/5725a6802d10e277a0f35724')
                .subscribe((response) => {
                this.user = response;
                this.onUserDataChanged.next(this.user);
                resolve(this.user);
            }, reject);
        });
    }
    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedContact(id) {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);
            if (index !== -1) {
                this.selectedContacts.splice(index, 1);
                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);
                // Return
                return;
            }
        }
        // If we don't have it, push as selected
        this.selectedContacts.push(id);
        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }
    /**
     * Toggle select all
     */
    toggleSelectAll() {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        }
        else {
            this.selectContacts();
        }
    }
    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter, filterValue) {
        this.selectedContacts = [];
        // If there is no filter, select all contacts
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.contacts.map(contact => {
                this.selectedContacts.push(contact.id);
            });
        }
        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }
    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-contacts/' + contact.id, Object.assign({}, contact))
                .subscribe(response => {
                this.getContacts();
                resolve(response);
            });
        });
    }
    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/contacts-user/' + this.user.id, Object.assign({}, userData))
                .subscribe(response => {
                this.getUserData();
                this.getContacts();
                resolve(response);
            });
        });
    }
    /**
     * Deselect contacts
     */
    deselectContacts() {
        this.selectedContacts = [];
        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }
    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact) {
        const contactIndex = this.contacts.indexOf(contact);
        this.contacts.splice(contactIndex, 1);
        this.onContactsChanged.next(this.contacts);
    }
    /**
     * Delete selected contacts
     */
    deleteSelectedContacts() {
        for (const contactId of this.selectedContacts) {
            const contact = this.contacts.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.contacts.indexOf(contact);
            this.contacts.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.contacts);
        this.deselectContacts();
    }
};
ContactsService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ContactsService);
export { ContactsService };
//# sourceMappingURL=contacts.service.js.map