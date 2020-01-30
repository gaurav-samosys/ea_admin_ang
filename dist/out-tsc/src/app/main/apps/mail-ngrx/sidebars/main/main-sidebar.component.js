import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
import * as fromStore from 'app/main/apps/mail-ngrx/store';
import { MailNgrxComposeDialogComponent } from 'app/main/apps/mail-ngrx/dialogs/compose/compose.component';
let MailNgrxMainSidebarComponent = class MailNgrxMainSidebarComponent {
    /**
     * Constructor
     *
     * @param {MailNgrxService} _mailNgrxService
     * @param {MatDialog} _matDialog
     * @param {Store<MailAppState>} _store
     */
    constructor(_mailNgrxService, _matDialog, _store) {
        this._mailNgrxService = _mailNgrxService;
        this._matDialog = _matDialog;
        this._store = _store;
        // Set the defaults
        this.accounts = {
            creapond: 'johndoe@creapond.com',
            withinpixels: 'johndoe@withinpixels.com'
        };
        this.selectedAccount = 'creapond';
        this.folders$ = this._store.pipe(select(fromStore.getFoldersArr));
        this.filters$ = this._store.pipe(select(fromStore.getFiltersArr));
        this.labels$ = this._store.pipe(select(fromStore.getLabelsArr));
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Compose dialog
     */
    composeDialog() {
        this.dialogRef = this._matDialog.open(MailNgrxComposeDialogComponent, {
            panelClass: 'mail-ngrx-compose-dialog'
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
                 * Send
                 */
                case 'send':
                    console.log('new Mail', formData.getRawValue());
                    break;
                /**
                 * Delete
                 */
                case 'delete':
                    console.log('delete Mail');
                    break;
            }
        });
    }
};
MailNgrxMainSidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx-main-sidebar',
        templateUrl: './main-sidebar.component.html',
        styleUrls: ['./main-sidebar.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [MailNgrxService,
        MatDialog,
        Store])
], MailNgrxMainSidebarComponent);
export { MailNgrxMainSidebarComponent };
//# sourceMappingURL=main-sidebar.component.js.map