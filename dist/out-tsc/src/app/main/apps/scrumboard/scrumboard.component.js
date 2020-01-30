import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { Board } from 'app/main/apps/scrumboard/board.model';
let ScrumboardComponent = class ScrumboardComponent {
    /**
     * Constructor
     *
     * @param {Router} _router
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(_router, _scrumboardService) {
        this._router = _router;
        this._scrumboardService = _scrumboardService;
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
        this._scrumboardService.onBoardsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(boards => {
            this.boards = boards;
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
     * New board
     */
    newBoard() {
        const newBoard = new Board({});
        this._scrumboardService.createNewBoard(newBoard).then(() => {
            this._router.navigate(['/apps/scrumboard/boards/' + newBoard.id + '/' + newBoard.uri]);
        });
    }
};
ScrumboardComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard',
        templateUrl: './scrumboard.component.html',
        styleUrls: ['./scrumboard.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ScrumboardService])
], ScrumboardComponent);
export { ScrumboardComponent };
//# sourceMappingURL=scrumboard.component.js.map