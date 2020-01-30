import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { DeveloperapiService } from './developerapi.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material';


@Component({
  selector: 'app-developer-apis',
  templateUrl: './developer-apis.component.html',
  styleUrls: ['./developer-apis.component.scss']
})
export class DeveloperApisComponent implements OnInit {
  // @ViewChild(MatSort, { static: true }) MatSort: MatSort;
  toggle_menu1: boolean;

  displayedColumns
  : string[] = 
  ['full_name', 'email', 'app_id', 'app_secret', 'website', 'status'];
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
  showloader=false
  states: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  value = '';
  endIndex = 10;
  // pager object
  pager: any = {};
  getDeveloperApiListing = myGlobals.getDeveloperApiListing;
  // paged items
  pagedItems: any[];
  getClients = myGlobals.getClients;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  statusChangeApiUser = myGlobals.statusChangeApiUser;
  dataSource = new MatTableDataSource<any>(this.data);
  sort_column
  ASC
  sort_order: 'DESC'
  constructor(private http: HttpClient,
    private toastr: ToastrService,
    public dialog: MatDialog,
     private pagerService: PagerService, 
     public developer_service: DeveloperapiService) {
  }

  ngOnInit() {
    this.fetchListing();
  }
  showHideColumns(value) {
    console.log(value)
  }
  // setPage(page: number) {
  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.allItems, page, this.size);
  //   this.start = this.pager.startIndex + 1;
  //   this.end = this.pager.endIndex + 1;
  //   // get current page of items

  //   this.pageNumber = this.pager.startIndex;

  //   this.developer_service.Post(this.getDeveloperApiListing, { offset: this.pageNumber, limit: this.size, token: 'LIVESITE' })
  //     .subscribe(res => {
  //       this.common = res
  //       this.rows = this.common.data
  //       this.data = this.rows.slice(0, this.size);
  //       this.dataSource.data = this.data
  //       this.allItems = this.common.total_data;


  //     });

  // } 
  /**
   * column toggle show hide
   * @param colName 
   * @param evt 
   */
  columnClick(value,colName: string, evt) {
    console.log('-0-----', evt.target.checked)
    const colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (evt.target.checked == false) {
      this.displayedColumns.splice(colIndex, 1);
    } else {
      // this.displayedColumns.push(colName);
      this.displayedColumns.splice(value,0,colName)

    }
    // if (colIndex > 0) {
    //   // column is currently shown in the table, so we remove it
    //   this.displayedColumns.splice(colIndex, 1);
    // } else {
    //   // column is not in the table, so we add it
    //   this.displayedColumns.push(colName);
    // }
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
    * =========================================
    *        Update sorting 
    * =========================================
    */

  updateSortingOrderDevloperApi(sort_column, sort_order) {
 
  this.showloader=true
    this.sort_column = sort_column
    this.ASC = sort_order
    this.developer_service.Post(this.getDeveloperApiListing, { column: sort_column, dir: this.ASC, limit: this.pageNumber, offset: this.size, id: '', token: 'LIVESITE' })
      .subscribe(res => {
        this.showloader=false

        this.response = res
        this.dataSource = this.response.data
      });
  }

  /**
   * toggle menu
   */
  toggle() {
    this.toggle_menu1 = !this.toggle_menu1
  }
  changelimit(value) {
    this.size = parseInt(value);
    this.fetchListing();
  }

  /**
   * get devloper apis
   */

  fetchListing() {
    this.showloader=true

    this.developer_service.Post(this.getDeveloperApiListing, { limit: this.pageNumber, offset: this.size, id: '', token: 'LIVESITE' })
      .subscribe(res => {
        this.showloader=false

        this.common = res;
        this.data = this.common.data
        this.dataSource.data = this.data
        this.allItems = this.common.total_data;
        // this.setPage(1)
      })
  }

  public handlePage(e: any) {
    console.log(e)
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
    this.developer_service.Post(this.getDeveloperApiListing, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader=false;
      this.data = this.response.data;
      this.dataSource = this.data;
      console.log(this.dataSource)
    })
  }



  fetchCountry() {
    this.developer_service.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }
  getState(value) {
    this.developer_service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }

  onChange(value, id) {
    let status;
    if (value == false) {
      status = 0;
      this.toastr.success('Status Inactive Successfully');

    }
    else {
      status = 1;
      this.toastr.success('Status Active Successfully');

    }
    this.developer_service.Post(this.statusChangeApiUser, { token: "LIVESITE", api_user_id: id, status: status }).subscribe(res => {
      console.log(res)
    })
  }
}

  // status(id, status) {
  //   this.login_service.post(this.base_url + 'update_status_provider/' + id, { status: status }).subscribe(res => {
  //     console.log(res)
  //     if (res['status'] == true) {
  //       if (status == 3) {
  //         this.toastr.success('provider deleted Successfully');
  //       } else {
  //         this.toastr.success('provider Changed Successfully');
  //       }
  //       this.ngOnInit();
  //     } else {
  //       if (status == 3) {
  //         this.toastr.error('provider deletation failed');
  //       } else {
  //         this.toastr.error('provider Changed failed');
  //       }
  //     }

  //   })
  //   this.getProviderList();

  // }
