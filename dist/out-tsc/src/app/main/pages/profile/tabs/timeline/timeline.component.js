import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ProfileTimelineComponent = class ProfileTimelineComponent {
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
        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
            this.timeline = timeline;
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
ProfileTimelineComponent = tslib_1.__decorate([
    Component({
        selector: 'profile-timeline',
        templateUrl: './timeline.component.html',
        styleUrls: ['./timeline.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileService])
], ProfileTimelineComponent);
export { ProfileTimelineComponent };
//# sourceMappingURL=timeline.component.js.map