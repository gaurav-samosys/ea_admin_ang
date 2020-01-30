import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { CompaniesPopupComponent } from './companies-popup/companies-popup.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { PagerService } from '../pager.service';
import { CompaniesService } from './companies.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
let CompaniesComponent = class CompaniesComponent {
    // @ViewChild(MatSort, { static: true }) MatSort: MatSort;
    constructor(toastr, datePipe, _snackBar, route, http, dialog, pagerService, companyService) {
        // if (localStorage.getItem('status') == 'true') {
        //   this.openSnackBar();
        //   localStorage.removeItem('status');
        // }
        // else if (localStorage.getItem('companystatus') == 'true') {
        //   this.opencompanySnackBar();
        //   localStorage.removeItem('companystatus');
        // }
        this.toastr = toastr;
        this.datePipe = datePipe;
        this._snackBar = _snackBar;
        this.route = route;
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.companyService = companyService;
        this.pageNumber = 0;
        this.size = 10;
        // pager object
        this.pager = {};
        this.showloader = false;
        this.value = '';
        this.getCompanies = myGlobals.getCompanies;
        this.exportManageCompanies = myGlobals.exportManageCompanies;
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
        // city: "knw"company_name: "samosys tech"countries_name: "Canada"id: 171
        // industries_name: "Consumer Goods / Manufacturing"state_name: "Alberta"status: 
        // "Active"totalClients: 0
        this.displayedColumns = ['company_name', 'countries_name', 'state_name', 'city', 'industries_name', 'totalClients', 'status', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        /**
         * button toggle
         */
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        // else if (localStorage.getItem('companystatus') == 'false') {
        //   this.opencompanyerrorSnackBar();
        //   localStorage.removeItem('companystatus');
        // }
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.fetchCountry();
        this.getIndustries();
        this.getCompany();
    }
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    /**===========================================================
          get Company
    ===========================================================*/
    getCompany() {
        this.showloader = true;
        this.companyService.Post(this.getCompanies, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            console.log('=res=======>', res);
            this.response = res;
            this.showloader = false;
            this.allItems = this.response.total_data;
            this.data = this.response.data;
            // console.log(this.data)
            this.dataSource = this.data;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.MatSort;
            //console.log(this.paginator.getRangeLabel)
            //this.dataSource.data=this.data;
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
            if (this.value != this.value) {
                this.currentPage = 0;
            }
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
        this.showloader = true;
        this.companyService.Post(this.getCompanies, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            this.showloader = false;
            this.data = this.response.data;
            this.dataSource = this.data;
        });
    }
    /**===========================================================
          sorting using Assending and dissending order
    ===========================================================*/
    updateSortingOrderCompany(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        this.companyService.Post(this.getCompanies, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            console.log(this.response.data);
            this.dataSource = this.response.data;
        });
    }
    /**===========================================================
          open Dialog
    ===========================================================*/
    openDialog(value) {
        let dialog = this.dialog.open(CompaniesPopupComponent, {
            data: value,
            width: '650px', height: '400px'
        });
    }
    /**===========================================================
          confirm dialog
    ===========================================================*/
    confirmDialog(value) {
        console.log(value);
        const message = `Are you sure you want to delete this company detail?`;
        let id = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
        const dialogRef = this.dialog.open(ConfirmBoxComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
            console.log(this.result);
            if (this.result) {
                // Swal.fire({
                //   title: 'Success!',
                //   text: ' File successfully deleted!',
                //   icon: 'success',
                //   // showCancelButton: true,
                //   confirmButtonText: 'Ok',
                //   // cancelButtonText: 'No, keep it'
                // })
            }
        });
    }
    /**===========================================================
            edit dialog
      ===========================================================*/
    editDialog(value) {
        const dialogRef = this.dialog.open(CompanyEditComponent, {
            width: '600px', height: '500px',
            data: value
        });
    }
    /**===========================================================
          add company
      ===========================================================*/
    addCompany() {
        let dialog = this.dialog.open(AddCompanyComponent, {
            width: '600px', height: '500px'
        });
    }
    changelimit(value) {
        this.size = parseInt(value);
        this.getCompany();
    }
    /**===========================================================
            fetch country
      ===========================================================*/
    fetchCountry() {
        this.companyService.Post(this.getCountry, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            this.country = this.common.data;
        });
    }
    /**===========================================================
          get state using api call
    ===========================================================*/
    getState(value, name) {
        this.country1 = '';
        this.state1 = '';
        this.Search(value, name);
        this.companyService.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.states = this.common.data;
        });
    }
    /**===========================================================
               get industry using api call
    ===========================================================*/
    getIndustries() {
        this.companyService.Post(this.getIndustry, { token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.industry = this.common.data;
        });
    }
    /**===========================================================
             on selction change status
       ===========================================================*/
    onChange(value, id) {
        console.log(value, id);
        let status;
        if (value == false) {
            status = 0;
            this.toastr.success('Status Inactive Successfully');
        }
        else {
            status = 1;
            this.toastr.success('Status Active Successfully');
        }
        this.companyService.Post(this.companyActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
            console.log(res);
        });
    }
    /**===========================================================
               open snackbar
         ===========================================================*/
    openSnackBar() {
        this._snackBar.open('Company details updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opencompanySnackBar() {
        this._snackBar.open('Company added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opencompanyerrorSnackBar() {
        this._snackBar.open('Company not added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    /**===========================================================
               search in input field
         ===========================================================*/
    Search(value, name) {
        if (this.value != value) {
            this.currentPage = 0;
        }
        this.value = value;
        this.name = name;
        if (value.length == 0) {
            if (name == 'company') {
                this.company = '';
            }
            else if (name == 'fullname') {
                this.fullname = '';
            }
            else if (name == 'email') {
                this.email = '';
            }
            else if (name == 'city') {
                this.city = '';
            }
            else if (name == 'start') {
                this.sdate = '';
            }
            else if (name == 'end') {
                this.edate = '';
            }
            else if (name == 'status') {
                this.status1 = '';
            }
            else if (name == 'industry') {
                this.industry1 = '';
            }
            else if (name == 'country') {
                this.country1 = '';
            }
            else if (name == 'state') {
                this.state1 = '';
            }
        }
        else {
            if (name == 'company') {
                this.company = value;
            }
            else if (name == 'fullname') {
                this.fullname = value;
            }
            else if (name == 'email') {
                this.email = value;
            }
            else if (name == 'city') {
                this.city = value;
            }
            else if (name == 'start') {
                this.sdate = value;
            }
            else if (name == 'end') {
                this.edate = value;
            }
            else if (name == 'status') {
                this.status1 = value;
            }
            else if (name == 'industry') {
                this.industry1 = value;
            }
            else if (name == 'country') {
                this.country1 = value;
            }
            else if (name == 'state') {
                this.state1 = value;
            }
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.companyService.Post(this.getCompanies, { company_name: this.company, full_name: this.fullname, email: this.email, city: this.city, start_date: this.sdate, end_date: this.edate, industry: this.industry1, status: this.status1, country: this.country1, state: this.state1, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' })
            .subscribe(res => {
            this.response = res;
            this.allItems = this.response.total_data;
            this.rows = this.response.data;
            this.data = this.rows.slice(0, this.pageSize);
            this.dataSource = this.data;
        });
    }
    /*getStatefilter(value,ev,name){
     this.Search(value,name)
    }*/
    /*  Filter(value,ev,name){
        this.Search(value,name);
      }*/
    /**===========================================================
               date range input field
         ===========================================================*/
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
    /**===========================================================
            Export data and download
    ===========================================================*/
    exportData() {
        this.companyService.Post(this.exportManageCompanies, {
            company_name: this.company ? this.company : '',
            full_name: this.fullname ? this.fullname : '',
            user_email: this.email ? this.email : '',
            country: this.country1 ? this.country1 : '',
            state: this.state1 ? this.state1 : '',
            city: this.city ? this.city : '',
            industry: this.industry1 ? this.industry1 : '',
            start_date: this.sdate ? this.sdate : '',
            end_date: this.edate ? this.edate : '',
            user_type: '',
            status_check: '',
            excel: '',
            pdf: '',
            search_keyword: '',
            token: 'LIVESITE'
        })
            .subscribe(res => {
            console.log(res);
            if (res['success'] == true) {
                console.log(this.data);
                // this.companyService.exportAsExcelFile(res['data'], 'sample');
                this.companyService.exportAsExcelFile(this.data, 'sample');
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], CompaniesComponent.prototype, "paginator", void 0);
CompaniesComponent = tslib_1.__decorate([
    Component({
        selector: 'companies-dashboard',
        templateUrl: './companies.component.html',
        styleUrls: ['./companies.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations,
        providers: [DatePipe]
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService,
        DatePipe, MatSnackBar, ActivatedRoute, HttpClient, MatDialog, PagerService, CompaniesService])
], CompaniesComponent);
export { CompaniesComponent };
// onChange(status, id) {
//   console.log(status, id);
//   this.companyService.Post(this.companyActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
//     console.log(res)
//     if (res['status'] == true) {
//       this.toastr.success("Status changed successfully");
//       this.ngOnInit();
//     }
//     else {
//       this.toastr.success('Somthing went Wrong');
//     }
//   })
// }
// company_name
// full_name
// user_email
// country      
// state,city,industry,start_date,end_date,user_type,excel,pdf,search_keyword
//   city: "knw"
// company_name: "samosys tech"
// countries_name: "Canada"
// id: 171
// industries_name: "Consumer Goods / Manufacturing"
// state_name: "Alberta"
// status: "Active"
// totalClients: 0
/*     setPage(page: number) {
      this.showloader=true;
      this.pager = this.pagerService.getPager(this.allItems, page,this.size);
         this.start=this.pager.startIndex + 1;
      this.end=this.pager.endIndex + 1;
                this.pageNumber=this.pager.startIndex;
 this.companyService.Post(this.getCompanies,{ offset:this.pageNumber,limit : this.size ,token:'LIVESITE'})
          .subscribe(res => {
            this.showloader=false;
              this.response=res
             this.rows=this.response.data
             this.data=this.rows.slice(0, this.size);
             console.log(this.data)
           this.dataSource.data=this.data
          });
        }
*/
//# sourceMappingURL=companies.component.js.map