import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MailService } from 'app/main/apps/mail/mail.service';
import { locale as english } from 'app/main/apps/mail//i18n/en';
import { locale as turkish } from 'app/main/apps/mail//i18n/tr';
let MailComponent = class MailComponent {
    /**
     * Constructor
     *
     * @param {MailService} _mailService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(_mailService, _fuseSidebarService, _fuseTranslationLoaderService) {
        this._mailService = _mailService;
        this._fuseSidebarService = _fuseSidebarService;
        this._fuseTranslationLoaderService = _fuseTranslationLoaderService;
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        // Set the defaults
        this.searchInput = new FormControl('');
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
        this._mailService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMails => {
            setTimeout(() => {
                this.hasSelectedMails = selectedMails.length > 0;
                this.isIndeterminate = (selectedMails.length !== this._mailService.mails.length && selectedMails.length > 0);
            }, 0);
        });
        this._mailService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
            this.folders = this._mailService.folders;
        });
        this._mailService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
            this.filters = this._mailService.filters;
        });
        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
            this.labels = this._mailService.labels;
        });
        this._mailService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {
            if (!currentMail) {
                this.currentMail = null;
            }
            else {
                this.currentMail = currentMail;
            }
        });
        this.searchInput.valueChanges.pipe(takeUntil(this._unsubscribeAll), debounceTime(300), distinctUntilChanged())
            .subscribe(searchText => {
            this._mailService.onSearchTextChanged.next(searchText);
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
     * Toggle select all
     */
    toggleSelectAll() {
        this._mailService.toggleSelectAll();
    }
    /**
     * Select mails
     *
     * @param filterParameter
     * @param filterValue
     */
    selectMails(filterParameter, filterValue) {
        this._mailService.selectMails(filterParameter, filterValue);
    }
    /**
     * Deselect mails
     */
    deselectMails() {
        this._mailService.deselectMails();
    }
    /**
     * Deselect current mail
     */
    deselectCurrentMail() {
        this._mailService.onCurrentMailChanged.next(null);
    }
    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedMails(labelId) {
        this._mailService.toggleLabelOnSelectedMails(labelId);
    }
    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedMails(folderId) {
        this._mailService.setFolderOnSelectedMails(folderId);
    }
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
};
MailComponent = tslib_1.__decorate([
    Component({
        selector: 'mail',
        templateUrl: './mail.component.html',
        styleUrls: ['./mail.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [MailService,
        FuseSidebarService,
        FuseTranslationLoaderService])
], MailComponent);
export { MailComponent };
//# sourceMappingURL=mail.component.js.map