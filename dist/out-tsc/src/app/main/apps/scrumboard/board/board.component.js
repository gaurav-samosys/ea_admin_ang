import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { List } from 'app/main/apps/scrumboard/list.model';
let ScrumboardBoardComponent = class ScrumboardBoardComponent {
    constructor(_activatedRoute, _location, _scrumboardService) {
        this._activatedRoute = _activatedRoute;
        this._location = _location;
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
     * On list add
     *
     * @param newListName
     */
    onListAdd(newListName) {
        if (newListName === '') {
            return;
        }
        this._scrumboardService.addList(new List({ name: newListName }));
    }
    /**
     * On board name changed
     *
     * @param newName
     */
    onBoardNameChanged(newName) {
        this._scrumboardService.updateBoard();
        this._location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
    }
    /**
     * On drop
     *
     * @param ev
     */
    onDrop(ev) {
        this._scrumboardService.updateBoard();
    }
};
ScrumboardBoardComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        Location,
        ScrumboardService])
], ScrumboardBoardComponent);
export { ScrumboardBoardComponent };
//# sourceMappingURL=board.component.js.map