import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AddquizComponent } from './addquiz/addquiz.component';
import { EditquizComponent } from './editquiz/editquiz.component';
/*import { WatchvideoComponent } from './watchvideo/watchvideo.component';*/
import { QuizzeslistService } from './quizzeslist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmboxComponent, ConfirmDialogModel } from './confirmbox/confirmbox.component';
import { Location } from '@angular/common';
let QuizzeslistComponent = class QuizzeslistComponent {
    constructor(location, rt, _snackBar, _Activatedroute, http, dialog, pagerService, quize_service) {
        this.location = location;
        this.rt = rt;
        this._snackBar = _snackBar;
        this._Activatedroute = _Activatedroute;
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.quize_service = quize_service;
        this.displayedColumns = ['quiz_name', 'quiz_description', 'totalQuestions', 'passing_score', 'status', 'action', 'created'];
        this.getQuizzesListbyTopic = myGlobals.getQuizzesListbyTopic;
        this.quizActive = myGlobals.quizActive;
        this.pageNumber = 0;
        this.size = 10;
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.value = '';
        this.dataSource = new MatTableDataSource(this.data);
        this.pager = {};
        this.sort_order = "DESC";
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        /**
           * button toggle
           */
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        if (localStorage.getItem('addquiz_status') == 'true') {
            this.openaddSnackBar();
            localStorage.removeItem('addquiz_status');
        }
        else if (localStorage.getItem('addquiz_status') == 'false') {
            this.openadderrorSnackBar();
            localStorage.removeItem('addquiz_status');
        }
        else if (localStorage.getItem('editquiz_status') == 'true') {
            this.openeditSnackBar();
            localStorage.removeItem('editquiz_status');
        }
        else if (localStorage.getItem('editquiz_status') == 'false') {
            this.openediterrorSnackBar();
            localStorage.removeItem('editquiz_status');
        }
        else if (localStorage.getItem('deletequiz_status') == 'true') {
            this.opendeleteSnackBar();
            localStorage.removeItem('deletequiz_status');
        }
        else if (localStorage.getItem('deletequiz_status') == 'false') {
            this.opendeleteerrorSnackBar();
            localStorage.removeItem('deletequiz_status');
        }
    }
    ngOnInit() {
        this.name = localStorage.getItem('name');
        this.vertical_id = localStorage.getItem('vertical_id');
        // this.vertical_id = this._Activatedroute.snapshot.paramMap.get("id");
        console.log(this.vertical_id);
        this.names = localStorage.getItem('names');
        this.topic_id = this._Activatedroute.snapshot.paramMap.get("id");
        console.log(this.topic_id);
        this.getQuizeList(this.topic_id);
    }
    back() {
        this.location.back();
    }
    /**
   *
   * @param colName Show hide column
   * @param evt
   */
    columnClick(value, colName, evt) {
        console.log('-0-----', evt.target.checked);
        var colIndex = this.displayedColumns.findIndex(col => col === colName);
        if (evt.target.checked == false) {
            this.displayedColumns.splice(colIndex, 1);
        }
        else {
            this.displayedColumns.splice(value, 0, colName);
        }
    }
    /**
        * =========================================
        *        Update sorting
        * =========================================
        */
    updateSortingOrderQuiz(sort_column, sort_order) {
        this.sort_column = sort_column;
        this.ASC = sort_order;
        this.quize_service.Post(this.getQuizzesListbyTopic, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.response = res;
            this.dataSource = this.response['data'];
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
     *
     * @param id get Quizzes list
     */
    getQuizeList(id) {
        this.quize_service.Post(this.getQuizzesListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.data = this.common.data;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            //this.setPage(1,id);
        });
    }
    handlePage(e) {
        console.log(e);
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.startIndex = (this.currentPage * e.pageSize) + 1;
        this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
        if (this.value != '') {
            this.Search(this.value);
        }
        else {
            this.iterator(this.topic_id);
        }
    }
    iterator(id) {
        let part;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        /* this.showloader=true;*/
        this.quize_service.Post(this.getQuizzesListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.data = this.common.data;
            //this.showloader=false;
            this.dataSource = this.data;
        });
    }
    /*
      setPage(page: number,id) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.allItems, page,this.size);
            // get current page of items
          
            this.start=this.pager.startIndex + 1;
            this.end=this.pager.endIndex + 1;
    
                      this.pageNumber=this.pager.startIndex;
                     
    
       this.quize_service.Post(this.getQuizzesListbyTopic,{topic_id:id,offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
                .subscribe(res => {
                    this.common=res
                   this.rows=this.common.data
                   this.data=this.rows.slice(0, this.size);
                   console.log(this.data)
                 this.dataSource.data=this.data;
                 this.allItems = this.common.total_data;
    
    
                });
           
        }*/
    changelimit(value) {
        this.size = parseInt(value);
        this.getQuizeList(this.topic_id);
    }
    /**
     * add Quiz
     */
    addQuiz() {
        let dialog = this.dialog.open(AddquizComponent, {
            data: this.topic_id,
            width: '650px', height: '500px'
        });
    }
    openDialog(value) {
        let dialog = this.dialog.open(EditquizComponent, {
            data: value,
            width: '650px', height: '500px'
        });
    }
    /**
     *
     * @param value View Action
     */
    View(value) {
        var vertical_id = this.vertical_id;
        localStorage.setItem('vertical_id', vertical_id);
        localStorage.setItem('title', value.quiz_name);
        localStorage.setItem('data', JSON.stringify(value));
        this.rt.navigate(['/apps/vertical-management/showquiz', value.id, this.topic_id]);
        // this.rt.navigate(['/apps/vertical-management/showquiz', value.id, this.topic_id,vertical_id,])
    }
    /**
      * Confirm Dialog For Delete
      */
    confirmDialog(value) {
        const message = `Are you sure you want to delete this quiz?`;
        let data = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, data);
        const dialogRef = this.dialog.open(ConfirmboxComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
        });
    }
    /**
    * Open Snack Bar
    */
    openaddSnackBar() {
        this._snackBar.open('Quiz added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openadderrorSnackBar() {
        this._snackBar.open('Quiz not added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openeditSnackBar() {
        this._snackBar.open('Quiz updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openediterrorSnackBar() {
        this._snackBar.open('Quiz not updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opendeleteSnackBar() {
        this._snackBar.open('Quiz delete successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opendeleteerrorSnackBar() {
        this._snackBar.open('Quiz not delete successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    /**
      * Search value in input field
      */
    Search(value) {
        this.value = value;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.quize_service.Post(this.getQuizzesListbyTopic, {
            topic_id: this.topic_id,
            quiz_name: value,
            offset: this.pageNumber,
            limit: this.pageSize,
            token: 'LIVESITE'
        }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.rows = this.common.data;
            this.data = this.rows.slice(0, this.size);
            this.dataSource = this.data;
        });
    }
    /**
     * Status change Event
     * @param value
     * @param id
     */
    onChange(value, id) {
        console.log(value, id);
        let status;
        if (value == false) {
            status = 0;
        }
        else {
            status = 1;
        }
        this.quize_service.Post(this.quizActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
            console.log(res);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], QuizzeslistComponent.prototype, "paginator", void 0);
QuizzeslistComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quizzeslist',
        templateUrl: './quizzeslist.component.html',
        styleUrls: ['./quizzeslist.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Location, Router,
        MatSnackBar,
        ActivatedRoute,
        HttpClient, MatDialog,
        PagerService,
        QuizzeslistService])
], QuizzeslistComponent);
export { QuizzeslistComponent };
//# sourceMappingURL=quizzeslist.component.js.map