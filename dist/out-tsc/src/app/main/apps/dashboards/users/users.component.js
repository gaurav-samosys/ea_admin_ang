import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserConfirmboxComponent, ConfirmDialogModel } from './user-confirmbox/user-confirmbox.component';
import { PagerService } from '../pager.service';
const ELEMENT_DATA = [];
let UsersComponent = class UsersComponent {
    constructor(http, dialog, pagerService) {
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.showLoader = false;
        this.getUsers = myGlobals.getUsers;
        this.pageNumber = 0;
        this.size = 10;
        // pager object
        this.pager = {};
        this.displayedColumns = ['first_name', 'last_name', 'email', 'phone_no', 'status', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.showLoader = true;
        this.http.post(this.getUsers, { fields: '*', offset: this.pageNumber, limit: this.size, token: 'LIVESITE' }, httpOptions).subscribe(res => {
            this.showLoader = false;
            this.response = res;
            this.data = this.response.data;
            this.dataSource.data = this.data;
            this.allItems = this.response.total_data;
            this.setPage(1);
        });
    }
    openDialog(value) {
        let dialog = this.dialog.open(ModalComponent, {
            data: value,
            width: '650px', height: '400px'
        });
    }
    confirmDialog(value) {
        const message = `Are you sure you want to delete this user detail?`;
        let id = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
        const dialogRef = this.dialog.open(UserConfirmboxComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
        });
    }
    editDialog(value) {
        const dialogRef = this.dialog.open(UserEditComponent, {
            width: '600px', height: '500px',
            data: value
        });
    }
    setPage(page) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page, this.size);
        // get current page of items
        this.start = this.pager.startIndex + 1;
        this.end = this.pager.endIndex + 1;
        this.pageNumber = this.pager.startIndex;
        this.size = 10;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.showLoader = true;
        this.http.post(this.getUsers, { fields: '*', offset: this.pageNumber, limit: this.size, token: 'LIVESITE' }, httpOptions)
            .subscribe(res => {
            this.showLoader = false;
            this.response = res;
            this.rows = this.response.data;
            this.data = this.rows.slice(0, 10);
            this.dataSource.data = this.data;
            this.allItems = this.response.total_data;
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], UsersComponent.prototype, "paginator", void 0);
UsersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-users',
        templateUrl: './users.component.html',
        styleUrls: ['./users.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, MatDialog, PagerService])
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map