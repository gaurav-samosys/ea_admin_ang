import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AccessService } from 'app/main/apps/Access-code/access-code/access.service';
import { ExcelService } from 'app/main/apps/Access-code/access-code/excel.service';
import * as myGlobals from '../../../../global';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
let AccessCodeComponent = class AccessCodeComponent {
    constructor(_formBuilder, pagerService, service, excelService, http) {
        this._formBuilder = _formBuilder;
        this.pagerService = pagerService;
        this.service = service;
        this.excelService = excelService;
        this.http = http;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.value = '';
        this.pager = {};
        this.getClients = myGlobals.getClients;
        this.getCompanies = myGlobals.getCompanies;
        this.getAccessCode = myGlobals.getAccessCode;
        this.generateAccessCodes = myGlobals.generateAccessCodes;
        this.downloadAccessCodes = myGlobals.downloadAccessCodes;
        this.downloadAccessCodesFile = myGlobals.downloadAccessCodesFile;
        this.companiesData = [];
        this.clientData = [];
        this.size = 10;
        this.dataArray = [];
        this.clientDataArray = [];
        this.pageNumber = 0;
        this.displayedColumns = ['company_name', 'client_name', 'created_date', 'totalAccessCodes', 'status', 'view'];
        this.dataSource = new MatTableDataSource(this.access_data);
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
        // exportAsXLSX(data) {
        //   console.log(data[0].company_name)
        //   this.excelService.exportAsExcelFile(data, '' + data[0].company_name + '');
        // }
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
    }
    ngOnInit() {
        var number = document.getElementById('number');
        // console.log(number)
        number.onkeydown = function (e) {
            if (!((e.keyCode > 95 && e.keyCode < 106)
                || (e.keyCode > 47 && e.keyCode < 58)
                || e.keyCode == 8)) {
                return false;
            }
        };
        this.form = this._formBuilder.group({
            company: ['', Validators.required],
            client: ['', Validators.required],
            limit: ['', Validators.required],
        });
        this.getCompany();
        this.getAccessCodedata();
    }
    onKey(value) {
        this.dataArray = [];
        this.selectSearch(value);
    }
    selectSearch(value) {
        let filter = value.toLowerCase();
        for (let i = 0; i < this.companiesData.length; i++) {
            let option = this.companiesData[i];
            console.log("option ===============", option);
            if (option.company_name.toLowerCase().indexOf(filter) > -1) {
                this.dataArray.push(option);
                // console.log("dataArray search ===============", option)
            }
        }
    }
    getCompany() {
        this.service.Post(this.getCompanies, { token: 'LIVESITE' }).subscribe(res => {
            // this.common = res
            this.companiesData = res['data'];
            // console.log(this.companiesData)
            for (let i = 0; i < this.companiesData.length; i++) {
                this.dataArray.push(this.companiesData[i]);
                this.ngOnInit();
            }
        });
    }
    onClientKey(value) {
        this.clientDataArray = [];
        this.selectClientSearch(value);
    }
    selectClientSearch(value) {
        let filter = value.toLowerCase();
        for (let i = 0; i < this.clientData.length; i++) {
            let option = this.clientData[i];
            // console.log("option ===============", option)
            if (option.company_name.toLowerCase().indexOf(filter) > -1) {
                this.clientDataArray.push(option);
                // console.log("dataArray search ===============", option)
            }
        }
    }
    getClient(value) {
        this.service.Post(this.getClients, { company_id: value, token: 'LIVESITE' }).subscribe(res => {
            // this.common = res;
            this.clientData = res['data'];
            // console.log(this.clientData)
            for (let i = 0; i < this.clientData.length; i++) {
                this.clientDataArray.push(this.clientData[i]);
                this.ngOnInit();
            }
        });
    }
    //Access Form
    accessForm() {
        if (this.form.invalid) {
            return false;
        }
        let item = {};
        this.service.Post(this.generateAccessCodes, {
            user_id: this.form.value.client,
            company_id: this.form.value.company,
            limit: this.form.value.limit,
            token: 'LIVESITE'
        })
            .subscribe(res => {
            this.common = res;
            this.generate_data = this.common.randomcode;
            this.downloadAccessData(this.form.value.client, this.generate_data);
        });
    }
    getAccessCodedata() {
        this.service.Post(this.getAccessCode, { token: 'LIVESITE', offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
            this.common = res;
            // console.log(this.common)
            this.access_data = this.common.data;
            // console.log(this.access_dat                                                                                                                                                                                                                                                                              a)
            this.allItems = this.common.total_data;
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
        this.service.Post(this.getAccessCode, { token: 'LIVESITE', offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
            this.common = res;
            //this.showloader=false;
            this.allItems = this.common.total_data;
            this.access_data = this.common.data;
            this.dataSource = this.access_data;
        });
    } /*
      setPage(page: number) {
          // get pager object from service
            this.pager = this.pagerService.getPager(this.allItems, page,this.size);
             this.start=this.pager.startIndex + 1;
          this.end=this.pager.endIndex + 1;
          // get current page of items
  
                    this.pageNumber=this.pager.startIndex;
          // get current page of items
  
                this.service.Post(this.getAccessCode, {token: 'LIVESITE',offset:this.pageNumber,limit : this.size }).subscribe(res => {
              this.common = res;
              //console.log(this.access_data)
               this.rows=this.common.data
              this.access_data = this.rows.slice(0, this.size);
              console.log(this.access_data,this.access_data.length)
              this.dataSource.data=this.access_data;
          });
      }*/
    changelimit(value) {
        this.size = parseInt(value);
        this.getAccessCodedata();
    }
    downloadAccessData(client_id, random_code) {
        // fields: 'companies.company_name,users.client_name,client_access_codes.code' 
        this.service.Post(this.downloadAccessCodes, { client_id: client_id, random_code: random_code, token: 'LIVESITE',
        }).subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.xldata = this.common.data;
            if (res['success'] == true) {
                // console.log(this.data)
                this.excelService.exportAsExcelFile(this.xldata, 'sample');
            }
            // this.xldata = this.common.data;
            // this.exportAsXLSX(this.xldata)
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
    Search(value, name) {
        if (this.value != value) {
            this.currentPage = 0;
        }
        this.value = value;
        this.name = name;
        if (value.length == 0) {
            if (name == 'cname') {
                this.companyname = '';
            }
            else if (name == 'clientname') {
                this.clientname = '';
            }
            else if (name == 'code') {
                this.code = '';
            }
        }
        if (name == 'cname') {
            this.companyname = value;
        }
        else if (name == 'clientname') {
            this.clientname = value;
        }
        else if (name == 'code') {
            this.code = value;
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        // this.service.Post(this.getAccessCode, { token: 'LIVESITE', company_name: this.companyname, client_name: this.clientname, access_code: this.code, offset: this.pageNumber, limit: this.size }).subscribe(res => {
        //   this.common = res
        this.allItems = this.common.total_data;
        ;
        this.rows = this.common.data;
        this.access_data = this.rows.slice(0, this.size);
        this.dataSource = this.access_data;
        // });
    }
    Reset() {
        /* this.form.controls['company'].setValue('', {onlySelf: true});
         this.form.controls['client'].setValue('', {onlySelf: true});
         this.form.controls['limit'].setValue('', {onlySelf: true});*/
        this.form.reset();
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], AccessCodeComponent.prototype, "paginator", void 0);
AccessCodeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-access-code',
        templateUrl: './access-code.component.html',
        styleUrls: ['./access-code.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, PagerService, AccessService, ExcelService, HttpClient])
], AccessCodeComponent);
export { AccessCodeComponent };
//# sourceMappingURL=access-code.component.js.map