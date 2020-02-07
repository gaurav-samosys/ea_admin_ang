import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserConfirmboxComponent, ConfirmDialogModel } from './user-confirmbox/user-confirmbox.component';
import { map } from 'rxjs/operators';
import { PagerService } from '../pager.service'

import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AdduserComponent } from '../../user-mangement/user/adduser/adduser.component';
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = []

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe]

})
export class UsersComponent implements OnInit {
  showloader = false;
  data: any;
  value = '';
  startDate: Date;
  endDate: Date;
  endDate1: Date;

  startDate1: Date;

  full_name;
  email;
  client_name;
  company_name;
  country;
  state;
  city;
  status;

  access_code;
  division = 1;

  response: any;
  result: any;
  getUsers = myGlobals.getUsers
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  start: any;
  end: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  endIndex = 10
  // array of all items to be paged
  allItems: any;

  // pager object
  pager: any = {};

  // paged items    full_name    email  client created_on  status action
  pagedItems: any[];
  displayedColumns: string[] =
    ['full_name', 'email', 'client', 'created_on', 'status', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  name: any;
  stateArray = []
  CountryArray = []
  id: any;

  constructor(
    private toastr: ToastrService,
    private datePipe: DatePipe,
    public _Activatedroute: ActivatedRoute,
    private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService) {

  }

  sub
  ngOnInit() {
    this.id = window.location.href.split('dashboards/user')[1]
    console.log(this.id)
    this.sub = this._Activatedroute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id,params)

      // In a real app: dispatch action to load the details here.
   });

    this.dataSource.paginator = this.paginator;
  }

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
 * show hide column
 * @param value 
 */

  columnClick(value, colName: string, evt) {
    console.log('-0-----', evt.target.checked)
    var colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (evt.target.checked == false) {
      this.displayedColumns.splice(colIndex, 1);
    } else {
      // this.displayedColumns.push(colName);
      this.displayedColumns.splice(value, 0, colName)

    }
  }
  /**===========================================================
            on selction change status 
      ===========================================================*/
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
    // this.companyService.Post(this.companyActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
    //   console.log(res)
    // })
  }
  /**===========================================================
            Export data and download
    ===========================================================*/
  // exportData() {
  //   this.companyService.Post(this.exportManageCompanies, {
  //     company_name: this.company ? this.company : '',
  //     full_name: this.fullname ? this.fullname : '',
  //     user_email: this.email ? this.email : '',
  //     country: this.country1 ? this.country1 : '',
  //     state: this.state1 ? this.state1 : '',
  //     city: this.city ? this.city : '',
  //     industry: this.industry1 ? this.industry1 : '',
  //     start_date: this.sdate ? this.sdate : '',
  //     end_date: this.edate ? this.edate : '',
  //     user_type: '',
  //     status_check: '',
  //     excel: '',
  //     pdf: '',
  //     search_keyword: '',
  //     token: 'LIVESITE'
  //   })
  //     .subscribe(res => {
  //       console.log(res)
  //       if (res['success'] == true) {
  //         console.log(this.data)
  //         this.companyService.exportAsExcelFile(this.data, 'sample');
  //       }

  //     })

  // }

  /**
   * 
   * @param value change button company detail and company search
   */
  SwitchButton(value) {
    if (value == 1) {
      this.division = 1;
    }
    else if (value == 2) {
      this.division = 2;
    }
  }

  // ===============================================
  statusArray = [{ id: 1, name: 'Active' }, { id: 2, name: 'Inactive' }]
  /**===========================================================
    sorting using Assending and dissending order
===========================================================*/
  sort_column
  // sort_column = "date_created";
  sort_order = "DESC";
  ASC;
  updateSortingOrderCompany(sort_column, sort_order) {
    this.showloader = true

    this.sort_column = sort_column
    this.ASC = sort_order
    // this.companyService.Post(this.getCompanies, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    this.showloader = false

    //   console.log(this.response.data)
    //   this.dataSource=this.response.data
    // })
  }

  /**
 * 
 * @param value search
 * @param name 
 */
  Search(value, name) {
    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;

    if (value.length == 0) {
      if (name == 'client') {
        //  this.clientname ='';
      }
      else if (name == 'company') {
        //  this.companyname =''
      }

      //        else if(name == 'fname'){
      //        this.first_name1 =''
      //      }

      //        else if(name == 'email'){
      //        this.email =''
      //      }
      //          else if(name == 'vertical'){
      //        this.vertical1 =''
      //      }
      //          else if(name == 'portal'){
      //        this.portal =''
      //      }
      //          else if(name == 'country'){
      //        this.country1 =''

      //      }
      //          else if(name == 'state'){
      //        this.state =''

      //      }
      //           else if(name == 'city'){
      //        this.city =''
      //       }
      //           else if(name == 'status'){
      //        this.status =''

      //       }
      //          else if(name == 'start'){
      //        this.sdate =''

      //       }
      //          else if(name == 'end'){
      //        this.edate =''

      //       }
    }

    //      else
    //      {


    //          if(name == 'client'){
    //      this.clientname =value;
    //      }
    //      else if(name == 'company'){
    //        this.companyname =value
    //      }

    //        else if(name == 'fname'){
    //        this.first_name1 =value
    //      }

    //        else if(name == 'email'){
    //        this.email =value
    //      }
    //          else if(name == 'vertical'){
    //        this.vertical1 =value
    //      }
    //          else if(name == 'portal'){
    //        this.portal =value
    //      }
    //          else if(name == 'country'){
    //        this.country1 =value

    //      }
    //          else if(name == 'state'){
    //        this.state =value

    //      }
    //           else if(name == 'city'){
    //        this.city =value
    //       }
    //           else if(name == 'status'){
    //        this.status =value

    //       }
    //          else if(name == 'start'){
    //        this.sdate =value

    //       }
    //          else if(name == 'end'){
    //        this.edate =value

    //       }

    //    }
    //    const end = (this.currentPage + 1) * this.pageSize;
    // const start = this.currentPage * this.pageSize;
    // this.pageNumber=start
    // this.showloader=true

    // this.companyService.Post(this.getClients,{company_id:this.id,company_name:this.companyname,
    //  client_name:this.clientname,first_name:this.first_name,
    //  email : this.email,client_vertical:this.vertical1,portal_name:this.portal,city:this.city,
    //  start_date:this.sdate,end_date:this.edate,status:this.status,country:this.country1,
    //  state:this.state, offset:this.pageNumber,limit : this.pageSize ,token:'LIVESITE'})
    //          .subscribe(res => {
    //            this.showloader=false

    //              this.common=res
    //              this.allItems=this.common.total_data;
    //             this.rows=this.common.data
    //             this.data=this.rows.slice(0, this.size);
    //           this.dataSource=this.data



    //          });
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

}





