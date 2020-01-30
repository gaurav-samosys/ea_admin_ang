import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ScrumboardBoardSettingsSidenavComponent = class ScrumboardBoardSettingsSidenavComponent {
    constructor(scrumboardService) {
        this.scrumboardService = scrumboardService;
        // Set the defaults
        this.view = 'main';
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
        this.scrumboardService.onBoardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(board => {
            this.board = board;
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle card cover
     */
    toggleCardCover() {
        this.board.settings.cardCoverImages = !this.board.settings.cardCoverImages;
        this.scrumboardService.updateBoard();
    }
    /**
     * Toggle subscription
     */
    toggleSubscription() {
        this.board.settings.subscribed = !this.board.settings.subscribed;
        this.scrumboardService.updateBoard();
    }
};
ScrumboardBoardSettingsSidenavComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-settings',
        templateUrl: './settings.component.html',
        styleUrls: ['./settings.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ScrumboardService])
], ScrumboardBoardSettingsSidenavComponent);
export { ScrumboardBoardSettingsSidenavComponent };
//# sourceMappingURL=settings.component.js.map