import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { ViewdetailService } from 'app/main/apps/Access-code/viewdetails/viewdetail.service';
import * as myGlobals from '../../../../global';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
let ViewdetailsComponent = class ViewdetailsComponent {
    constructor(rt, _Activatedroute, _formBuilder, pagerService, service, http) {
        this.rt = rt;
        this._Activatedroute = _Activatedroute;
        this._formBuilder = _formBuilder;
        this.pagerService = pagerService;
        this.service = service;
        this.http = http;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.value = '';
        this.pager = {};
        this.subAccessCodeListShow = myGlobals.subAccessCodeListShow;
        this.access_status = myGlobals.accessCodeStatus;
        this.size = 10;
        this.pageNumber = 0;
        this.displayedColumns = ['company_name', 'client_name', 'code', 'status', 'created_date', 'used', 'action'];
        this.dataSource = new MatTableDataSource(this.access_data);
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.form = this._formBuilder.group({
            company: ['', Validators.required],
            client: ['', Validators.required],
            limit: ['', Validators.required],
        });
        this.id = this._Activatedroute.snapshot.paramMap.get("id");
        this.code = this._Activatedroute.snapshot.paramMap.get("id1");
        console.log(this.id, this.code);
        this.getsubAccessCodeList(this.id, this.code);
    }
    accessForm() {
        if (this.form.invalid) {
            return false;
        }
    }
    getsubAccessCodeList(client_id, code) {
        console.log('------------->', client_id, code);
        this.service.Post(this.subAccessCodeListShow, { token: 'LIVESITE', client_id: client_id, code: code, fields: '', offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.allItems = this.common.total_data;
            this.access_data = this.common.data;
            this.dataSource = new MatTableDataSource(this.access_data);
            this.dataSource.paginator = this.paginator;
            //this.setPage(1);
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
        /* this.showloader=true;*/
        let client_id = this._Activatedroute.snapshot.paramMap.get("id");
        let code = this._Activatedroute.snapshot.paramMap.get("id1");
        this.service.Post(this.subAccessCodeListShow, { token: 'LIVESITE', client_id: client_id, code: code, fields: '', offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
            this.common = res;
            //this.showloader=false;
            this.allItems = this.common.total_data;
            this.access_data = this.common.data;
            this.dataSource = this.access_data;
        });
    }
    /*    setPage(page: number) {
            // get pager object from service
              this.pager = this.pagerService.getPager(this.allItems, page,this.size);
               this.start=this.pager.startIndex + 1;
            this.end=this.pager.endIndex + 1;
            // get current page of items
    
            let client_id =this._Activatedroute.snapshot.paramMap.get("id");
            let code =this._Activatedroute.snapshot.paramMap.get("id1");
    
                      this.pageNumber=this.pager.startIndex;
    
                 this.service.Post(this.subAccessCodeListShow,{token: 'LIVESITE',client_id:client_id,code:code,fields:'',offset:this.pageNumber,limit : this.size}).subscribe(res=>{
               this.common=res;
                 this.rows=this.common.data
                this.access_data = this.rows.slice(0, this.size)
                console.log(this.access_data)
                this.dataSource.data=this.access_data;
           })
        }*/
    changelimit(value) {
        this.size = parseInt(value);
        this.getsubAccessCodeList(this.id, this.code);
    }
    onChange(value, id) {
        let status;
        if (value == false) {
            status = 0;
        }
        else {
            status = 1;
        }
        console.log(status, id);
        this.service.Post(this.access_status, { token: 'LIVESITE', code_id: id, status: status }).subscribe(res => {
            console.log(res);
            this.getsubAccessCodeList(this.id, this.code);
            /*    this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                        this.rt.navigate(["/apps/Access-code/viewdetails/"+this.id+"/"+this.code+" "]));*/
        });
    }
    Search(value, name) {
        this.value = value;
        this.name = name;
        if (value.length == 0) {
            if (name == 'code') {
                this.codes = '';
            }
            else if (name == 'used') {
                this.used = '';
            }
        }
        else {
            if (name == 'code') {
                this.codes = value;
            }
            else if (name == 'used') {
                this.used = value;
            }
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.service.Post(this.subAccessCodeListShow, { token: 'LIVESITE', code: this.codes, used_by: this.used, offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
            console.log(res);
            this.common = res;
            this.allItems = this.common.total_data;
            this.rows = this.common.data;
            this.access_data = this.rows.slice(0, this.size);
            this.dataSource = this.access_data;
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], ViewdetailsComponent.prototype, "paginator", void 0);
ViewdetailsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-viewdetails',
        templateUrl: './viewdetails.component.html',
        styleUrls: ['./viewdetails.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, FormBuilder, PagerService, ViewdetailService, HttpClient])
], ViewdetailsComponent);
export { ViewdetailsComponent };
//# sourceMappingURL=viewdetails.component.js.map