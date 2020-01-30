import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { getFiltersArr, getFoldersArr, getLabelsArr, getMailsArr } from 'app/main/apps/mail-ngrx/store/selectors';
let MailNgrxService = class MailNgrxService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {Store<MailAppState>} _store
     */
    constructor(_httpClient, _store) {
        this._httpClient = _httpClient;
        this._store = _store;
        this._store
            .pipe(select(getFoldersArr))
            .subscribe(folders => {
            this.foldersArr = folders;
        });
        this._store
            .pipe(select(getFiltersArr))
            .subscribe(filters => {
            this.filtersArr = filters;
        });
        this._store
            .pipe(select(getLabelsArr))
            .subscribe(labels => {
            this.labelsArr = labels;
        });
        this._store
            .pipe(select(getMailsArr))
            .subscribe(mails => {
            this.mails = mails;
        });
        this.selectedMails = [];
    }
    /**
     * Get all mails
     *
     * @returns {Observable<Mail[]>}
     */
    getAllMails() {
        return this._httpClient.get('api/mail-mails');
    }
    /**
     * Get folders
     *
     * @returns {Observable<any>}
     */
    getFolders() {
        return this._httpClient.get('api/mail-folders');
    }
    /**
     * Get filters
     *
     * @returns {Observable<any>}
     */
    getFilters() {
        return this._httpClient.get('api/mail-filters');
    }
    /**
     * Get labels
     *
     * @returns {Observable<any>}
     */
    getLabels() {
        return this._httpClient.get('api/mail-labels');
    }
    /**
     * Get mails
     *
     * @param handle
     * @returns {Observable<Mail[]>}
     */
    getMails(handle) {
        if (handle.id === 'labelHandle') {
            const labelId = this.labelsArr.find(label => label.handle === handle.value).id;
            return this._httpClient.get('api/mail-mails?labels=' + labelId);
        }
        else if (handle.id === 'filterHandle') {
            return this._httpClient.get('api/mail-mails?' + handle.value + '=true');
        }
        else // folderHandle
         {
            const folderId = this.foldersArr.find(folder => folder.handle === handle.value).id;
            return this._httpClient.get('api/mail-mails?folder=' + folderId);
        }
    }
    /**
     * Update the mail
     *
     * @param mail
     * @returns {Promise<any>}
     */
    updateMail(mail) {
        return this._httpClient.post('api/mail-mails/' + mail.id, Object.assign({}, mail));
    }
};
MailNgrxService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        Store])
], MailNgrxService);
export { MailNgrxService };
//# sourceMappingURL=mail.service.js.map