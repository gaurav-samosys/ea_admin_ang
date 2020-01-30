import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { ClientsPopupComponent } from './clients-popup/clients-popup.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { PagerService } from '../pager.service';
let ClientsComponent = class ClientsComponent {
    constructor(http, dialog, pagerService) {
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.pageNumber = 0;
        this.size = 10;
        // pager object
        this.pager = {};
        this.getClients = myGlobals.getClients;
        this.displayedColumns = ['first_name', 'last_name', 'email', 'phone_no', 'status', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
    }
    ngOnInit() {
        // this.http.get('getClients').subscribe(res=>{
        //   console.log(res);
        // })
        this.dataSource.paginator = this.paginator;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.http.post(this.getClients, { fields: '*', offset: this.pageNumber, limit: this.size, token: 'LIVESITE' }, httpOptions).subscribe(res => {
            this.response = res;
            this.data = this.response.data;
            console.log(this.data);
            this.dataSource.data = this.data;
            this.allItems = this.response.total_data;
            this.setPage(1);
        });
    }
    openDialog(value) {
        let dialog = this.dialog.open(ClientsPopupComponent, {
            data: value,
            width: '650px', height: '400px'
        });
    }
    confirmDialog(value) {
        const message = `Are you sure you want to delete this user detail?`;
        let id = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
        const dialogRef = this.dialog.open(ConfirmBoxComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
        });
    }
    editDialog(value) {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            width: '600px', height: '500px',
            data: value
        });
    }
    setPage(page) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page, this.size);
        this.start = this.pager.startIndex + 1;
        this.end = this.pager.endIndex + 1;
        // get current page of items
        this.pageNumber = this.pager.startIndex;
        this.size = 10;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        this.http.post(this.getClients, { fields: '*', offset: this.pageNumber, limit: this.size, token: 'LIVESITE' }, httpOptions)
            .subscribe(res => {
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
], ClientsComponent.prototype, "paginator", void 0);
ClientsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-clients',
        templateUrl: './clients.component.html',
        styleUrls: ['./clients.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, MatDialog, PagerService])
], ClientsComponent);
export { ClientsComponent };
//# sourceMappingURL=clients.component.js.map