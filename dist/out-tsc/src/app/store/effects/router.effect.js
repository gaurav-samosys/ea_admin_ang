import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';
import * as RouterActions from 'app/store/actions/router.action';
let RouterEffects = class RouterEffects {
    /**
     * Constructor
     *
     * @param {Actions} actions$
     * @param {Router} router
     * @param {Location} location
     */
    constructor(actions$, router, location) {
        this.actions$ = actions$;
        this.router = router;
        this.location = location;
        /**
         * Navigate
         */
        this.navigate$ = this.actions$.pipe(ofType(RouterActions.GO), map((action) => action.payload), tap(({ path, query: queryParams, extras }) => {
            this.router.navigate(path, Object.assign({}, queryParams, extras));
        }));
        /**
         * Navigate back
         * @type {Observable<any>}
         */
        this.navigateBack$ = this.actions$.pipe(ofType(RouterActions.BACK), tap(() => this.location.back()));
        /**
         * Navigate forward
         * @type {Observable<any>}
         */
        this.navigateForward$ = this.actions$.pipe(ofType(RouterActions.FORWARD), tap(() => this.location.forward()));
    }
};
tslib_1.__decorate([
    Effect({ dispatch: false }),
    tslib_1.__metadata("design:type", Object)
], RouterEffects.prototype, "navigate$", void 0);
tslib_1.__decorate([
    Effect({ dispatch: false }),
    tslib_1.__metadata("design:type", Object)
], RouterEffects.prototype, "navigateBack$", void 0);
tslib_1.__decorate([
    Effect({ dispatch: false }),
    tslib_1.__metadata("design:type", Object)
], RouterEffects.prototype, "navigateForward$", void 0);
RouterEffects = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Actions,
        Router,
        Location])
], RouterEffects);
export { RouterEffects };
//# sourceMappingURL=router.effect.js.map