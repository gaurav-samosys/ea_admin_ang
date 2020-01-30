import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, catchError, tap, take, filter } from 'rxjs/operators';
import * as fromStore from 'app/main/apps/mail-ngrx/store';
import { getFiltersLoaded, getFoldersLoaded, getLabelsLoaded, getMailsLoaded } from 'app/main/apps/mail-ngrx/store/selectors';
import { getRouterState } from 'app/store/reducers';
let ResolveGuard = class ResolveGuard {
    /**
     * Constructor
     *
     * @param {Store<MailAppState>} _store
     */
    constructor(_store) {
        this._store = _store;
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }
    /**
     * Can activate
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<boolean>}
     */
    canActivate(route, state) {
        return this.checkStore().pipe(switchMap(() => of(true)), catchError(() => of(false)));
    }
    /**
     * Check store
     *
     * @returns {Observable<any>}
     */
    checkStore() {
        return forkJoin(this.getFolders(), this.getFilters(), this.getLabels()).pipe(filter(([foldersLoaded, filtersLoaded, labelsLoaded]) => !!(foldersLoaded && filtersLoaded && labelsLoaded)), take(1), switchMap(() => this.getMails()), take(1), map(() => this._store.dispatch(new fromStore.SetCurrentMail(this.routerState.params.mailId))));
    }
    /**
     * Get folders
     *
     * @returns {Observable<any>}
     */
    getFolders() {
        return this._store.pipe(select(getFoldersLoaded), tap(loaded => {
            if (!loaded) {
                this._store.dispatch(new fromStore.GetFolders([]));
            }
        }), filter(loaded => loaded), take(1));
    }
    /**
     * Get Filters
     *
     * @returns {Observable<any>}
     */
    getFilters() {
        return this._store.pipe(select(getFiltersLoaded), tap(loaded => {
            if (!loaded) {
                this._store.dispatch(new fromStore.GetFilters([]));
            }
        }), filter(loaded => loaded), take(1));
    }
    /**
     * Get Labels
     * @returns {Observable<any>}
     */
    getLabels() {
        return this._store.pipe(select(getLabelsLoaded), tap(loaded => {
            if (!loaded) {
                this._store.dispatch(new fromStore.GetLabels([]));
            }
        }), filter(loaded => loaded), take(1));
    }
    /**
     * Get Mails
     *
     * @returns {Observable<any>}
     */
    getMails() {
        return this._store.pipe(select(getMailsLoaded), tap((loaded) => {
            if (!this.routerState.params[loaded.id] || this.routerState.params[loaded.id] !== loaded.value) {
                this._store.dispatch(new fromStore.GetMails());
                this._store.dispatch(new fromStore.SetSearchText(''));
                this._store.dispatch(new fromStore.DeselectAllMails());
            }
        }), filter((loaded) => {
            return this.routerState.params[loaded.id] && this.routerState.params[loaded.id] === loaded.value;
        }), take(1));
    }
};
ResolveGuard = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Store])
], ResolveGuard);
export { ResolveGuard };
//# sourceMappingURL=resolve.guard.js.map