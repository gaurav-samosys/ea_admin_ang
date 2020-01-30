import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, debounceTime, map, mergeMap, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { getRouterState } from 'app/store/reducers';
import { getMailsState } from 'app/main/apps/mail-ngrx/store/selectors';
import * as MailsActions from 'app/main/apps/mail-ngrx/store/actions/mails.actions';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let MailsEffect = class MailsEffect {
    constructor(actions, mailService, store) {
        this.actions = actions;
        this.mailService = mailService;
        this.store = store;
        /**
         * Get Mails with router parameters
         * @type {Observable<any>}
         */
        this.getMails = this.actions
            .pipe(ofType(MailsActions.GET_MAILS), exhaustMap((action) => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('labelHandle', 'filterHandle', 'folderHandle');
            routeParams.subscribe(param => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            return this.mailService.getMails(handle)
                .pipe(map((mails) => {
                return new MailsActions.GetMailsSuccess({
                    loaded: handle,
                    mails: mails
                });
            }), catchError(err => of(new MailsActions.GetMailsFailed(err))));
        }));
        /**
         * Update Mail
         * @type {Observable<any>}
         */
        this.updateMail = this.actions
            .pipe(ofType(MailsActions.UPDATE_MAIL), exhaustMap((action) => {
            return this.mailService.updateMail(action.payload).pipe(map(() => {
                return new MailsActions.UpdateMailSuccess(action.payload);
            }));
        }));
        /**
         * UpdateMails
         * @type {Observable<any>}
         */
        this.updateMails = this.actions
            .pipe(ofType(MailsActions.UPDATE_MAILS), exhaustMap((action) => {
            return forkJoin(action.payload.map(mail => this.mailService.updateMail(mail))).pipe(map(() => {
                return new MailsActions.UpdateMailsSuccess();
            }));
        }));
        /**
         * Set Current Mail
         * @type {Observable<SetCurrentMailSuccess>}
         */
        this.setCurrentMail = this.actions
            .pipe(ofType(MailsActions.SET_CURRENT_MAIL), withLatestFrom(this.store.pipe(select(getMailsState))), map(([action, state]) => {
            return new MailsActions.SetCurrentMailSuccess(state.entities[action.payload]);
        }));
        /**
         * Check Current Mail
         * Navigate to parent directory if not exist in mail list
         * Update Current Mail if exist in mail list
         * @type {Observable<any>}
         */
        this.checkCurrentMail = this.actions
            .pipe(ofType(MailsActions.CHECK_CURRENT_MAIL), withLatestFrom(this.store.pipe(select(getMailsState))), map(([action, state]) => {
            if (this.routerState.params.mailId && !state.entities[this.routerState.params.mailId]) {
                // return new fromRoot.Go({path: [this.routerState.url.replace(this.routerState.params.mailId, '')]});
            }
            return new MailsActions.SetCurrentMailSuccess(state.entities[this.routerState.params.mailId]);
        }));
        /**
         * On Get Mails Success
         * @type {Observable<CheckCurrentMail>}
         */
        this.getMailsSuccess = this.actions
            .pipe(ofType(MailsActions.GET_MAILS_SUCCESS), mergeMap(() => [
            new MailsActions.CheckCurrentMail()
        ]));
        /**
         * On Update Mails Success
         * @type {Observable<DeselectAllMails | GetMails>}
         */
        this.updateMailsSuccess = this.actions
            .pipe(ofType(MailsActions.UPDATE_MAILS_SUCCESS), mergeMap(() => [
            new MailsActions.DeselectAllMails(),
            new MailsActions.GetMails()
        ]));
        /**
         * On Update Mail Success
         * @type {Observable<GetMails>}
         */
        this.updateMailSuccess = this.actions
            .pipe(ofType(MailsActions.UPDATE_MAIL_SUCCESS), debounceTime(500), map(() => {
            return new MailsActions.GetMails();
        }));
        /**
         * Set Folder on Selected Mails
         * @type {Observable<UpdateMails>}
         */
        this.setFolderOnSelectedMails = this.actions
            .pipe(ofType(MailsActions.SET_FOLDER_ON_SELECTED_MAILS), withLatestFrom(this.store.pipe(select(getMailsState))), map(([action, state]) => {
            const entities = Object.assign({}, state.entities);
            let mailsToUpdate = [];
            state.selectedMailIds
                .map(id => {
                mailsToUpdate = [
                    ...mailsToUpdate,
                    entities[id] = Object.assign({}, entities[id], { folder: action.payload })
                ];
            });
            return new MailsActions.UpdateMails(mailsToUpdate);
        }));
        /**
         * Add Label on Selected Mails
         * @type {Observable<UpdateMails>}
         */
        this.addLabelOnSelectedMails = this.actions
            .pipe(ofType(MailsActions.ADD_LABEL_ON_SELECTED_MAILS), withLatestFrom(this.store.pipe(select(getMailsState))), map(([action, state]) => {
            const entities = Object.assign({}, state.entities);
            let mailsToUpdate = [];
            state.selectedMailIds
                .map(id => {
                let labels = [...entities[id].labels];
                if (!entities[id].labels.includes(action.payload)) {
                    labels = [...labels, action.payload];
                }
                mailsToUpdate = [
                    ...mailsToUpdate,
                    entities[id] = Object.assign({}, entities[id], { labels })
                ];
            });
            return new MailsActions.UpdateMails(mailsToUpdate);
        }));
        this.store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }
};
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "getMails", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "updateMail", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "updateMails", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "setCurrentMail", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "checkCurrentMail", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "getMailsSuccess", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "updateMailsSuccess", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "updateMailSuccess", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "setFolderOnSelectedMails", void 0);
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], MailsEffect.prototype, "addLabelOnSelectedMails", void 0);
MailsEffect = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Actions,
        MailNgrxService,
        Store])
], MailsEffect);
export { MailsEffect };
//# sourceMappingURL=mails.effects.js.map