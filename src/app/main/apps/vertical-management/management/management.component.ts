import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { ManagementService } from './management.service';
import { EditrefreshComponent } from './editrefresh/editrefresh.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { ViewimageComponent } from './viewimage/viewimage.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmdialogComponent, ConfirmDialogModel } from './confirmdialog/confirmdialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  displayedColumns: string[] = ['s_no', 'cat_name', 'image', 'totalVideos', 'totalQuizzes', 'totalQuestions', 'course_type', 'status', 'action', 'created'];
  getVerticalDataList = myGlobals.getVerticalDataList;
  topicActive = myGlobals.topicActive;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1;
  endIndex = 10;
  value = '';
  name: any;
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
  description: any;
  result: any;
  name1: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  id: any;
  sort_order:'DESC'
  sort_column
  ASC
  constructor(
    private toastr: ToastrService,
    
    private _snackBar: MatSnackBar,
     private rt: Router,
      private _Activatedroute: ActivatedRoute,
       private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, public manage_service: ManagementService) {
    if (localStorage.getItem('addtopic_status') == 'true') {
      this.openaddSnackBar();
      localStorage.removeItem('addtopic_status');
    }
    else if (localStorage.getItem('addtopic_status') == 'false') {
      this.openadderrorSnackBar();
      localStorage.removeItem('addtopic_status');
    }
    else if (localStorage.getItem('edittopic_status') == 'true') {
      this.openeditSnackBar();
      localStorage.removeItem('edittopic_status');
    }
    else if (localStorage.getItem('edittopic_status') == 'false') {
      this.openediterrorSnackBar();
      localStorage.removeItem('edittopic_status');
    }

    else if (localStorage.getItem('deletetopic_status') == 'true') {
      this.opendeleteSnackBar();
      localStorage.removeItem('deletetopic_status');
    }
    else if (localStorage.getItem('deletetopic_status') == 'false') {
      this.opendeleteerrorSnackBar();
      localStorage.removeItem('deletetopic_status');
    }
  }

  ngOnInit() {
    this.name = localStorage.getItem('name')
    this.vertical_id = this._Activatedroute.snapshot.paramMap.get("id");
  //  console.log(this.vertical_id)
   localStorage.setItem('vertical_id',this.vertical_id)
    this.getVerticalList(this.vertical_id);
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

    /**
   * get vertical list
   */
  getVerticalList(id) {
    this.manage_service.Post(this.getVerticalDataList, { vertical_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.data = this.common.data
      this.dataSource = this.data;

      this.allItems = this.common.total_data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
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
      console.log(this.value, this.name)
      this.Search(this.value, this.name1)
    }
    else {
      this.iterator(this.vertical_id);

    }
  }

  private iterator(id) {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    /* this.showloader=true;*/
    this.manage_service.Post(this.getVerticalDataList, { vertical_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.data = this.common.data
      //this.showloader=false;
      this.dataSource = this.data;

    })
  }
 /**
  * table sort
  * @param sort_column 
  * @param sort_order 
  */
  updateSortingOrderVerical(sort_column,sort_order){
    this.sort_column = sort_column
    this.ASC = sort_order
    this.manage_service.Post(this.getVerticalDataList, {column:this.sort_column,dir:this.ASC, vertical_id:this.id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.dataSource=this.common.data
    });
  }
  /*setPage(page: number,id) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
        // get current page of items
      
        this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;

                  this.pageNumber=this.pager.startIndex;

   this.manage_service.Post(this.getVerticalDataList,{vertical_id:id,offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
            .subscribe(res => {
                this.common=res
               this.rows=this.common.data
               this.data=this.rows.slice(0, this.size);
               console.log(this.data)
             this.dataSource.data=this.data;
             this.allItems = this.common.total_data;


            });
       
    }
*/
  changelimit(value) {
    this.size = parseInt(value);
    this.getVerticalList(this.vertical_id);
  }

  openDialog(value) {
    value.vertical_id = this.vertical_id
    let dialog = this.dialog.open(EditrefreshComponent, {
      data: value,
      width: '650px', height: '500px'
    });

  }

  /**
   * open dialog
   */
  addTopic() {
    let dialog = this.dialog.open(AddtopicComponent, {
      data: this.vertical_id,
      width: '450px', height: '670px'
    });

  }

  /**
   * search bar 
   * @param value 
   * @param type 
   */
  Search(value, type) {
    this.value = value;
    this.name1 = name;
    if (value.length == 0 || value == '') {
      if (type == 'title') {
        this.title = '';
      }
      else if (type == 'description') {
        this.description = ''
      }
    }

    else {
      if (type == 'title') {
        this.title = value;
      }
      else if (type == 'description') {
        this.description = value
      }
    }


    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.manage_service.Post(this.getVerticalDataList, { vertical_id: this.vertical_id, cat_name: this.title, description: this.description, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.allItems = this.common.total_data;
        this.rows = this.common.data
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data

      });
  }
 
  /***
   * confirm dialog box for open delete record
   */
  confirmDialog(value): void {
    value.vertical_id = this.vertical_id
    const message = `Are you sure you want to delete this topic detail?`;
    let id = value
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

/**
 * view image dialog
 * @param value 
 */
  viewEye(value) {
    let dialog = this.dialog.open(ViewimageComponent, {
      data: value,
      width: '200px', height: '150px'
    });
  }

  /**
   * change selection on select field
   * @param type 
   * @param value 
   */
  change(type, value) {
    console.log(type, value)
    localStorage.setItem('names', value.cat_name )

    if (type == 'video') {
      this.rt.navigate(['/apps/vertical-management/videolist', value.id])
    }
    else if (type == 'quize') {
      this.rt.navigate(['/apps/vertical-management/quizzeslist',
       value.id,this.vertical_id])
      //  this.rt.navigate(['/apps/vertical-management/quizzeslist',
      //  this.vertical_id,value.id])

    }
  }

/**
 * open snackbar 
 */
  openaddSnackBar() {
    this._snackBar.open('Topic added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openadderrorSnackBar() {
    this._snackBar.open('Topic not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openeditSnackBar() {
    this._snackBar.open('Topic updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openediterrorSnackBar() {
    this._snackBar.open('Topic not updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  opendeleteSnackBar() {
    this._snackBar.open('Topic deleted successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  opendeleteerrorSnackBar() {
    this._snackBar.open('Topic not deleted successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
/**
 *  status change
 * @param value
 * @param id 
 */
  onChange(value, id) {
    console.log(value, id)
    let status;
    if (value == false) {
      status = 0;
      this.toastr.success('Status Inactive Successfully');
     
      // this._snackBar.open('Status Inactive','Dissmiss',{duration:2000})
    }
    else {
      status = 1;
      // this._snackBar.open('Status Active  ','Dissmiss',{duration:2000})
      this.toastr.success('Status Active Successfully');

    }
    this.manage_service.Post(this.topicActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
      console.log(res)
    })
  }

}
