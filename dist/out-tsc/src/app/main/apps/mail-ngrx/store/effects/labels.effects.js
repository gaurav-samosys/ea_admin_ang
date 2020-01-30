import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as LabelsActions from '../actions/labels.actions';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let LabelsEffect = class LabelsEffect {
    constructor(actions, mailService) {
        this.actions = actions;
        this.mailService = mailService;
        /**
         * Get Labels from Server
         * @type {Observable<any>}
         */
        this.getLabels = this.actions
            .pipe(ofType(LabelsActions.GET_LABELS), switchMap((action) => {
            return this.mailService.getLabels()
                .pipe(map((labels) => {
                return new LabelsActions.GetLabelsSuccess(labels);
            }), catchError(err => of(new LabelsActions.GetLabelsFailed(err))));
        }));
    }
};
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], LabelsEffect.prototype, "getLabels", void 0);
LabelsEffect = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Actions,
        MailNgrxService])
], LabelsEffect);
export { LabelsEffect };
//# sourceMappingURL=labels.effects.js.map