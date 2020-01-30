import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
let ProfileService = class ProfileService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        // Set the defaults
        this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        this.photosVideosOnChanged = new BehaviorSubject({});
    }
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
                this.getTimeline(),
                this.getAbout(),
                this.getPhotosVideos()
            ]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get timeline
     */
    getTimeline() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-timeline')
                .subscribe((timeline) => {
                this.timeline = timeline;
                this.timelineOnChanged.next(this.timeline);
                resolve(this.timeline);
            }, reject);
        });
    }
    /**
     * Get about
     */
    getAbout() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-about')
                .subscribe((about) => {
                this.about = about;
                this.aboutOnChanged.next(this.about);
                resolve(this.about);
            }, reject);
        });
    }
    /**
     * Get photos & videos
     */
    getPhotosVideos() {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/profile-photos-videos')
                .subscribe((photosVideos) => {
                this.photosVideos = photosVideos;
                this.photosVideosOnChanged.next(this.photosVideos);
                resolve(this.photosVideos);
            }, reject);
        });
    }
};
ProfileService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ProfileService);
export { ProfileService };
//# sourceMappingURL=profile.service.js.map