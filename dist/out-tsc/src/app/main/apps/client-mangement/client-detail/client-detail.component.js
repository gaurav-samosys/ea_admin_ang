import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { ClientDetailService } from './client-detail.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdduserComponent } from 'app/main/apps/user-mangement/user/adduser/adduser.component';
import { UserEditComponent } from 'app/main/apps/user-mangement/user/user-edit/user-edit.component';
let ClientDetailComponent = class ClientDetailComponent {
    constructor(_Activatedroute, datePipe, http, dialog, client_service) {
        this._Activatedroute = _Activatedroute;
        this.datePipe = datePipe;
        this.http = http;
        this.dialog = dialog;
        this.client_service = client_service;
        this.division = 1;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.pageNumber = 0;
        this.size = 10;
        this.value = '';
        // pager object
        this.pager = {};
        this.getClients = myGlobals.getClients;
        this.getIndustry = myGlobals.getIndustry;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.getUsers = myGlobals.getUsers;
        this.getClientVertical = myGlobals.getClientVertical;
        this.statusChangeApiUser = myGlobals.statusChangeApiUser;
        this.clientActive = myGlobals.clientActive;
        this.displayedColumns = ['first_name', 'email', 'client_name', 'created_on', 'status', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
    }
    ngOnInit() {
        this.id = this._Activatedroute.snapshot.paramMap.get("id");
        this.fetchCountry();
        this.getClient();
        this.ClientVertical();
        this.getIndustries();
        this.getUserData();
    }
    getClient() {
        this.client_service.Post(this.getClients, { id: this.id, fields: '*', token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.client_data = this.common.data;
            console.log(this.client_data);
            //this.setPage(1);
            this.company = this.client_data[0].company_name;
            this.client = this.client_data[0].client_name;
            this.emails = this.client_data[0].email;
            this.first = this.client_data[0].first_name;
            this.last = this.client_data[0].last_name;
            this.vertical2 = this.client_data[0].client_vertical;
            this.portal1 = this.client_data[0].name;
            this.phone = this.client_data[0].phone;
            this.countrys = this.client_data[0].country;
            this.states1 = this.client_data[0].state_name;
            this.city1 = this.client_data[0].city;
            this.industrys = this.client_data[0].industry;
        });
    }
    getUserData() {
        this.client_service.Post(this.getUsers, { clients: this.id, token: 'LIVESITE', limit: this.pageSize, offset: this.pageNumber }).subscribe(res => {
            this.common = res;
            this.data = this.common.data;
            this.allItems = this.common.total_data;
            console.log(this.data);
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
            this.Search(this.value, this.name);
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
        this.client_service.Post(this.getUsers, { clients: this.id, token: 'LIVESITE', limit: this.pageSize, offset: this.pageNumber }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            //this.showloader=false;
            this.data = this.common.data;
            this.dataSource = this.data;
        });
    }
    getIndustries() {
        this.client_service.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.industry = this.common.data;
        });
    }
    changelimit(value) {
        this.size = parseInt(value);
        this.getClient();
    }
    fetchCountry() {
        this.client_service.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    getState(value, name) {
        this.country1 = '';
        this.state = '';
        this.Search(value, name);
        this.client_service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
        });
    }
    Edit(value) {
        console.log(value);
        this.client_service.editData(value);
    }
    ClientVertical() {
        this.client_service.Post(this.getClientVertical, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.vertical = this.common.data;
        });
    }
    addUser() {
        let dialog = this.dialog.open(AdduserComponent, {
            width: '600px', height: '400px'
        });
    }
    editDialog(value) {
        const dialogRef = this.dialog.open(UserEditComponent, {
            width: '600px', height: '500px',
            data: value
        });
    }
    onChange(value, id) {
        console.log(value, id);
        let status;
        if (value == false) {
            status = 0;
        }
        else {
            status = 1;
        }
        this.client_service.Post(this.clientActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
            console.log(res);
        });
    }
    Search(value, name) {
        if (this.value != value) {
            this.currentPage = 0;
        }
        this.value = value;
        this.name = name;
        if (value.length == 0 || value == '') {
            if (name == 'fullname') {
                this.fullname = '';
            }
            else if (name == 'email') {
                this.email = '';
            }
            else if (name == 'email') {
                this.email = '';
            }
            else if (name == 'clientname') {
                this.clientname = '';
            }
            else if (name == 'companyname') {
                this.companyname = '';
            }
            else if (name == 'country') {
                this.country1 = '';
            }
            else if (name == 'state') {
                this.state = '';
            }
            else if (name == 'city') {
                this.city = '';
            }
            else if (name == 'status') {
                this.status = '';
            }
            else if (name == 'access_code') {
                this.access_code = '';
            }
            else if (name == 'start') {
                this.sdate = '';
            }
            else if (name == 'end') {
                this.edate = '';
            }
        }
        if (name == 'fullname') {
            this.fullname = value;
        }
        else if (name == 'email') {
            this.email = value;
        }
        else if (name == 'email') {
            this.email = value;
        }
        else if (name == 'clientname') {
            this.clientname = value;
        }
        else if (name == 'companyname') {
            this.companyname = value;
        }
        else if (name == 'country') {
            this.country1 = value;
        }
        else if (name == 'state') {
            this.state = value;
        }
        else if (name == 'city') {
            this.city = value;
        }
        else if (name == 'status') {
            this.status = value;
        }
        else if (name == 'access_code') {
            this.access_code = value;
        }
        else if (name == 'start') {
            this.sdate = value;
        }
        else if (name == 'end') {
            this.edate = value;
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.client_service.Post(this.getUsers, { clients: this.id, full_name: this.fullname, client_name: this.clientname, company_name: this.companyname, country: this.country1, state: this.state, city: this.city, status: this.status, access_code: this.access_code, start_date: this.sdate, end_date: this.edate, offset: this.pageNumber, limit: this.size, token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.rows = this.common.data;
            this.data = this.rows.slice(0, this.size);
            this.dataSource = this.data;
        });
    }
    MyDate(newDate, name) {
        let date;
        if (name == 'start') {
            this.startDate = newDate;
            date = this.startDate;
        }
        else if (name == 'end') {
            this.endDate = newDate;
            date = this.endDate;
        }
        if (date != null) {
            this.Search(this.datePipe.transform(date, "yyyy-MM-dd"), name);
        }
        else {
            this.Search(date = '', name);
        }
    }
    exportData() {
    }
    SwitchButton(value) {
        if (value == 1) {
            this.division = 1;
        }
        else if (value == 2) {
            this.division = 2;
        }
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], ClientDetailComponent.prototype, "paginator", void 0);
ClientDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-client-detail',
        templateUrl: './client-detail.component.html',
        styleUrls: ['./client-detail.component.scss'],
        providers: [DatePipe]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, DatePipe, HttpClient, MatDialog, ClientDetailService])
], ClientDetailComponent);
export { ClientDetailComponent };
//# sourceMappingURL=client-detail.component.js.map