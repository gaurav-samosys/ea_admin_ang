import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let MailNgrxListComponent = class MailNgrxListComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {MailNgrxService} _mailNgrxService
     * @param {Router} _router
     */
    constructor(_activatedRoute, _mailNgrxService, _router) {
        this._activatedRoute = _activatedRoute;
        this._mailNgrxService = _mailNgrxService;
        this._router = _router;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Read mail
     *
     * @param mailId
     */
    readMail(mailId) {
        const labelHandle = this._activatedRoute.snapshot.params.labelHandle, filterHandle = this._activatedRoute.snapshot.params.filterHandle, folderHandle = this._activatedRoute.snapshot.params.folderHandle;
        if (labelHandle) {
            this._router.navigate(['apps/mail-ngrx/label/' + labelHandle + '/' + mailId]);
        }
        else if (filterHandle) {
            this._router.navigate(['apps/mail-ngrx/filter/' + filterHandle + '/' + mailId]);
        }
        else {
            this._router.navigate(['apps/mail-ngrx/' + folderHandle + '/' + mailId]);
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], MailNgrxListComponent.prototype, "mails", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], MailNgrxListComponent.prototype, "currentMail", void 0);
MailNgrxListComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-ngrx-list',
        templateUrl: './mail-list.component.html',
        styleUrls: ['./mail-list.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        MailNgrxService,
        Router])
], MailNgrxListComponent);
export { MailNgrxListComponent };
//# sourceMappingURL=mail-list.component.js.map