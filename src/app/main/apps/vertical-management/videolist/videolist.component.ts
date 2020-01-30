import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { EditvideoComponent } from './editvideo/editvideo.component';
import { WatchvideoComponent } from './watchvideo/watchvideo.component';
import { VideolistService } from './videolist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmboxComponent, ConfirmDialogModel } from './confirmbox/confirmbox.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { Location } from '@angular/common';
@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})
export class VideolistComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'title', 'sort_desc', 'status', 'action', 'user_type', 'created'];
  getVideoListbyTopic = myGlobals.getVideoListbyTopic;
  statusChangeVideo = myGlobals.statusChangeVideo;
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  common: any;
  data: any;
  dataSource = new MatTableDataSource<any>(this.data);
  allItems: any;
  start: any;
  end: any;

  pager: any = {};
  vertical_id: any;
  // paged items
  pagedItems: any[];
  title: any;
  showloader = false
  description: any;
  result: any;
  topic_id: any;
  name: any;
  names: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1;
  endIndex = 10;
  value = '';
  name1: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _snackBar: MatSnackBar,
    private location: Location, private _Activatedroute: ActivatedRoute,
    private http: HttpClient, public dialog: MatDialog, private router: Router,
    private pagerService: PagerService, public video_service: VideolistService) {
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
    this.name = localStorage.getItem('name')
    this.names = localStorage.getItem('names')
    this.topic_id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.topic_id)
    this.getVideoList(this.topic_id)
  }
  // verticalManageId(){
  //   this.router.navigate(["/apps/vertical-management/management/",this.topic_id])
  // }
  back() {
    this.location.back();
  }

  /**
   * button toggle
   */
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  getVideoList(id) {
    this.showloader = true

    this.video_service.Post(this.getVideoListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false

      this.common = res
      this.data = this.common.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.allItems = this.common.total_data;
      //this.setPage(1,id);
    })
  }

  public handlePage(e: any) {
    console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
    if (this.value != '') {
      this.Search(this.value)
    }
    else {
      this.iterator(this.topic_id);

    }
  }

  private iterator(id) {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;
    this.video_service.Post(this.getVideoListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.data = this.common.data
      this.showloader = false;
      this.dataSource = this.data;

    })
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

  confirmDialog(value): void {
    const message = `Are you sure you want to delete this user detail?`;
    let data = value
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
    this.showloader = true

    this.value = value;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.video_service.Post(this.getVideoListbyTopic, { topic_id: this.topic_id, title: value, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false

      this.common = res
      this.allItems = this.common.total_data;

      this.rows = this.common.data
      this.data = this.rows.slice(0, this.size);
      console.log(this.data)
      this.dataSource = this.data
      this.allItems = this.common.total_data;
    })
  }

  onChange(value, id) {
    console.log(value, id)
    let status;
    if (value == false) {
      status = 0;
    }
    else {
      status = 1;
    }
    console.log(status)
    this.video_service.Post(this.statusChangeVideo, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
      console.log(res)
    })
  }

}
