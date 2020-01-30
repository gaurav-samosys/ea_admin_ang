import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { Card } from 'app/main/apps/scrumboard/card.model';
import { ScrumboardCardDialogComponent } from 'app/main/apps/scrumboard/board/dialogs/card/card.component';
let ScrumboardBoardListComponent = class ScrumboardBoardListComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {ScrumboardService} _scrumboardService
     * @param {MatDialog} _matDialog
     */
    constructor(_activatedRoute, _scrumboardService, _matDialog) {
        this._activatedRoute = _activatedRoute;
        this._scrumboardService = _scrumboardService;
        this._matDialog = _matDialog;
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
     * On list name changed
     *
     * @param newListName
     */
    onListNameChanged(newListName) {
        this.list.name = newListName;
    }
    /**
     * On card added
     *
     * @param newCardName
     */
    onCardAdd(newCardName) {
        if (newCardName === '') {
            return;
        }
        this._scrumboardService.addCard(this.list.id, new Card({ name: newCardName }));
        setTimeout(() => {
            this.listScroll.scrollToBottom(0, 400);
        });
    }
    /**
     * Remove list
     *
     * @param listId
     */
    removeList(listId) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the list and it\'s all cards?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._scrumboardService.removeList(listId);
            }
        });
    }
    /**
     * Open card dialog
     *
     * @param cardId
     */
    openCardDialog(cardId) {
        this.dialogRef = this._matDialog.open(ScrumboardCardDialogComponent, {
            panelClass: 'scrumboard-card-dialog',
            data: {
                cardId: cardId,
                listId: this.list.id
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
        });
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardListComponent.prototype, "list", void 0);
tslib_1.__decorate([
    ViewChild(FusePerfectScrollbarDirective, { static: false }),
    tslib_1.__metadata("design:type", FusePerfectScrollbarDirective)
], ScrumboardBoardListComponent.prototype, "listScroll", void 0);
ScrumboardBoardListComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        ScrumboardService,
        MatDialog])
], ScrumboardBoardListComponent);
export { ScrumboardBoardListComponent };
//# sourceMappingURL=list.component.js.map