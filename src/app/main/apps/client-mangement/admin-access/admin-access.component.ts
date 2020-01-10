import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminAccessService } from './admin-access.service';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.scss'],
  providers: [DatePipe]
})
export class AdminAccessComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  endIndex = 10
  data: any;
  response: any;
  html: any;
  result: any;
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  start: any;
  end: any;
  common: any;
  country: any;
  // array of all items to be paged
  allItems: any;
  states: any;
  clientname: any;
  companyname: any;
  firstname: any;
  lastname: any;
  email: any;
  sdate: any;
  edate: any;
  startDate: Date;
  endDate: Date;
  value = '';
  name: any;
  // pager object
  pager: any = {};
  sort_column
  sort_order = "DESC";
  ASC;
  // paged items
  pagedItems: any[];
  getClients = myGlobals.getClients;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  getAdminUsers = myGlobals.getAdminUsers;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'client_name', 'company_name', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) MatSort: MatSort;

  constructor(
    private toastr: ToastrService,

    private datePipe: DatePipe, private _snackBar: MatSnackBar, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, public admin_service: AdminAccessService) {
    if (localStorage.getItem('adminadded_status') == 'true') {
      this.openSnackBar();
      localStorage.removeItem('adminadded_status');
    }
    else if (localStorage.getItem('adminadded_status') == 'false') {
      this.openaddederrorSnackBar();
      localStorage.removeItem('adminadded_status');
    }
    else if (localStorage.getItem('admin_updatestatus') == 'true') {
      this.openupdateSnackBar();
      localStorage.removeItem('admin_updatestatus');
    }
    else if (localStorage.getItem('admin_updatestatus') == 'false') {
      this.openupdateerrorSnackBar();
      localStorage.removeItem('admin_updatestatus');
    }
  }

  ngOnInit() {
    this.fetchCountry();
    this.dataSource.paginator = this.paginator;

    this.fetchAdminaccess();
  }

  /**
   * =========================================
   *        Fetch Admin Access
   * =========================================
   */
  fetchAdminaccess() {
    this.admin_service.Post(this.getAdminUsers, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.data = this.common.data;
      console.log(this.data)
      this.allItems = this.common.total_data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.MatSort;

      //this.setPage(1);

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
    this.admin_service.Post(this.getAdminUsers, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
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

  updateSortingOrderAdminAccess(sort_column, sort_order) {
    this.sort_column = sort_column
    this.ASC = sort_order
      this.admin_service.Post(this.getAdminUsers, { column:this.sort_column,dir:this.ASC,offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
        this.response = res
      this.dataSource=this.common.data
    });
  }

   /**
   * =========================================
   *       open Dialog
   * =========================================
   */
  openDialog() {
    let dialog = this.dialog.open(AddadminComponent, {
      width: '650px', height: '500px'
    });

  }
 /**
   * =========================================
   *        Open snackbar
   * =========================================
   */
  openSnackBar() {
    this._snackBar.open('Admin User added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openaddederrorSnackBar() {
    this._snackBar.open('Admin User not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openupdateSnackBar() {
    this._snackBar.open('Admin User detail updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openupdateerrorSnackBar() {
    this._snackBar.open('Admin User detail not updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
 /**
   * =========================================
   *        Confirm Dialog Box
   * =========================================
   */
  confirmDialog(value): void {
    const message = `Are you sure you want to delete this user detail?`;
    let id = value
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
 /**
   * =========================================
   *        Edit Dialog
   * =========================================
   */
  editDialog(value): void {
    const dialogRef = this.dialog.open(EditAdminComponent, {
      width: '600px', height: '500px',
      data: value
    });
  }

  /* setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
           this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;
        // get current page of items

                  this.pageNumber=this.pager.startIndex;

   this.admin_service.Post(this.getAdminUsers,{ offset:this.pageNumber,limit : this.size ,token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
               this.rows=this.common.data
               this.data=this.rows.slice(0, this.size);
             this.dataSource.data=this.data
               this.allItems = this.common.total_data;


            });
       
    }*/

  changelimit(value) {
    this.size = parseInt(value);
    this.fetchAdminaccess();
  }
 /**
   * =========================================
   *        Fetch Country
   * =========================================
   */
  fetchCountry() {
    this.admin_service.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }

/**
   * =========================================
   *        Get State
   * =========================================
   */

  getState(value) {
    this.admin_service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }

  /**
   * =========================================
   *       Searching Field
   * =========================================
   */
  Search(value, name) {
    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;
    if (value.length == 0) {
      if (name == 'client') {
        this.clientname = '';
      }
      else if (name == 'company') {
        this.companyname = ''
      }

      else if (name == 'fname') {
        this.firstname = ''
      }

      else if (name == 'lname') {
        this.lastname = ''
      }

      else if (name == 'email') {
        this.email = ''
      }
      else if (name == 'start') {
        this.sdate = ''

      }
      else if (name == 'end') {
        this.edate = ''

      }
    }

    else {


      if (name == 'client') {
        this.clientname = value;
      }
      else if (name == 'company') {
        this.companyname = value
      }

      else if (name == 'fname') {
        this.firstname = value
      }

      else if (name == 'lname') {
        this.lastname = value
      }

      else if (name == 'email') {
        this.email = value
      }

      else if (name == 'start') {
        this.sdate = value

      }
      else if (name == 'end') {
        this.edate = value

      }

    }
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.admin_service.Post(this.getAdminUsers, { company_name: this.companyname, client_name: this.clientname, first_name: this.firstname, last_name: this.lastname, email: this.email, start_date: this.sdate, end_date: this.edate, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.allItems = this.common.total_data;
        this.rows = this.common.data
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data



      });
  }

/**
   * =========================================
   *        Select Date range
   * =========================================
   */
  MyDate(newDate, name) {
    let date;
    if (name == 'start') {

      this.startDate = newDate;
      date = this.startDate
    }
    else if (name == 'end') {

      this.endDate = newDate;
      date = this.endDate
    }
    if (date != null) {

      this.Search(this.datePipe.transform(date, "yyyy-MM-dd"), name);
    }
    else {
      this.Search(date = '', name)
    }
  }

}


