import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../../global';
import { CommentService } from '../comment.service';
let ConfirmDialogComponent = class ConfirmDialogComponent {
    constructor(dialogRef, data, rt, comment_service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this.comment_service = comment_service;
        this.deleteCommentApi = myGlobals.deleteCommentApi;
        this.res_data = data.id;
        console.log("check", this.res_data);
        this.title = data.title;
        this.message = data.message;
    }
    onConfirm() {
        // Close the dialog, return true
        this.comment_service.Post(this.deleteCommentApi, { id: this.res_data.id, token: "LIVESITE" }).subscribe(res => {
            console.log(res);
            if (res['success'] == true && res['status_code'] == 200) {
                this.dialogRef.close(true);
            }
        });
    }
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
    ngOnInit() {
    }
};
ConfirmDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-confirm-dialog',
        templateUrl: './confirm-dialog.component.html',
        styleUrls: ['./confirm-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, CommentService])
], ConfirmDialogComponent);
export { ConfirmDialogComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=confirm-dialog.component.js.map