import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
let ProfileAboutComponent = class ProfileAboutComponent {
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
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
            this.about = about;
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
ProfileAboutComponent = tslib_1.__decorate([
    Component({
        selector: 'profile-about',
        templateUrl: './about.component.html',
        styleUrls: ['./about.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ProfileService])
], ProfileAboutComponent);
export { ProfileAboutComponent };
//# sourceMappingURL=about.component.js.map