import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { PagerService } from '../pager.service';
import { CompanyDetailService } from './company-detail.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
let CompanyDetailComponent = class CompanyDetailComponent {
    constructor(_Activatedroute, datePipe, route, http, dialog, pagerService, companyService) {
        this._Activatedroute = _Activatedroute;
        this.datePipe = datePipe;
        this.route = route;
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.companyService = companyService;
        this.division = 1;
        this.pageNumber = 0;
        this.size = 10;
        // pager object
        this.pager = {};
        this.showloader = false;
        this.value = '';
        this.getClients = myGlobals.getClients;
        this.getClientVertical = myGlobals.getClientVertical;
        this.getCountry = myGlobals.getCountry;
        this.getStates = myGlobals.getState;
        this.getIndustry = myGlobals.getIndustry;
        this.companyActive = myGlobals.companyActive;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        // sort_column = "date_created";
        this.sort_order = "DESC";
        this.displayedColumns = ['client_name', 'client_vertical', 'name', 'created_on', 'status', 'total_user', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
    }
    ngOnInit() {
        this.id = this._Activatedroute.snapshot.paramMap.get("id");
        this.getIndustries();
        this.getData();
        this.ClientVertical();
    }
    getData() {
        this.companyService.Post(this.getClients, { company_id: this.id, fields: '*', token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.data = this.common.data;
            console.log(this.data);
            this.company_name = this.data[0].company_name;
            this.first_name = this.data[0].first_name;
            this.last_name = this.data[0].last_name;
            this.emails = this.data[0].email;
            this.phone = this.data[0].phone;
            this.industrys = this.data[0].industry;
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
        this.companyService.Post(this.getClients, { company_id: this.id, fields: '*', token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.data = this.common.data;
            this.dataSource = this.data;
        });
    }
    /**===========================================================
          sorting using Assending and dissending order
    ===========================================================*/
    updateSortingOrderCompany(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        // this.companyService.Post(this.getCompanies, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        //   this.response = res
        //   console.log(this.response.data)
        //   this.dataSource=this.response.data
        // })
    }
    /**===========================================================
             Export data and download
     ===========================================================*/
    // exportData() {
    //   this.companyService.Post(this.exportManageCompanies, {
    //     company_name: this.company ? this.company : '',
    //     full_name: this.fullname ? this.fullname : '',
    //     user_email: this.email ? this.email : '',
    //     country: this.country1 ? this.country1 : '',
    //     state: this.state1 ? this.state1 : '',
    //     city: this.city ? this.city : '',
    //     industry: this.industry1 ? this.industry1 : '',
    //     start_date: this.sdate ? this.sdate : '',
    //     end_date: this.edate ? this.edate : '',
    //     user_type: '',
    //     status_check: '',
    //     excel: '',
    //     pdf: '',
    //     search_keyword: '',
    //     token: 'LIVESITE'
    //   })
    //     .subscribe(res => {
    //       console.log(res)
    //       if (res['success'] == true) {
    //         console.log(this.data)
    //         this.companyService.exportAsExcelFile(this.data, 'sample');
    //       }
    //     })
    // }
    getIndustries() {
        this.companyService.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.industry = this.common.data;
        });
    }
    SwitchButton(value) {
        if (value == 1) {
            this.division = 1;
        }
        else if (value == 2) {
            this.division = 2;
        }
    }
    Search(value, name) {
        if (this.value != value) {
            this.currentPage = 0;
        }
        this.value = value;
        this.name = name;
        if (value.length == 0) {
            if (name == 'client') {
                this.clientname = '';
            }
            else if (name == 'company') {
                this.companyname = '';
            }
            else if (name == 'fname') {
                this.first_name1 = '';
            }
            else if (name == 'email') {
                this.email = '';
            }
            else if (name == 'vertical') {
                this.vertical1 = '';
            }
            else if (name == 'portal') {
                this.portal = '';
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
            else if (name == 'start') {
                this.sdate = '';
            }
            else if (name == 'end') {
                this.edate = '';
            }
        }
        else {
            if (name == 'client') {
                this.clientname = value;
            }
            else if (name == 'company') {
                this.companyname = value;
            }
            else if (name == 'fname') {
                this.first_name1 = value;
            }
            else if (name == 'email') {
                this.email = value;
            }
            else if (name == 'vertical') {
                this.vertical1 = value;
            }
            else if (name == 'portal') {
                this.portal = value;
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
            else if (name == 'start') {
                this.sdate = value;
            }
            else if (name == 'end') {
                this.edate = value;
            }
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.companyService.Post(this.getClients, { company_id: this.id, company_name: this.companyname, client_name: this.clientname, first_name: this.first_name, email: this.email, client_vertical: this.vertical1, portal_name: this.portal, city: this.city, start_date: this.sdate, end_date: this.edate, status: this.status, country: this.country1, state: this.state, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' })
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
    ClientVertical() {
        this.companyService.Post(this.getClientVertical, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.vertical = this.common.data;
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], CompanyDetailComponent.prototype, "paginator", void 0);
CompanyDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-company-detail',
        templateUrl: './company-detail.component.html',
        styleUrls: ['./company-detail.component.scss'],
        providers: [DatePipe]
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        DatePipe,
        ActivatedRoute,
        HttpClient,
        MatDialog,
        PagerService,
        CompanyDetailService])
], CompanyDetailComponent);
export { CompanyDetailComponent };
//# sourceMappingURL=company-detail.component.js.map