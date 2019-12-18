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


@Component({
  selector: 'app-developer-apis',
  templateUrl: './developer-apis.component.html',
  styleUrls: ['./developer-apis.component.scss']
})
export class DeveloperApisComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'email', 'app_id', 'app_secret', 'website', 'status'];
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

  constructor(private http: HttpClient,
    private toastr: ToastrService,

    public dialog: MatDialog, private pagerService: PagerService, public developer_service: DeveloperapiService) {

  }

  ngOnInit() {
    this.fetchListing();
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems, page, this.size);
    this.start = this.pager.startIndex + 1;
    this.end = this.pager.endIndex + 1;
    // get current page of items

    this.pageNumber = this.pager.startIndex;

    this.developer_service.Post(this.getDeveloperApiListing, { offset: this.pageNumber, limit: this.size, token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.rows = this.common.data
        this.data = this.rows.slice(0, this.size);
        this.dataSource.data = this.data
        this.allItems = this.common.total_data;


      });

  }

  changelimit(value) {
    this.size = parseInt(value);
    this.fetchListing();
  }

  fetchListing() {
    this.developer_service.Post(this.getDeveloperApiListing, { limit: this.pageNumber, offset: this.size, id: '', token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res;
        this.data = this.common.data
        this.dataSource.data = this.data
        this.allItems = this.common.total_data;
        this.setPage(1)
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
}
