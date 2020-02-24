import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CommentService } from './comment.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
export interface comment {
  user_name: string;
  user_email: string;
  website: string;
  comment: string;
  date:number;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  response: any;
  value: any;
  startIndex = 1
  endIndex = 10
  name: any;
  titleName: string;
  data: any;
  allItems: any;
  showloader=false
  categaryName: string;
  pageNumber: any;
  common: any;
  sort_column
  ASC
  sort_order = "DESC";
  changeCommentStatusApi=myGlobals.changeCommentStatusApi
  getCommentWithDataApi=myGlobals.getCommentWithDataApi
  deleteCommentApi=myGlobals.deleteCommentApi
  result: any;
  constructor(private dialog:MatDialog,
    private toastr: ToastrService
    ,private comment_service:CommentService) { }
  dataSource = new MatTableDataSource<any>(this.data);
  displayedColumns: string[] = ['user_name', 'user_email', 'website', 'comment', 'date','status'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.getCommentsList();
  }
  getCommentsList(){
  
  this.showloader=true
    this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader=false
      this.response = res
     

        this.allItems= this.response['recordsTotal']
        this.data=this.response.data
        this.dataSource=this.data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;

     
    });
  }

  public handlePage(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
    if (this.value != '') {
      // console.log(this.value, this.name)
      // this.Search(this.value, this.name)
    }
    else {
      this.iterator();

    }
  }

  private iterator() {
    let part;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
  this.showloader=true;
    this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader=false;
      this.response = res
      this.allItems= this.response['recordsTotal']

      this.data = this.response.data;
      this.dataSource = this.data;

    })
  }
 /**
   * =========================================
   *        Update sorting 
   * =========================================
   */

  updateSortingOrderComment(sort_column, sort_order) {
    this.showloader=true

    this.sort_column = sort_column
    this.ASC = sort_order
      this.comment_service.Post(this.getCommentWithDataApi, { column:this.sort_column,dir:this.ASC,offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        this.response = res
        this.showloader=false

      this.dataSource=this.response.data
    });
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
   * status change
   * @param value 
   * @param id 
   */
  onChange(value, id) {
    // console.log(value, id)
    let status;
    if (value.checked == true) {
      status = 1;
      this.toastr.success('Status Active Successfully');
      this.comment_service.Post(this.changeCommentStatusApi, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
        // console.log(res)
      })
    }
    else {
      status = 0;
      this.toastr.success('Status Inactive Successfully');
      this.comment_service.Post(this.changeCommentStatusApi, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
        // console.log(res)
      })
    }
  
  }
  /**
   * confirm Dialog for delete
   */
 
  confirmDialog(value): void {
    const message = `Are you sure you want to delete this comment detail?`;
    let id = value
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      // console.log(this.result)
      if(this.result == true){
        // this.comment_service.Post(this.deleteCommentApi,{id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
        // })
        this.getCommentsList();
        this.toastr.success("Comment Record Delete SuccessFully")
      }
    });
  }
}

// Search(value,search){

// }