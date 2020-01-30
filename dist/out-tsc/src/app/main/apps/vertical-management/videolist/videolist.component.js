import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { EditvideoComponent } from './editvideo/editvideo.component';
import { WatchvideoComponent } from './watchvideo/watchvideo.component';
import { VideolistService } from './videolist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmboxComponent, ConfirmDialogModel } from './confirmbox/confirmbox.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
let VideolistComponent = class VideolistComponent {
    constructor(_snackBar, location, _Activatedroute, http, dialog, router, pagerService, video_service) {
        this._snackBar = _snackBar;
        this.location = location;
        this._Activatedroute = _Activatedroute;
        this.http = http;
        this.dialog = dialog;
        this.router = router;
        this.pagerService = pagerService;
        this.video_service = video_service;
        this.displayedColumns = ['s_no', 'title', 'sort_desc', 'status', 'action', 'user_type', 'created'];
        this.getVideoListbyTopic = myGlobals.getVideoListbyTopic;
        this.statusChangeVideo = myGlobals.statusChangeVideo;
        this.pageNumber = 0;
        this.size = 10;
        this.dataSource = new MatTableDataSource(this.data);
        this.pager = {};
        this.pageSize = 10;
        this.currentPage = 0;
        this.totalSize = 0;
        this.startIndex = 1;
        this.endIndex = 10;
        this.value = '';
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        /**
         * button toggle
         */
        this.show = true;
        this.buttonName = 'keyboard_arrow_down';
        if (localStorage.getItem('addvideo_status') == 'true') {
            this.openaddSnackBar();
            localStorage.removeItem('addvideo_status');
        }
        else if (localStorage.getItem('addvideo_status') == 'false') {
            this.openadderrorSnackBar();
            localStorage.removeItem('addvideo_status');
        }
        else if (localStorage.getItem('editvideo_status') == 'true') {
            this.openeditSnackBar();
            localStorage.removeItem('editvideo_status');
        }
        else if (localStorage.getItem('editvideo_status') == 'false') {
            this.openediterrorSnackBar();
            localStorage.removeItem('editvideo_status');
        }
        else if (localStorage.getItem('deletevideo_status') == 'true') {
            this.opendeleteSnackBar();
            localStorage.removeItem('deletevideo_status');
        }
        else if (localStorage.getItem('deletevideo_status') == 'false') {
            this.opendeleteerrorSnackBar();
            localStorage.removeItem('deletevideo_status');
        }
    }
    ngOnInit() {
        this.name = localStorage.getItem('name');
        this.names = localStorage.getItem('names');
        this.topic_id = this._Activatedroute.snapshot.paramMap.get("id");
        console.log(this.topic_id);
        this.getVideoList(this.topic_id);
    }
    // verticalManageId(){
    //   this.router.navigate(["/apps/vertical-management/management/",this.topic_id])
    // }
    back() {
        this.location.back();
    }
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "keyboard_arrow_up";
        else
            this.buttonName = "keyboard_arrow_down";
    }
    getVideoList(id) {
        this.video_service.Post(this.getVideoListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.data = this.common.data;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.allItems = this.common.total_data;
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
        this.video_service.Post(this.getVideoListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.data = this.common.data;
            //this.showloader=false;
            this.dataSource = this.data;
        });
    }
    /*  setPage(page: number,id) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.allItems, page,this.size);
            // get current page of items
          
            this.start=this.pager.startIndex + 1;
            this.end=this.pager.endIndex + 1;
    
                      this.pageNumber=this.pager.startIndex;
    
       this.video_service.Post(this.getVideoListbyTopic,{topic_id:id,offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
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
        this.getVideoList(this.topic_id);
    }
    addVideo() {
        let dialog = this.dialog.open(AddvideoComponent, {
            data: this.topic_id,
            width: '650px', height: '500px'
        });
    }
    openDialog(value) {
        let dialog = this.dialog.open(EditvideoComponent, {
            data: value,
            width: '650px', height: '500px'
        });
    }
    watch(value) {
        let dialog = this.dialog.open(WatchvideoComponent, {
            data: value,
            width: '650px', height: '500px'
        });
    }
    confirmDialog(value) {
        const message = `Are you sure you want to delete this user detail?`;
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
    openaddSnackBar() {
        this._snackBar.open('Video detail added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openadderrorSnackBar() {
        this._snackBar.open('Video detail not added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openeditSnackBar() {
        this._snackBar.open('Video detail updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openediterrorSnackBar() {
        this._snackBar.open('Video detail not updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opendeleteSnackBar() {
        this._snackBar.open('Video detail delete successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opendeleteerrorSnackBar() {
        this._snackBar.open('Video detail not delete successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    Search(value) {
        this.value = value;
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        this.pageNumber = start;
        this.video_service.Post(this.getVideoListbyTopic, { topic_id: this.topic_id, title: value, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
            this.common = res;
            this.allItems = this.common.total_data;
            this.rows = this.common.data;
            this.data = this.rows.slice(0, this.size);
            console.log(this.data);
            this.dataSource = this.data;
            this.allItems = this.common.total_data;
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
        console.log(status);
        this.video_service.Post(this.statusChangeVideo, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
            console.log(res);
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true }),
    tslib_1.__metadata("design:type", MatPaginator)
], VideolistComponent.prototype, "paginator", void 0);
VideolistComponent = tslib_1.__decorate([
    Component({
        selector: 'app-videolist',
        templateUrl: './videolist.component.html',
        styleUrls: ['./videolist.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar,
        Location, ActivatedRoute,
        HttpClient, MatDialog, Router,
        PagerService, VideolistService])
], VideolistComponent);
export { VideolistComponent };
//# sourceMappingURL=videolist.component.js.map