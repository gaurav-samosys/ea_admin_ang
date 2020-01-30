import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MailNgrxService } from '../../mail.service';
import { Mail } from '../../mail.model';
import * as fromStore from '../../store';
let MailNgrxListItemComponent = class MailNgrxListItemComponent {
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store} _store
     */
    constructor(_changeDetectorRef, _mailNgrxService, _store) {
        this._changeDetectorRef = _changeDetectorRef;
        this._mailNgrxService = _mailNgrxService;
        this._store = _store;
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.selectedMailIds$ = this._store.pipe(select(fromStore.getSelectedMailIds));
        this.selected = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    ngOnInit() {
        // Set the initial values
        this.mail = new Mail(this.mail);
        this.unread = !this.mail.read;
        this.selectedMailIds$.subscribe((selectedMailIds) => {
            this.selected = selectedMailIds.length > 0 && selectedMailIds.find(id => id === this.mail.id) !== undefined;
            this.refresh();
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    refresh() {
        this._changeDetectorRef.markForCheck();
    }
    onSelectedChange() {
        this._store.dispatch(new fromStore.ToggleInSelectedMails(this.mail.id));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Mail)
], MailNgrxListItemComponent.prototype, "mail", void 0);
tslib_1.__decorate([
    HostBinding('class.selected'),
    tslib_1.__metadata("design:type", Boolean)
], MailNgrxListItemComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    HostBinding('class.unread'),
    tslib_1.__metadata("design:type", Boolean)
], MailNgrxListItemComponent.prototype, "unread", void 0);
MailNgrxListItemComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx-list-item',
        templateUrl: './mail-list-item.component.html',
        styleUrls: ['./mail-list-item.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef,
        MailNgrxService,
        Store])
], MailNgrxListItemComponent);
export { MailNgrxListItemComponent };
//# sourceMappingURL=mail-list-item.component.js.map