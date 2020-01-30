import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
import * as fromStore from 'app/main/apps/mail-ngrx/store';
import { locale as english } from 'app/main/apps/mail-ngrx/i18n/en';
import { locale as turkish } from 'app/main/apps/mail-ngrx/i18n/tr';
let MailNgrxComponent = class MailNgrxComponent {
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store<MailAppState>} _store
     */
    constructor(_changeDetectorRef, _fuseSidebarService, _fuseTranslationLoaderService, _mailNgrxService, _store) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseSidebarService = _fuseSidebarService;
        this._fuseTranslationLoaderService = _fuseTranslationLoaderService;
        this._mailNgrxService = _mailNgrxService;
        this._store = _store;
        // Set the defaults
        this.searchInput = new FormControl('');
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
        this.currentMail$ = this._store.pipe(select(fromStore.getCurrentMail));
        this.mails$ = this._store.pipe(select(fromStore.getMailsArr));
        this.folders$ = this._store.pipe(select(fromStore.getFoldersArr));
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.selectedMailIds$ = this._store.pipe(select(fromStore.getSelectedMailIds));
        this.searchText$ = this._store.pipe(select(fromStore.getSearchText));
        this.mails = [];
        this.selectedMailIds = [];
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this.mails$.subscribe(mails => {
            this.mails = mails;
        });
        this.selectedMailIds$
            .subscribe(selectedMailIds => {
            this.selectedMailIds = selectedMailIds;
            this.hasSelectedMails = selectedMailIds.length > 0;
            this.isIndeterminate = (selectedMailIds.length !== this.mails.length && selectedMailIds.length > 0);
            this.refresh();
        });
        this.searchText$.subscribe(searchText => {
            this.searchInput.setValue(searchText);
        });
        this.searchInput.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(searchText => {
            this._store.dispatch(new fromStore.SetSearchText(searchText));
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        this._changeDetectorRef.detach();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev) {
        ev.preventDefault();
        if (this.selectedMailIds.length && this.selectedMailIds.length > 0) {
            this.deselectAllMails();
        }
        else {
            this.selectAllMails();
        }
    }
    /**
     * Select all mails
     */
    selectAllMails() {
        this._store.dispatch(new fromStore.SelectAllMails());
    }
    /**
     * Deselect all mails
     */
    deselectAllMails() {
        this._store.dispatch(new fromStore.DeselectAllMails());
    }
    /**
     * Select mails by parameter
     *
     * @param parameter
     * @param value
     */
    selectMailsByParameter(parameter, value) {
        this._store.dispatch(new fromStore.SelectMailsByParameter({
            parameter,
            value
        }));
    }
    /**
     * Toggle label on selected mails
     *
     * @param labelId
     */
    toggleLabelOnSelectedMails(labelId) {
        this._store.dispatch(new fromStore.AddLabelOnSelectedMails(labelId));
    }
    /**
     * Set folder on selected mails
     *
     * @param folderId
     */
    setFolderOnSelectedMails(folderId) {
        this._store.dispatch(new fromStore.SetFolderOnSelectedMails(folderId));
    }
    /**
     * Deselect current mail
     */
    deselectCurrentMail() {
        this._store.dispatch(new fromStore.SetCurrentMail(''));
    }
    /**
     * Refresh
     */
    refresh() {
        this._changeDetectorRef.markForCheck();
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
MailNgrxComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx',
        templateUrl: './mail.component.html',
        styleUrls: ['./mail.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
        FuseSidebarService,
        FuseTranslationLoaderService,
        MailNgrxService,
        Store])
], MailNgrxComponent);
export { MailNgrxComponent };
//# sourceMappingURL=mail.component.js.map