import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { ClientsService } from './clients.service'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ClientPopupComponent } from './client-popup/client-popup.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
// import { ExcelService } from '../../Access-code/access-code/excel.service';
//import { PagerService } from '../../../pager.service';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  client_name: any,
  company_name: any,
  client_vertical: any,
  portal_name: any,
  created_on: any,
  totalUsers: any
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [DatePipe]
})
export class ClientsComponent implements OnInit {
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
  vertical: any;
  startDate: Date;
  endDate: Date;
  clientname: any;
  companyname: any;
  first_name: any;
  email: any;
  vertical1: any;
  portal: any;
  country1: any;
  state: any;
  city: any;
  status: any;
  sdate: any;
  edate: any;
  value = '';
  name: any;
  // pager object
  pager: any = {};
  showloader = false
  // paged items
  pagedItems: any[];
  getClients = myGlobals.getClients;
  getCountry = myGlobals.getCountry;
  exportManageClient = myGlobals.exportManageClient;
  getStates = myGlobals.getState;
  getClientVertical = myGlobals.getClientVertical;
  statusChangeApiUser = myGlobals.statusChangeApiUser;
  clientActive = myGlobals.clientActive;
  deleteClient = myGlobals.deleteClient

  displayedColumns: string[] = ['client_name', 'company_name',
    'client_vertical', 'portal_name', 'created_on', 'totalUsers', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  id: any;
  constructor(
    private toastr: ToastrService,

    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private http: HttpClient,
    public dialog: MatDialog, private pagerService: PagerService, public client_service: ClientsService) {
    if (localStorage.getItem('clientadded_status') == 'true') {
      this.openclientaddedSnackBar();
      localStorage.removeItem('clientadded_status');
    }
    else if (localStorage.getItem('clientadded_status') == 'false') {
      this.openclientaddederrorSnackBar();
      localStorage.removeItem('clientadded_status');
    }

    else if (localStorage.getItem('clientedit_status') == 'true') {
      this.openclienteditSnackBar();
      localStorage.removeItem('clientedit_status');
    }
    else if (localStorage.getItem('clientedit_status') == 'false') {
      this.openclientediterrorSnackBar();
      localStorage.removeItem('clientedit_status');
    }
  }


  ngOnInit() {

    this.fetchCountry();
    this.FetchClient();
    this.ClientVertical();
  }
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }
  clientName
  client_Name
  FetchClient() {
    this.showloader = true;

    this.client_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false;

      this.response = res
      // console.log(this.response)
      this.data = this.response.data;


      this.client_Name = this.data[0]['client_name'].replace(/ /g, "_");
      // console.log( this.id,this.client_Name);




      for (let i = 0; i < this.data.length; i++) {
        this.client_Name = this.data[i]['client_name']
        this.id = this.data[i]['id']

        // console.log(this.client_Name,this.id)
      }





      this.dataSource = this.data;
      this.allItems = this.response.total_data;
      this.dataSource = new MatTableDataSource(this.data);
      // this.dataSource.sort = this.sort;

      this.dataSource.paginator = this.paginator;
      //this.setPage(1);

    });
  }

  public handlePage(e: any) {
    // console.log(e)
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
    this.showloader = true;
    this.client_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader = false;
      this.data = this.response.data;
      this.dataSource = this.data;

    })
  }
  sort_column
  ASC
  sort_order = "DESC";

  updateSortingOrderClient(sort_column, sort_order) {
    this.showloader = true;

    this.sort_column = sort_column
    this.ASC = sort_order
    this.client_service.Post(this.getClients, {
      company_name: this.companyname, client_name: this.clientname,
      first_name: this.first_name, email: this.email, client_vertical: this.vertical1, portal_name: this.portal,
      city: this.city,
      column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
    }).subscribe(res => {
      this.showloader = false;

      this.response = res
      this.dataSource = this.response.data
    });
  }

  openDialog(value) {
    let dialog = this.dialog.open(ClientPopupComponent, {
      data: value,
      width: '650px', height: '400px'
    });

  }

  confirmDialog(value): void {

    // this.client_service.Post(this.deleteClient, { id: value, token: 'LIVESITE' }).subscribe(res => {
    //   this.common = res
    //   if (this.common['success'] == true) {
    //     this.toastr.success("delete client successfully")
    //   } else {
    //     this.toastr.warning("there are some issue")

    //   }
    //   this.FetchClient();
    // })
    const message = `Are you sure you want to delete this client detail?`;
    let id = value
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result == true) {
        this.client_service.Post(this.deleteClient, { id: value, token: 'LIVESITE' }).subscribe(res => {
          this.common = res
          if (this.common['success'] == true) {
            this.toastr.success("delete client successfully")
          } else {
            this.toastr.warning("there are some issue")

          }
          this.FetchClient();
        })
      } else {

      }
    });
  }

  openclientaddedSnackBar() {
    this._snackBar.open('Client added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openclientaddederrorSnackBar() {
    this._snackBar.open('Client not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openclienteditSnackBar() {
    this._snackBar.open('Client updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openclientediterrorSnackBar() {
    this._snackBar.open('Client not updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /*
      editDialog(value): void { 
      const dialogRef = this.dialog.open(ClientEditComponent, {
        width: '600px',height:'500px',
        data: value
      });
    }*/

  /* setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
           this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;
        // get current page of items

                  this.pageNumber=this.pager.startIndex;

   this.client_service.Post(this.getClients,{offset:this.pageNumber,limit : this.size ,token:'LIVESITE'})
            .subscribe(res => {
                this.response=res
               this.rows=this.response.data
               this.data=this.rows.slice(0, this.size);
             this.dataSource.data=this.data
               this.allItems = this.response.total_data;


            });
       
    }*/

  changelimit(value) {
    this.size = parseInt(value);
    this.FetchClient();
  }

  fetchCountry() {
    this.client_service.Post(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }
  getState(value, name) {
    this.country1 = '';
    this.state = '';
    this.Search(value, name);
    this.client_service.Post(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }

  Edit(value) {
    // console.log(value)
    this.client_service.editData(value)
  }
  ClientVertical() {
    this.client_service.Post(this.getClientVertical, { token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.vertical = this.common.data
    })
  }

  onChange(value, id) {
    // console.log(value, id)
    let status;
    if (value == false) {
      status = 0;
      this.toastr.success('Status Inactive Successfully');

    }
    else {
      status = 1;
      this.toastr.success('Status Active Successfully');

    }
    this.client_service.Post(this.clientActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
      // console.log(res)
    })
  }
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
        this.first_name = ''
      }

      else if (name == 'email') {
        this.email = ''
      }
      else if (name == 'vertical') {
        this.vertical1 = ''
      }
      else if (name == 'portal') {
        this.portal = ''
      }
      else if (name == 'country') {
        this.country1 = ''

      }
      else if (name == 'state') {
        this.state = ''

      }
      else if (name == 'city') {
        this.city = ''
      }
      else if (name == 'status') {
        this.status = ''

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
        this.first_name = value
      }

      else if (name == 'email') {
        this.email = value
      }
      else if (name == 'vertical') {
        this.vertical1 = value
      }
      else if (name == 'portal') {
        this.portal = value
      }
      else if (name == 'country') {
        this.country1 = value

      }
      else if (name == 'state') {
        this.state = value

      }
      else if (name == 'city') {
        this.city = value
      }
      else if (name == 'status') {
        this.status = value

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
    this.showloader = true

    this.client_service.Post(this.getClients, {
      company_name: this.companyname, client_name: this.clientname,
      first_name: this.first_name, email: this.email, client_vertical: this.vertical1, portal_name: this.portal,
      city: this.city, start_date: this.sdate, end_date: this.edate, status: this.status, country: this.country1, state: this.state, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
    })
      .subscribe(res => {
        this.showloader = false

        this.response = res
        this.allItems = this.response.total_data;
        this.rows = this.response.data
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data
      });
  }


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



  exportData() {
    this.client_service.Post(this.exportManageClient, {
      company_id: '',
      client_name: this.clientname ? this.clientname : '',
      comp_name: this.companyname ? this.companyname : '',
      first_client: this.first_name ? this.first_name : '',
      client_email: this.email ? this.email : '',
      portal_view: this.portal ? this.portal : '',
      client_vertical: this.vertical1 ? this.vertical1 : '',

      country: this.country1 ? this.country1 : '',
      state: this.state ? this.state : '',
      city: this.city ? this.city : '',
      start_date: this.sdate ? this.sdate : '',
      end_date: this.edate ? this.edate : '',
      status_check: '',

      user_type: '',
      excel: '',
      pdf: '',
      search_keyword: '',
      token: 'LIVESITE'
    })
      .subscribe(res => {
        // console.log(res)
        if (res['success'] == true) {
          // console.log(this.data)
          this.client_service.exportAsExcelFile(this.data, 'sample');

        }

      })

  }

}

    // this.client_service.exportAsExcelFile(this.data, 'sample');

// company_id,client_name,comp_name,first_client,client_email,portal_view,client_vertical,
  // country,state,city,status_check,start_date,end_date