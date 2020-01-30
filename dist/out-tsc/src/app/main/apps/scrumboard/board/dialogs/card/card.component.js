import * as tslib_1 from "tslib";
import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FuseUtils } from '@fuse/utils';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
import { takeUntil } from 'rxjs/operators';
let ScrumboardCardDialogComponent = class ScrumboardCardDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<ScrumboardCardDialogComponent>} matDialogRef
     * @param _data
     * @param {MatDialog} _matDialog
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(matDialogRef, _data, _matDialog, _scrumboardService) {
        this.matDialogRef = matDialogRef;
        this._data = _data;
        this._matDialog = _matDialog;
        this._scrumboardService = _scrumboardService;
        this.toggleInArray = FuseUtils.toggleInArray;
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
            this.card = this.board.cards.find((_card) => {
                return this._data.cardId === _card.id;
            });
            this.list = this.board.lists.find((_list) => {
                return this._data.listId === _list.id;
            });
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
     * Remove due date
     */
    removeDueDate() {
        this.card.due = '';
        this.updateCard();
    }
    /**
     * Toggle subscribe
     */
    toggleSubscribe() {
        this.card.subscribed = !this.card.subscribed;
        this.updateCard();
    }
    /**
     * Toggle cover image
     *
     * @param attachmentId
     */
    toggleCoverImage(attachmentId) {
        if (this.card.idAttachmentCover === attachmentId) {
            this.card.idAttachmentCover = '';
        }
        else {
            this.card.idAttachmentCover = attachmentId;
        }
        this.updateCard();
    }
    /**
     * Remove attachment
     *
     * @param attachment
     */
    removeAttachment(attachment) {
        if (attachment.id === this.card.idAttachmentCover) {
            this.card.idAttachmentCover = '';
        }
        this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);
        this.updateCard();
    }
    /**
     * Remove checklist
     *
     * @param checklist
     */
    removeChecklist(checklist) {
        this.card.checklists.splice(this.card.checklists.indexOf(checklist), 1);
        this.updateCard();
    }
    /**
     * Update checked count
     *
     * @param list
     */
    updateCheckedCount(list) {
        const checkItems = list.checkItems;
        let checkedItems = 0;
        let allCheckedItems = 0;
        let allCheckItems = 0;
        for (const checkItem of checkItems) {
            if (checkItem.checked) {
                checkedItems++;
            }
        }
        list.checkItemsChecked = checkedItems;
        for (const item of this.card.checklists) {
            allCheckItems += item.checkItems.length;
            allCheckedItems += item.checkItemsChecked;
        }
        this.card.checkItems = allCheckItems;
        this.card.checkItemsChecked = allCheckedItems;
        this.updateCard();
    }
    /**
     * Remove checklist item
     *
     * @param checkItem
     * @param checklist
     */
    removeChecklistItem(checkItem, checklist) {
        checklist.checkItems.splice(checklist.checkItems.indexOf(checkItem), 1);
        this.updateCheckedCount(checklist);
        this.updateCard();
    }
    /**
     * Add check item
     *
     * @param {NgForm} form
     * @param checkList
     */
    addCheckItem(form, checkList) {
        const checkItemVal = form.value.checkItem;
        if (!checkItemVal || checkItemVal === '') {
            return;
        }
        const newCheckItem = {
            name: checkItemVal,
            checked: false
        };
        checkList.checkItems.push(newCheckItem);
        this.updateCheckedCount(checkList);
        form.setValue({ checkItem: '' });
        this.updateCard();
    }
    /**
     * Add checklist
     *
     * @param {NgForm} form
     */
    addChecklist(form) {
        this.card.checklists.push({
            id: FuseUtils.generateGUID(),
            name: form.value.checklistTitle,
            checkItemsChecked: 0,
            checkItems: []
        });
        form.setValue({ checklistTitle: '' });
        form.resetForm();
        this.checklistMenu.closeMenu();
        this.updateCard();
    }
    /**
     * On checklist menu open
     */
    onChecklistMenuOpen() {
        setTimeout(() => {
            this.newCheckListTitleField.nativeElement.focus();
        });
    }
    /**
     * Add new comment
     *
     * @param {NgForm} form
     */
    addNewComment(form) {
        const newCommentText = form.value.newComment;
        const newComment = {
            idMember: '36027j1930450d8bf7b10158',
            message: newCommentText,
            time: 'now'
        };
        this.card.comments.unshift(newComment);
        form.setValue({ newComment: '' });
        this.updateCard();
    }
    /**
     * Remove card
     */
    removeCard() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the card?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.matDialogRef.close();
                this._scrumboardService.removeCard(this.card.id, this.list.id);
            }
        });
    }
    /**
     * Update card
     */
    updateCard() {
        this._scrumboardService.updateCard(this.card);
    }
};
tslib_1.__decorate([
    ViewChild('checklistMenuTrigger', { static: false }),
    tslib_1.__metadata("design:type", MatMenuTrigger)
], ScrumboardCardDialogComponent.prototype, "checklistMenu", void 0);
tslib_1.__decorate([
    ViewChild('newCheckListTitleField', { static: false }),
    tslib_1.__metadata("design:type", Object)
], ScrumboardCardDialogComponent.prototype, "newCheckListTitleField", void 0);
ScrumboardCardDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-card-dialog',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, MatDialog,
        ScrumboardService])
], ScrumboardCardDialogComponent);
export { ScrumboardCardDialogComponent };
//# sourceMappingURL=card.component.js.map