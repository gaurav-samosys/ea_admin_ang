import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CommentService } from './comment.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
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

  categaryName: string;
  pageNumber: any;
  common: any;
  sort_column
  ASC
  sort_order = "DESC";
  getCommentWithDataApi=myGlobals.getCommentWithDataApi
  constructor(
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
    this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      console.log(res)
      this.allItems= this.response['recordsTotal']

      this.data=this.response.data
      this.dataSource=this.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
     
    });
  }

  public handlePage(e: any) {
    console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
    if (this.value != '') {
      console.log(this.value, this.name)
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
    /* this.showloader=true;*/
    this.comment_service.Post(this.getCommentWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.allItems= this.response['recordsTotal']

      //this.showloader=false;
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
    this.sort_column = sort_column
    this.ASC = sort_order
      this.comment_service.Post(this.getCommentWithDataApi, { column:this.sort_column,dir:this.ASC,offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        this.response = res
      this.dataSource=this.response.data
    });
  }
  
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
  onChange(value, id) {
    console.log(value, id)
    let status;
    if (value == false) {
      status = 0;
      this.toastr.success('Status Inactive Successfully');

    }
    else {
      status = 1;
      this.toastr.success('Status Active Successfully');

    }
    // this.comment_service.Post(this.getCommentWithDataApi, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
    //   console.log(res)
    // })
  }
}

// Search(value,search){

// }