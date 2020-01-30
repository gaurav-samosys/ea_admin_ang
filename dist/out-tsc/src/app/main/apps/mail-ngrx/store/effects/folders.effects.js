import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FoldersActions from 'app/main/apps/mail-ngrx/store/actions/folders.actions';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let FoldersEffect = class FoldersEffect {
    constructor(actions, mailService) {
        this.actions = actions;
        this.mailService = mailService;
        /**
         * Get Folders from Server
         * @type {Observable<any>}
         */
        this.getFolders = this.actions
            .pipe(ofType(FoldersActions.GET_FOLDERS), switchMap((action) => {
            return this.mailService.getFolders()
                .pipe(map((folders) => {
                return new FoldersActions.GetFoldersSuccess(folders);
            }), catchError(err => of(new FoldersActions.GetFoldersFailed(err))));
        }));
    }
};
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], FoldersEffect.prototype, "getFolders", void 0);
FoldersEffect = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Actions,
        MailNgrxService])
], FoldersEffect);
export { FoldersEffect };
//# sourceMappingURL=folders.effects.js.map