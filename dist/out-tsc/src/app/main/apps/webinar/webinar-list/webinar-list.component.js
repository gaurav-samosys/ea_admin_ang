import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { WebinarListService } from './webinar-list.service';
import * as myGlobals from '../../../../global';
let WebinarListComponent = class WebinarListComponent {
    constructor(webinar_service) {
        this.webinar_service = webinar_service;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.value = '';
        this.get_webinars = myGlobals.get_webinars;
        // delete_webinar=myGlobals.delete_webinar
        this.pageNumber = 0;
        this.size = 10;
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        this.displayedColumns = ['webinar_name', 'image', 'day', 'date', 'start_time', 'end_time', 'action'];
        this.dataSource = new MatTableDataSource(this.data);
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.sort_order = "DESC";
    }
    ngOnInit() {
        this.getWebinarList();
    }
    /**
     * Button Toggle
     */
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    getWebinarList() {
        this.webinar_service.Post(this.get_webinars, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            console.log("get_webinars list=============", this.response);
            this.data = this.response.data;
            console.log(this.data);
            this.webinar_img = this.data['webinar_img'];
            console.log(this.webinar_img);
            this.dataSource = this.data;
            this.allItems = this.response.total_data;
            this.dataSource = new MatTableDataSource(this.data);
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
            if (this.value != this.value) {
                this.currentPage = 0;
            }
            // console.log(this.value, this.name)
            // this.Search(this.value, this.name)
        }
        else {
            this.iterator();
        }
    }
    /**
      * Iterate
      */
    iterator() {
        let part;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        // this.pageNumber = start
        //  this.showloader=true;
        // this.webinar_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        // this.response = res
        //this.showloader=false;
        this.data = this.response.data;
        this.dataSource = this.data;
        // })
    }
    /**
      * sorting
      */
    updateSortingOrderWebinar(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        // this.webinar_service.Post(this.getClients, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        //   this.response = res
        //   this.dataSource=this.response.data
        // });
    }
    /**
      * column toggle show hide
      * @param colName
      * @param evt
      */
    columnClick(value, colName, evt) {
        console.log('-0-----', evt.target.checked);
        const colIndex = this.displayedColumns.findIndex(col => col === colName);
        if (evt.target.checked == false) {
            this.displayedColumns.splice(colIndex, 1);
        }
        else {
            // this.displayedColumns.push(colName);
            this.displayedColumns.splice(value, 0, colName);
        }
        // if (colIndex > 0) {
        //   // column is currently shown in the table, so we remove it
        //   this.displayedColumns.splice(colIndex, 1);
        // } else {
        //   // column is not in the table, so we add it
        //   this.displayedColumns.push(colName);
        // }
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], WebinarListComponent.prototype, "paginator", void 0);
WebinarListComponent = tslib_1.__decorate([
    Component({
        selector: 'app-webinar-list',
        templateUrl: './webinar-list.component.html',
        styleUrls: ['./webinar-list.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [WebinarListService])
], WebinarListComponent);
export { WebinarListComponent };
//# sourceMappingURL=webinar-list.component.js.map