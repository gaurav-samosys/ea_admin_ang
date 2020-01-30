import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
let ProfilePhotosVideosComponent = class ProfilePhotosVideosComponent {
    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(_profileService) {
        this._profileService = _profileService;
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
        this._profileService.photosVideosOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(photosVideos => {
            this.photosVideos = photosVideos;
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
};
ProfilePhotosVideosComponent = tslib_1.__decorate([
    Component({
        selector: 'profile-photos-videos',
        templateUrl: './photos-videos.component.html',
        styleUrls: ['./photos-videos.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileService])
], ProfilePhotosVideosComponent);
export { ProfilePhotosVideosComponent };
//# sourceMappingURL=photos-videos.component.js.map