import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
let BlogComponent = class BlogComponent {
    constructor(router, toastr, _snackBar, http, fb, dialog, pagerService, blog_service) {
        this.router = router;
        this.toastr = toastr;
        this._snackBar = _snackBar;
        this.http = http;
        this.fb = fb;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.blog_service = blog_service;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.minDate = new Date(2000, 0, 1);
        this.maxDate = new Date(2020, 0, 1);
        this.size = 10;
        this.index = 0;
        this.displayedColumns = ['post_title', 'author', 'category', 'created_date', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.getBlogWithDataApi = myGlobals.getBlogWithDataApi;
        this.deleteBlogApi = myGlobals.deleteBlogApi;
        // @ViewChild(MatSort, { static: true }) sort: MatSort;
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        this.value = '';
        this.hide_column = 0;
        this.sort_order = "DESC";
        this.blogForm = this.fb.group({
            post_title: '',
            category: '',
            start_date: '',
            end_date: ''
        });
    }
    ngOnInit() {
        this.myDate = new Date();
        console.log(this.myDate);
        this.dataSource.paginator = this.paginator;
        this.getBlogList();
    }
    // showHideColumn:boolean;
    //   columnClick1(evt){
    //     console.log(evt)
    //     if (evt.target.checked == false) {
    //       this.showHideColumn=false
    //     }else{
    //       this.showHideColumn= true
    //     }
    //   }
    /**
     *
     * @param colName Show hide column
     * @param evt
     */
    columnClick(value, colName, evt, index) {
        console.log('dev------', event);
        console.log('------colName', colName, evt, evt.target.checked, "index===", index);
        var colIndex = this.displayedColumns.findIndex(col => col === colName);
        console.log(colIndex);
        if (evt.target.checked == false) {
            this.displayedColumns.splice(colIndex, 1);
        }
        else {
            this.displayedColumns.splice(value, 0, colName);
        }
    }
    // if (evt.target.checked == false) {
    // this.displayedColumns.splice(colIndex, 1);
    // } else {
    // this.displayedColumns.push(colName);
    // }
    // if (colIndex > 0) {
    //   // column is currently shown in the table, so we remove it
    //   this.displayedColumns.splice(colIndex, 1);
    // } else {
    //   // column is not in the table, so we add it
    //   this.displayedColumns.push(colName);
    // }
    //false 1 true -1
    // if(index == 'index0'){
    //       this.index =1
    // }else if(index == 'index1'){
    //   this.index =1
    // }else if(index == 'index2'){
    // }else if(index == 'index3'){
    // }else if(index == 'index4'){
    // }
    /**
     * get blog list
     */
    getBlogList() {
        this.blog_service.Post(this.getBlogWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            // console.log(res)
            this.data = this.response['data'];
            // console.log(this.data)
            this.dataSource = this.data;
            this.dataSource = new MatTableDataSource(this.data);
            this.allItems = this.response['recordsTotal'];
            // console.log(this.allItems)
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
            if (this.value != this.value) {
                this.currentPage = 0;
            }
            // console.log(this.value, this.name)
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
        this.blog_service.Post(this.getBlogWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            //this.showloader=false;
            this.data = this.response['data'];
            this.dataSource = this.data;
        });
    }
    // routerLink="/apps/blog-post/:id"
    navigateAddPost() {
        this.router.navigate(['/apps/blog-post', 'add-post']);
        // this.router.navigate(['/apps/blog-post'], { queryParams: { order: 'popular' } });
    }
    /**
     *
     * @param element edit blog and navigate
     */
    EditPost(element) {
        // console.log(element)
        this.router.navigate(['/apps/blog-post', element.id]);
    }
    /**
     * show hide button toggle
     */
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    /**
      * =========================================
      *        Update sorting
      * =========================================
      */
    updateSortingOrderBlog(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        this.blog_service.Post(this.getBlogWithDataApi, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            this.dataSource = this.response['data'];
        });
    }
    /**
     * search fields
     * @param value
     * @param name
     */
    Search(value, name) {
        //  console.log(value,name)
        if (this.value != value) {
            this.currentPage = 0;
        }
        this.value = value;
        this.name = name;
        if (value.length == 0) {
            if (name == 'title') {
                this.titleName = '';
            }
            else if (name == 'categary') {
                this.categaryName = '';
            }
            else if (name == 'start_date') {
                this.startDate = '';
            }
            else if (name == 'end_date') {
                this.endDate = '';
            }
        }
        else {
            if (name == 'title') {
                this.titleName = value;
            }
            else if (name == 'categary') {
                this.categaryName = value;
            }
            else if (name == 'start_date') {
                this.startDate = value;
            }
            else if (name == 'end_date') {
                this.endDate = value;
            }
        }
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.blog_service.Post(this.getBlogWithDataApi, {
            post_title: this.titleName, category: this.categaryName,
            start_date: this.startDate, end_date: this.endDate,
            offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
        })
            .subscribe(res => {
            // console.log(res)
            this.response = res;
            this.allItems = this.response['recordsTotal'];
            this.rows = this.response['data'];
            this.data = this.rows.slice(0, this.size);
            this.dataSource = this.data;
        });
    }
    MyDate(newDate, name) {
        // let date;
        // if (name == 'start') {
        //   this.startDate = newDate;
        //   date = this.startDate
        // }
        // else if (name == 'end') {
        //   this.endDate = newDate;
        //   date = this.endDate
        // }
        // if (date != null) {
        //   this.Search(this.datePipe.transform(date, "yyyy-MM-dd"), name);
        // }
        // else {
        //   this.Search(date = '', name)
        // }
    }
    /**
     *
     * @param id confirm dialog box and open delete dialog
     */
    confirmDialogDelete(id) {
        this.blog_service.Post(this.deleteBlogApi, { id: id, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            console.log(this.response);
            if (this.response['success'] == true && this.response['status_code'] == 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Record delete successfully',
                    icon: 'success'
                });
            }
            else {
                Swal.fire({
                    title: 'Warning',
                    text: 'There Are some issue',
                    icon: 'warning',
                });
            }
            this.getBlogList();
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], BlogComponent.prototype, "paginator", void 0);
BlogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-blog',
        templateUrl: './blog.component.html',
        styleUrls: ['./blog.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ToastrService,
        MatSnackBar, HttpClient, FormBuilder,
        MatDialog, PagerService, BlogService])
], BlogComponent);
export { BlogComponent };
//# sourceMappingURL=blog.component.js.map