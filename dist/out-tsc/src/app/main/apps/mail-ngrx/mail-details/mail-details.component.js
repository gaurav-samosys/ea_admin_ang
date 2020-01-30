import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Mail } from 'app/main/apps/mail-ngrx/mail.model';
import * as fromStore from 'app/main/apps/mail-ngrx/store';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let MailNgrxDetailsComponent = class MailNgrxDetailsComponent {
    /**
     * Constructor
     *
     * @param {MailNgrxService} _mailNgrxService
     * @param {Store<MailAppState>} _store
     */
    constructor(_mailNgrxService, _store) {
        this._mailNgrxService = _mailNgrxService;
        this._store = _store;
        // Set the defaults
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
        this.showDetails = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On changes
     */
    ngOnChanges() {
        this.updateModel(this.currentMail);
        this.markAsRead();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Mark as read
     */
    markAsRead() {
        if (this.mail && !this.mail.read) {
            this.mail.markRead();
            this.updateMail();
        }
    }
    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event) {
        event.stopPropagation();
        this.mail.toggleStar();
        this.updateMail();
    }
    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event) {
        event.stopPropagation();
        this.mail.toggleImportant();
        this.updateMail();
    }
    /**
     * Update model
     *
     * @param data
     */
    updateModel(data) {
        this.mail = !data ? null : new Mail(Object.assign({}, data));
    }
    /**
     * Update the mail
     */
    updateMail() {
        this._store.dispatch(new fromStore.UpdateMail(this.mail));
        this.updateModel(this.mail);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Mail)
], MailNgrxDetailsComponent.prototype, "currentMail", void 0);
MailNgrxDetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx-details',
        templateUrl: './mail-details.component.html',
        styleUrls: ['./mail-details.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [MailNgrxService,
        Store])
], MailNgrxDetailsComponent);
export { MailNgrxDetailsComponent };
//# sourceMappingURL=mail-details.component.js.map