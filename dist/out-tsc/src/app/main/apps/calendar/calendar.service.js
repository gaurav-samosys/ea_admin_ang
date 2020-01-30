import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
let CalendarService = class CalendarService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route, state) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(([events]) => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/calendar/events')
                .subscribe((response) => {
                this.events = response.data;
                this.onEventsUpdated.next(this.events);
                resolve(this.events);
            }, reject);
        });
    }
    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar/events', {
                id: 'events',
                data: [...events]
            })
                .subscribe((response) => {
                this.getEvents();
            }, reject);
        });
    }
};
CalendarService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CalendarService);
export { CalendarService };
//# sourceMappingURL=calendar.service.js.map