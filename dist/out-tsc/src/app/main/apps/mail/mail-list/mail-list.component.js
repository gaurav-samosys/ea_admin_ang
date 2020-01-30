import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { MailService } from 'app/main/apps/mail/mail.service';
let MailListComponent = class MailListComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {MailService} _mailService
     * @param {Location} _location
     */
    constructor(_activatedRoute, _mailService, _location) {
        this._activatedRoute = _activatedRoute;
        this._mailService = _mailService;
        this._location = _location;
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
        // Subscribe to update mails on changes
        this._mailService.onMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(mails => {
            this.mails = mails;
        });
        // Subscribe to update current mail on changes
        this._mailService.onCurrentMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentMail => {
            if (!currentMail) {
                // Set the current mail id to null to deselect the current mail
                this.currentMail = null;
                // Handle the location changes
                const labelHandle = this._activatedRoute.snapshot.params.labelHandle, filterHandle = this._activatedRoute.snapshot.params.filterHandle, folderHandle = this._activatedRoute.snapshot.params.folderHandle;
                if (labelHandle) {
                    this._location.go('apps/mail/label/' + labelHandle);
                }
                else if (filterHandle) {
                    this._location.go('apps/mail/filter/' + filterHandle);
                }
                else {
                    this._location.go('apps/mail/' + folderHandle);
                }
            }
            else {
                this.currentMail = currentMail;
            }
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
     * Read mail
     *
     * @param mailId
     */
    readMail(mailId) {
        const labelHandle = this._activatedRoute.snapshot.params.labelHandle, filterHandle = this._activatedRoute.snapshot.params.filterHandle, folderHandle = this._activatedRoute.snapshot.params.folderHandle;
        if (labelHandle) {
            this._location.go('apps/mail/label/' + labelHandle + '/' + mailId);
        }
        else if (filterHandle) {
            this._location.go('apps/mail/filter/' + filterHandle + '/' + mailId);
        }
        else {
            this._location.go('apps/mail/' + folderHandle + '/' + mailId);
        }
        // Set current mail
        this._mailService.setCurrentMail(mailId);
    }
};
MailListComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-list',
        templateUrl: './mail-list.component.html',
        styleUrls: ['./mail-list.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        MailService,
        Location])
], MailListComponent);
export { MailListComponent };
//# sourceMappingURL=mail-list.component.js.map