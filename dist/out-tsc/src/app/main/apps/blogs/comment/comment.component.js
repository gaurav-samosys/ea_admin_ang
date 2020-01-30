import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CommentService } from './comment.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
let CommentComponent = class CommentComponent {
    constructor(dialog, toastr, comment_service) {
        this.dialog = dialog;
        this.toastr = toastr;
        this.comment_service = comment_service;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.sort_order = "DESC";
        this.changeCommentStatusApi = myGlobals.changeCommentStatusApi;
        this.getCommentWithDataApi = myGlobals.getCommentWithDataApi;
        this.deleteCommentApi = myGlobals.deleteCommentApi;
        this.dataSource = new MatTableDataSource(this.data);
        this.displayedColumns = ['user_name', 'user_email', 'website', 'comment', 'date', 'status'];
        /**
         * button toggle
         */
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.getCommentsList();
    }
    getCommentsList() {
        this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            console.log(res);
            this.allItems = this.response['recordsTotal'];
            this.data = this.response.data;
            this.dataSource = this.data;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
        });
    }
    handlePage(e) {
        console.log(e);
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.startIndex = (this.currentPage * e.pageSize) + 1;
        this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
        if (this.value != '') {
            console.log(this.value, this.name);
            // this.Search(this.value, this.name)
        }
        else {
            this.iterator();
        }
    }
    iterator() {
        let part;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        /* this.showloader=true;*/
        this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            this.allItems = this.response['recordsTotal'];
            //this.showloader=false;
            this.data = this.response.data;
            this.dataSource = this.data;
        });
    }
    /**
      * =========================================
      *        Update sorting
      * =========================================
      */
    updateSortingOrderComment(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        this.comment_service.Post(this.getCommentWithDataApi, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            this.dataSource = this.response.data;
        });
    }
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    /**
     * status change
     * @param value
     * @param id
     */
    onChange(value, id) {
        console.log(value, id);
        let status;
        if (value.checked == true) {
            status = 1;
            this.toastr.success('Status Active Successfully');
            this.comment_service.Post(this.changeCommentStatusApi, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
                console.log(res);
            });
        }
        else {
            status = 0;
            this.toastr.success('Status Inactive Successfully');
            this.comment_service.Post(this.changeCommentStatusApi, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
                console.log(res);
            });
        }
    }
    /**
     * confirm Dialog for delete
     */
    confirmDialog(value) {
        const message = `Are you sure you want to delete this comment detail?`;
        let id = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
            console.log(this.result);
            if (this.result == true) {
                // this.comment_service.Post(this.deleteCommentApi,{id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
                // })
                this.getCommentsList();
                this.toastr.success("Comment Record Delete SuccessFully");
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], CommentComponent.prototype, "paginator", void 0);
CommentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-comment',
        templateUrl: './comment.component.html',
        styleUrls: ['./comment.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog,
        ToastrService,
        CommentService])
], CommentComponent);
export { CommentComponent };
// Search(value,search){
// }
//# sourceMappingURL=comment.component.js.map