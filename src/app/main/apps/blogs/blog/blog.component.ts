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

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  displayedColumns: string[] = ['title', 'author', 'categary', 'created_on',  'action'];
  // dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  value: any;
  name: any;
  titleName: string;
  categaryName: string;
  constructor(
    private toastr: ToastrService,

    private _snackBar: MatSnackBar,  private http: HttpClient, 
    public dialog: MatDialog, private pagerService: PagerService, public blog_service: BlogService)
     {
   
  }

  ngOnInit() {

  }
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  
  sort_column
  ASC
  sort_order = "DESC";

  updateSortingOrderClient(sort_column, sort_order) {
    this.sort_column = sort_column
    this.ASC = sort_order
    // this.blog_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    //   this.dataSource=this.common.data
    // });
  }
  Search(value, name) {

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
     
    }

    else {
      if (name == 'client') {
        this.titleName = value;
      }
      else if (name == 'company') {
        this.categaryName = value
      }

     

    }


    // const end = (this.currentPage + 1) * this.pageSize;
    // const start = this.currentPage * this.pageSize;
    // this.pageNumber = start
    // this.client_service.Post(this.getClients, { company_name: this.companyname, client_name: this.clientname, first_name: this.first_name, email: this.email, client_vertical: this.vertical1, portal_name: this.portal, city: this.city, start_date: this.sdate, end_date: this.edate, status: this.status, country: this.country1, state: this.state, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' })
    //   .subscribe(res => {
    //     this.response = res
    //     this.allItems = this.response.total_data;
    //     this.rows = this.response.data
    //     this.data = this.rows.slice(0, this.size);
    //     this.dataSource = this.data
    //   });
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


 
}
