import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mail } from 'app/main/apps/mail/mail.model';
import { MailService } from 'app/main/apps/mail/mail.service';
let MailListItemComponent = class MailListItemComponent {
    /**
     * Constructor
     *
     * @param {MailService} _mailService
     */
    constructor(_mailService) {
        this._mailService = _mailService;
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
        // Set the initial values
        this.mail = new Mail(this.mail);
        // Subscribe to update on selected mail change
        this._mailService.onSelectedMailsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedMails => {
            this.selected = false;
            if (selectedMails.length > 0) {
                for (const mail of selectedMails) {
                    if (mail.id === this.mail.id) {
                        this.selected = true;
                        break;
                    }
                }
            }
        });
        // Subscribe to update on label change
        this._mailService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
            this.labels = labels;
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
     * On selected change
     */
    onSelectedChange() {
        this._mailService.toggleSelectedMail(this.mail.id);
    }
    /**
     * Toggle star
     *
     * @param event
     */
    toggleStar(event) {
        event.stopPropagation();
        this.mail.toggleStar();
        this._mailService.updateMail(this.mail);
    }
    /**
     * Toggle Important
     *
     * @param event
     */
    toggleImportant(event) {
        event.stopPropagation();
        this.mail.toggleImportant();
        this._mailService.updateMail(this.mail);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Mail)
], MailListItemComponent.prototype, "mail", void 0);
tslib_1.__decorate([
    HostBinding('class.selected'),
    tslib_1.__metadata("design:type", Boolean)
], MailListItemComponent.prototype, "selected", void 0);
MailListItemComponent = tslib_1.__decorate([
    Component({
        selector: 'mail-list-item',
        templateUrl: './mail-list-item.component.html',
        styleUrls: ['./mail-list-item.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [MailService])
], MailListItemComponent);
export { MailListItemComponent };
//# sourceMappingURL=mail-list-item.component.js.map