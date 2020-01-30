import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatColors } from '@fuse/mat-colors';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
let ScrumboardBoardColorSelectorComponent = class ScrumboardBoardColorSelectorComponent {
    /**
     * Constructor
     *
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(_scrumboardService) {
        this._scrumboardService = _scrumboardService;
        // Set the defaults
        this.colors = MatColors.all;
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
        this._scrumboardService.onBoardChanged
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
     * Set the color
     *
     * @param color
     */
    setColor(color) {
        this.board.settings.color = color;
        this._scrumboardService.updateBoard();
    }
};
ScrumboardBoardColorSelectorComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-color-selector',
        templateUrl: './board-color-selector.component.html',
        styleUrls: ['./board-color-selector.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ScrumboardService])
], ScrumboardBoardColorSelectorComponent);
export { ScrumboardBoardColorSelectorComponent };
//# sourceMappingURL=board-color-selector.component.js.map