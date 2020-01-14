import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface blog {
  post_title: string;
  author: string;
  category: string;
  created_date: number;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  data: any;
  startIndex = 1
  endIndex = 10
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  size: number = 10;

  displayedColumns: string[] = ['post_title', 'author', 'category', 'created_date', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  getBlogWithDataApi = myGlobals.getBlogWithDataApi
  deleteBlogApi = myGlobals.deleteBlogApi
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  // value: any;
  name: any;
  titleName: string;
  categaryName: string;
  response: Object;
  pageNumber: any;
  common: any;
  sort_column
  ASC
  allItems: any;
  value = '';
  hide_column: number = 0
  sort_order = "DESC";
  rows: any;
  private shown: string = 'Post_Title';
  endName: string;
  startDate: string;
  endDate: string;
  myDate;
  blogForm: FormGroup
  constructor(private router: Router,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar, private http: HttpClient, private fb: FormBuilder,
    public dialog: MatDialog, private pagerService: PagerService, public blog_service: BlogService) {

    this.blogForm = this.fb.group({
      post_title: '',
      category: '',
      start_date: '',
      end_date: ''
    })
  }

  ngOnInit() {

    this.myDate = new Date();
    console.log(this.myDate)
    this.dataSource.paginator = this.paginator;

    this.getBlogList()
  }
  // column
  // onclick(value) {
  //   this.column = value
  //   console.log(this.column)
  //   // this.displayedColumns.push(this.column)
  //   this.hide_column = 1
  //   if (this.column == 'Post_Title') {

  //   } else if (this.column == 'Author') {

  //   } else if (this.column == 'Categary') {

  //   } else if (this.column == 'Created_Date') {

  //   } else if (this.column == 'Action') {

  //   }else{

  //   }

  // }
  columnClick(colName: string,evt) {
    console.log('-0-----', evt.target.checked)
    const colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (evt.target.checked == false) {
      this.displayedColumns.splice(colIndex, 1);
    } else {
      this.displayedColumns.push(colName);
    }
    // if (colIndex > 0) {
    //   // column is currently shown in the table, so we remove it
    //   this.displayedColumns.splice(colIndex, 1);
    // } else {
    //   // column is not in the table, so we add it
    //   this.displayedColumns.push(colName);
    // }
  }





  getBlogList() {
    this.blog_service.Post(this.getBlogWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      // console.log(res)
      this.data = this.response['data']
      // console.log(this.data)
      this.dataSource = this.data
      this.dataSource = new MatTableDataSource(this.data);
      this.allItems = this.response['recordsTotal'];
      // console.log(this.allItems)
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
      if (this.value != this.value) {
        this.currentPage = 0;
      }
      // console.log(this.value, this.name)
      this.Search(this.value, this.name)
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
    this.blog_service.Post(this.getBlogWithDataApi, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      //this.showloader=false;
      this.data = this.response['data'];
      this.dataSource = this.data;

    })
  }
  // routerLink="/apps/blog-post/:id"
  navigateAddPost() {
    this.router.navigate(['/apps/blog-post', 'add-post'])
    // this.router.navigate(['/apps/blog-post'], { queryParams: { order: 'popular' } });
  }

  EditPost(element) {
    // console.log(element)
    this.router.navigate(['/apps/blog-post', element.id]);

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
    * =========================================
    *        Update sorting 
    * =========================================
    */

  updateSortingOrderBlog(sort_column, sort_order) {
    this.sort_column = sort_column
    this.ASC = sort_order
    this.blog_service.Post(this.getBlogWithDataApi, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.dataSource = this.response['data']
    });
  }


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
        this.categaryName = ''
      }
      else if (name == 'start_date') {
        this.startDate = ''
      }
      else if (name == 'end_date') {
        this.endDate = ''
      }

    }

    else {
      if (name == 'title') {
        this.titleName = value;
      }
      else if (name == 'categary') {
        this.categaryName = value
      }
      else if (name == 'start_date') {
        this.startDate = value
      }
      else if (name == 'end_date') {
        this.endDate = value
      }



    }

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.blog_service.Post(this.getBlogWithDataApi, {
      post_title: this.titleName, category: this.categaryName,
      start_date: this.startDate, end_date: this.endDate,
      offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
    })
      .subscribe(res => {
        // console.log(res)
        this.response = res
        this.allItems = this.response['recordsTotal'];
        this.rows = this.response['data']
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data
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
  confirmDialogDelete(id) {
    this.blog_service.Post(this.deleteBlogApi, { id: id, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      console.log(this.response)
      if (this.response['success'] == true && this.response['status_code'] == 200) {
        Swal.fire({
          title: 'Success',
          text: 'Record delete successfully',
          icon: 'success'
        })
      } else {
        Swal.fire({
          title: 'Warning',
          text: 'There Are some issue',
          icon: 'warning',

        })
      }
      this.getBlogList();

    })
  }


}
