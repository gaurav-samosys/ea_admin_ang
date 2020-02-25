import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserConfirmboxComponent, ConfirmDialogModel } from './user-confirmbox/user-confirmbox.component';
import { map } from 'rxjs/operators';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { UserService } from './user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ExcelService } from 'app/main/apps/Access-code/access-code/excel.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material';
import { Router } from '@angular/router';



export interface PeriodicElement {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = []

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [DatePipe]
})
export class UserComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  pageNumber: number = 0;
  size: number = 10;
  startIndex = 1
  endIndex = 10;
  value = '';
  name: any;
  showLoader = false;
  data: any;
  response: any;
  common: any;
  country: any;
  states: any;
  export_data: any;
  result: any;
  getUsers = myGlobals.getUsers;
  exportUser = myGlobals.exportUser;
  getCountry = myGlobals.getCountry;
  getStates = myGlobals.getState;
  changeUserStatus = myGlobals.changeUserStatus;
  delete_Users=myGlobals.delete_Users;
  deleteUserRecord=myGlobals.deleteUserRecord
  // https://staging.enrichedacademy.com/customers/

  rows: any;
  start: any;
  end: any;
  // array of all items to be paged

  allItems: any;
  fullname: any;
  email: any;
  clientname: any;
  companyname: any;
  country1: any;
  state: any;
  city: any;
  status: any;
  access_code: any;
  startDate: Date;
  endDate: Date;
  sdate: any;
  edate: any;
  showloader = false
  // pager object
  pager: any = {};
  sort_column
  ASC
  sort_order = 'DESC'
  // paged items
  pagedItems: any[];
  @ViewChild(MatSort, { static: true }) MatSort: MatSort;

  displayedColumns: string[] = ['full_name', 'email', 'client_name', 'created_on', 'certificate_downloaded', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumn:number=0
  constructor(
    private toastr: ToastrService,

    private excelService: ExcelService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private http: HttpClient, public dialog: MatDialog,
    private pagerService: PagerService,
    public user: UserService, private router: Router) {
    if (localStorage.getItem('status') == 'true') {
      // this.openSnackBar();
      localStorage.removeItem('status');
    }
    else if (localStorage.getItem('useradded_status') == 'true') {
      this.openuserSnackBar();
      localStorage.removeItem('useradded_status');
    }

    else if (localStorage.getItem('useradded_status') == 'false') {
      this.openusererrorSnackBar();
      localStorage.removeItem('useradded_status');
    }
  }

  ngOnInit() {
    this.fetchCountry();
    this.FetchUser();


  }
  reload() {
    location.reload()
    // this.router.navigate(['/apps/user-mangement/user']);
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
   * show hide c olumn
   * @param value 
   */
  columnClick(value, colName: string, evt) {
    // console.log('-0-----', evt.target.checked)
    var colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (evt.target.checked == false) {
      this.displayedColumns.splice(colIndex, 1);
    } else {
      // this.displayedColumns.push(colName);
      this.displayedColumns.splice(value, 0, colName)

    }
    if(this.displayedColumns.length==0){
      this. displayedColumn=1
    }else{
      this. displayedColumn=0

    }
    // console.log(colIndex,this.displayedColumns)
  }

  /**
    * =========================================
    *      open dialog popup
    * =========================================
    */

  openDialog(value) {
    let dialog = this.dialog.open(UserPopupComponent, {
      data: value,
      width: '900px', height: '600px'
    });

  }
  /**
    * =========================================
    *        Confirm dialog
    * =========================================
    */

  confirmDialog(value): void {
    // this.user.POST(this.deleteUserRecord, { id: value, token: 'LIVESITE' }).subscribe(res => {
    //   this.common = res
    //   if(this.common['success']==true){
    //         this.toastr.success("User Deleted Successfully")
    //   }else{
    //     this.toastr.warning("There Are some issue")

    //   }
    //   this.FetchUser();
    // })
    // const message = `Are you sure you want to delete this user detail?`;
    // let id = value
    // const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    // const dialogRef = this.dialog.open(UserConfirmboxComponent, {
    //   maxWidth: "400px",
    //   data: dialogData
    // });

    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   this.result = dialogResult;
    // });
  }
  /**
    * =========================================
    *        Update Dialog user 
    * =========================================
    */

  editDialog(value): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px', height: '500px',
      data: value
    });
  }
  /**
    * =========================================
    *        Fetch user 
    * =========================================
    */

  FetchUser() {
    this.showLoader = true
    this.user.POST(this.getUsers, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      // this.showLoader = false;
      this.response = res

      // console.log(this.response)
      this.showloader = false


  this.data = this.response.data
  this.dataSource = this.data;

  this.allItems = this.response.total_data;
  this.dataSource = new MatTableDataSource(this.data);
  this.dataSource.paginator = this.paginator;

      //this.setPage(1);
    })
  }

  public handlePage(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
    if (this.value != '') {
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
    this.user.POST(this.getUsers, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader = false;
      this.data = this.response.data;
      this.dataSource = this.data;

    })
  }
  /**
    * =========================================
    *        Update sorting 
    * =========================================
    */

  updateSortingOrderUser(sort_column, sort_order) {
    this.showloader = true
    this.sort_column = sort_column
    this.ASC = sort_order
    this.user.POST(this.getUsers, { full_name: this.fullname,
      email: this.email,
      client_name: this.clientname,
      company_name: this.companyname,
      country: this.country1, state: this.state,
      city: this.city, status: this.status,
      access_code: this.access_code,
      start_date: this.sdate,
      end_date: this.edate,column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false
      this.response = res
      this.dataSource = this.response.data
    });
  }


  /* setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
        // get current page of items
       console.log(this.pager)
        this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;

                  this.pageNumber=this.pager.startIndex;

 this.showLoader=true;
   this.user.POST(this.getUsers,{offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
            .subscribe(res => {
                 this.showLoader=false;
                this.response=res
               this.rows=this.response.data
               this.data=this.rows.slice(0, this.size);
               console.log(this.data)
             this.dataSource.data=this.data;
             this.allItems = this.response.total_data;


            });
       
    }*/
  /**
    * =========================================
    *        Add user
    * =========================================
    */

  addUser() {
    let dialog = this.dialog.open(AdduserComponent, {
      width: '600px', height: '500px'
    });
  }
  /**
    * =========================================
    *      fetch country
    * =========================================
    */

  fetchCountry() {


    this.user.POST(this.getCountry, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res
        this.country = this.common.data;

      })
  }
  /**
  * =========================================
  *        Get state
  * =========================================
  */

  getState(value, name) {
    this.country1 = '';
    this.state = '';
    this.Search(value, name);
    this.user.POST(this.getStates, { countries_id: value, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.states = this.common.data
    })
  }
  /**
    * =========================================
    *        OnSelection change
    * =========================================
    */

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
    this.user.POST(this.changeUserStatus, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
      // console.log(res)
    })
  }
  /**
    * =========================================
    *        Open Snackbar
    * =========================================
    */

  openSnackBar() {
    this._snackBar.open('User details updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openuserSnackBar() {
    this._snackBar.open('User added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openusererrorSnackBar() {
    this._snackBar.open('User not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  /**
    * =========================================
    *        Searching
    * =========================================
    */

  Search(value, name) {
    // console.log(value, name)
    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;
    if (value.length == 0 || value == '') {
      if (name == 'fullname') {
        this.fullname = '';
      }
      else if (name == 'email') {
        this.email = ''
      }

      // else if (name == 'email') {
      //   this.email = ''
      // }

      else if (name == 'clientname') {
        this.clientname = ''
      }
      else if (name == 'companyname') {
        this.companyname = ''
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
      else if (name == 'access_code') {
        this.access_code = ''

      }
      else if (name == 'start') {
        this.sdate = ''
      }
      else if (name == 'end') {
        this.edate = ''
      }
    }

    if (name == 'fullname') {
      this.fullname = value;
    }
    // else if (name == 'email') {
    //   this.email = value
    // }

    else if (name == 'email') {
      this.email = value
    }

    else if (name == 'clientname') {
      this.clientname = value
    }
    else if (name == 'companyname') {
      this.companyname = value
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
    else if (name == 'access_code') {
      this.access_code = value

    }
    else if (name == 'start') {
      this.sdate = value
    }
    else if (name == 'end') {
      this.edate = value
    }
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true
    this.user.POST(this.getUsers, {
      full_name: this.fullname,
      email: this.email,
      client_name: this.clientname,
      company_name: this.companyname,
      country: this.country1, state: this.state,
      city: this.city, status: this.status,
      access_code: this.access_code,
      start_date: this.sdate,
      end_date: this.edate,
      offset: this.pageNumber,
      limit: this.size, token: 'LIVESITE'
    })
      .subscribe(res => {
        this.response = res
 
  

        this.allItems = this.response.total_data;
        this.rows = this.response.data
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data
        this.allItems = this.response.total_data;

      });
  }

  /**
    * =========================================
    *       Date range Selection
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

  changelimit(value) {
    this.size = parseInt(value);
    this.FetchUser();
  }

  /**
    * =========================================
    *       Export Data And Download 
    * =========================================
    */

  exportData() {
    this.user.exportAsExcelFile(this.data, 'sample');

    // this.user.Post(this.exportManageCompanies, {
    //   company_name: this.company ? this.company : '',
    //   full_name: this.fullname ? this.fullname : '',
    //   user_email: this.email ? this.email : '',
    //   country: this.country1 ? this.country1 : '',
    //   state: this.state1 ? this.state1 : '',
    //   city: this.city ? this.city : '',
    //   industry: this.industry1 ? this.industry1 : '',
    //   start_date: this.sdate ? this.sdate : '',
    //   end_date: this.edate ? this.edate : '',
    //   user_type: '',
    //   status_check: '',
    //   excel: '',
    //   pdf: '',
    //   search_keyword: '',
    //   token: 'LIVESITE'
    // })
    //   .subscribe(res => {
    //     console.log(res)
    //     if (res['success'] == true) {
    //       console.log(this.data)
    //       this.user.exportAsExcelFile(this.data, 'sample');
    //     }

    //   })

  }

}





  // exportData()
  // {
  //   this.user.POST(this.exportUser,{full_name:'',email:'',client_name:'',company_name:'',access_code:'',created_data:'',status:'',token:'LIVESITE' })
  //           .subscribe(res => {
  //             this.common=res;
  //             this.export_data=this.common.data
  //             console.log(this.export_data);
  //             this.exportAsXLSX(this.export_data)
  //           })
  // }

  // exportAsXLSX(data)
  // {
  //   this.user.exportAsExcelFile(data, 'Enriched-Acadmey Users');
  // }
