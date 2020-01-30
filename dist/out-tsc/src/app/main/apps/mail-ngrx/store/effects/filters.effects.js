import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FiltersActions from 'app/main/apps/mail-ngrx/store/actions/filters.actions';
import { MailNgrxService } from 'app/main/apps/mail-ngrx/mail.service';
let FiltersEffect = class FiltersEffect {
    constructor(actions, mailService) {
        this.actions = actions;
        this.mailService = mailService;
        /**
         * Get filters from Server
         * @type {Observable<any>}
         */
        this.getFilters = this.actions
            .pipe(ofType(FiltersActions.GET_FILTERS), switchMap((action) => {
            return this.mailService.getFilters()
                .pipe(map((filters) => {
                return new FiltersActions.GetFiltersSuccess(filters);
            }), catchError(err => of(new FiltersActions.GetFiltersFailed(err))));
        }));
    }
};
tslib_1.__decorate([
    Effect(),
    tslib_1.__metadata("design:type", Observable)
], FiltersEffect.prototype, "getFilters", void 0);
FiltersEffect = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Actions,
        MailNgrxService])
], FiltersEffect);
export { FiltersEffect };
//# sourceMappingURL=filters.effects.js.map