// ngOnInit() {
//   this.dataSource.paginator = this.paginator;
//  const httpOptions = {
//    headers: new HttpHeaders({
//      'Content-Type': 'application/json',
//      'Access-Control-Allow-Origin':'*'       
//    })
// };
// this.showloader=true;
//  this.http.post(this.getUsers,{fields : '*', offset:this.pageNumber, limit : this.size ,token:'LIVESITE'},httpOptions).subscribe(res => {
//       this.showloader=false;
//        this.response=res
//        this.data=this.response.data
//      this.dataSource.data=this.data
//     this.allItems = this.response.total_data;
//              this.setPage(1);
//         })

// }


//   openDialog(value) {
//   let dialog= this.dialog.open(ModalComponent,{
//     data:value,
//      width: '650px',height:'400px'
//   });

// }

// confirmDialog(value): void {
//   const message = `Are you sure you want to delete this user detail?`;
//   let id =value
//   const dialogData = new ConfirmDialogModel("Confirm Action", message,id);

//   const dialogRef = this.dialog.open(UserConfirmboxComponent, {
//     maxWidth: "400px",
//     data: dialogData
//   });

//   dialogRef.afterClosed().subscribe(dialogResult => {
//     this.result = dialogResult;
//   });
// }

//   editDialog(value): void { 
//   const dialogRef = this.dialog.open(UserEditComponent, {
//     width: '600px',height:'500px',
//     data: value
//   });
// }

//  setPage(page: number) {
//       this.pager = this.pagerService.getPager(this.allItems, page,this.size);
//       this.start=this.pager.startIndex + 1;
//       this.end=this.pager.endIndex + 1;

//                 this.pageNumber=this.pager.startIndex;
//                 this.size=10;

//                        const httpOptions = {
//    headers: new HttpHeaders({
//      'Content-Type': 'application/json',
//      'Access-Control-Allow-Origin':'*'       
//    })
// };
// this.showloader=true;
//  this.http.post(this.getUsers,{fields : '*', offset:this.pageNumber,limit : this.size,token:'LIVESITE' },httpOptions)
//           .subscribe(res => {
//                this.showloader=false;
//               this.response=res
//              this.rows=this.response.data
//              this.data=this.rows.slice(0, 10);
//            this.dataSource.data=this.data
//              this.allItems = this.response.total_data;


//           });

//   }