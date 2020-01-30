import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { Mail } from 'app/main/apps/mail/mail.model';
let MailService = class MailService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        this.searchText = '';
        // Set the defaults
        this.selectedMails = [];
        this.onMailsChanged = new BehaviorSubject([]);
        this.onSelectedMailsChanged = new BehaviorSubject([]);
        this.onCurrentMailChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        this.routeParams = route.params;
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getMails()
            ]).then(() => {
                if (this.routeParams.mailId) {
                    this.setCurrentMail(this.routeParams.mailId);
                }
                else {
                    this.setCurrentMail(null);
                }
                this.onSearchTextChanged.subscribe(searchText => {
                    if (searchText !== '') {
                        this.searchText = searchText;
                        this.getMails();
                    }
                    else {
                        this.searchText = searchText;
                        this.getMails();
                    }
                });
                resolve();
            }, reject);
        });
    }
    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-folders')
                .subscribe((response) => {
                this.folders = response;
                this.onFoldersChanged.next(this.folders);
                resolve(this.folders);
            }, reject);
        });
    }
    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-filters')
                .subscribe((response) => {
                this.filters = response;
                this.onFiltersChanged.next(this.filters);
                resolve(this.filters);
            }, reject);
        });
    }
    /**
     * Get all labels
     *
     * @returns {Promise<any>}
     */
    getLabels() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels')
                .subscribe((response) => {
                this.labels = response;
                this.onLabelsChanged.next(this.labels);
                resolve(this.labels);
            }, reject);
        });
    }
    /**
     * Get all mails
     *
     * @returns {Promise<Mail[]>}
     */
    getMails() {
        if (this.routeParams.labelHandle) {
            return this.getMailsByLabel(this.routeParams.labelHandle);
        }
        if (this.routeParams.filterHandle) {
            return this.getMailsByFilter(this.routeParams.filterHandle);
        }
        return this.getMailsByFolder(this.routeParams.folderHandle);
    }
    /**
     * Get mails by folder
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFolder(handle) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-folders?handle=' + handle)
                .subscribe((folders) => {
                const folderId = folders[0].id;
                this._httpClient.get('api/mail-mails?folder=' + folderId)
                    .subscribe((mails) => {
                    this.mails = mails.map(mail => {
                        return new Mail(mail);
                    });
                    this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);
                    this.onMailsChanged.next(this.mails);
                    resolve(this.mails);
                }, reject);
            });
        });
    }
    /**
     * Get mails by filter
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByFilter(handle) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-mails?' + handle + '=true')
                .subscribe((mails) => {
                this.mails = mails.map(mail => {
                    return new Mail(mail);
                });
                this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);
                this.onMailsChanged.next(this.mails);
                resolve(this.mails);
            }, reject);
        });
    }
    /**
     * Get mails by label
     *
     * @param handle
     * @returns {Promise<Mail[]>}
     */
    getMailsByLabel(handle) {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels?handle=' + handle)
                .subscribe((labels) => {
                const labelId = labels[0].id;
                this._httpClient.get('api/mail-mails?labels=' + labelId)
                    .subscribe((mails) => {
                    this.mails = mails.map(mail => {
                        return new Mail(mail);
                    });
                    this.mails = FuseUtils.filterArrayByString(this.mails, this.searchText);
                    this.onMailsChanged.next(this.mails);
                    resolve(this.mails);
                }, reject);
            });
        });
    }
    /**
     * Toggle selected mail by id
     *
     * @param id
     */
    toggleSelectedMail(id) {
        // First, check if we already have that mail as selected...
        if (this.selectedMails.length > 0) {
            for (const mail of this.selectedMails) {
                // ...delete the selected mail
                if (mail.id === id) {
                    const index = this.selectedMails.indexOf(mail);
                    if (index !== -1) {
                        this.selectedMails.splice(index, 1);
                        // Trigger the next event
                        this.onSelectedMailsChanged.next(this.selectedMails);
                        // Return
                        return;
                    }
                }
            }
        }
        // If we don't have it, push as selected
        this.selectedMails.push(this.mails.find(mail => {
            return mail.id === id;
        }));
        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }
    /**
     * Toggle select all
     */
    toggleSelectAll() {
        if (this.selectedMails.length > 0) {
            this.deselectMails();
        }
        else {
            this.selectMails();
        }
    }
    /**
     * Select mails
     *
     * @param filterParameter
     * @param filterValue
     */
    selectMails(filterParameter, filterValue) {
        this.selectedMails = [];
        // If there is no filter, select all mails
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedMails = this.mails;
        }
        else {
            this.selectedMails.push(...this.mails.filter(mail => {
                return mail[filterParameter] === filterValue;
            }));
        }
        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }
    /**
     * Deselect mails
     */
    deselectMails() {
        this.selectedMails = [];
        // Trigger the next event
        this.onSelectedMailsChanged.next(this.selectedMails);
    }
    /**
     * Set current mail by id
     *
     * @param id
     */
    setCurrentMail(id) {
        this.currentMail = this.mails.find(mail => {
            return mail.id === id;
        });
        this.onCurrentMailChanged.next(this.currentMail);
    }
    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedMails(labelId) {
        this.selectedMails.map(mail => {
            const index = mail.labels.indexOf(labelId);
            if (index !== -1) {
                mail.labels.splice(index, 1);
            }
            else {
                mail.labels.push(labelId);
            }
            this.updateMail(mail);
        });
    }
    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedMails(folderId) {
        this.selectedMails.map(mail => {
            mail.folder = folderId;
            this.updateMail(mail);
        });
        this.deselectMails();
    }
    /**
     * Update the mail
     *
     * @param mail
     * @returns {Promise<any>}
     */
    updateMail(mail) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/mail-mails/' + mail.id, Object.assign({}, mail))
                .subscribe(response => {
                this.getMails().then(mails => {
                    if (mails && this.currentMail) {
                        this.setCurrentMail(this.currentMail.id);
                    }
                    resolve(mails);
                }, reject);
            });
        });
    }
};
MailService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map