import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatPaginator, MatDialog } from '@angular/material';
import { WebinarListService } from './webinar-list.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmBoxComponentComponent, ConfirmDialogModel} from '../confirm-box-component/confirm-box-component.component';
// import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';

@Component({
  selector: 'app-webinar-list',
  templateUrl: './webinar-list.component.html',
  styleUrls: ['./webinar-list.component.scss']
})
export class WebinarListComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  endIndex = 10
  data: any;
  value = '';
  get_webinars = myGlobals.get_webinars
  delete_webinar = myGlobals.delete_webinar
  displayedColumn:number=0

  pageNumber: number = 0;
  size: number = 10;


  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  displayedColumns: string[] = ['webinar_name', 'image', 'day', 'created_date', 'webinar_time', 'end_time', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  response: any;
  allItems: any;
  showloader = false
  webinarListForm: FormGroup
  constructor(public toastr: ToastrService,
    public dialog: MatDialog, public webinar_service: WebinarListService, private fb: FormBuilder) {
    this.webinarListForm = this.fb.group({
      webinar_name: ''
    })
  }

  ngOnInit() {
    this.getWebinarList()
  }

  /**
   * Button Toggle
   */
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }

  /**
    * Get list by using apicall
    */
  webinar_img
  getWebinarList() {
    this.showloader = true

    this.webinar_service.Post(this.get_webinars, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader = false
 

        // console.log("get_webinars list=============", this.response)
        this.data = this.response.data;
        // console.log(this.data)
        this.webinar_img = this.data['webinar_img']
        // console.log(this.webinar_img)
        this.dataSource = this.data;
        this.allItems = this.response.total_data;
        // console.log(this.allItems)
        this.dataSource = new MatTableDataSource(this.data);
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
  /**
    * Iterate 
    */
  private iterator() {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    // this.pageNumber = start
    this.showloader = true;
    this.webinar_service.Post(this.get_webinars, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader = false;
      this.data = this.response['data'];
      this.dataSource = this.data;

    })
  }
  sort_column
  ASC
  sort_order = "DESC";
  /**
    * sorting
    */
  updateSortingOrderWebinar(sort_column, sort_order) {
    this.showloader = true
    this.sort_column = sort_column
    this.ASC = sort_order
    this.webinar_service.Post(this.get_webinars,
      {
        column: this.sort_column, dir: this.ASC,  webinar_name: this.webinarName,
        offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
      }).subscribe(res => {
        this.response = res
        this.showloader = false

        this.dataSource = this.response.data
      });
  }
  /**
    * column toggle show hide
    * @param colName 
    * @param evt 
    */
  columnClick(value, colName: string, evt) {
    // console.log('-0-----', evt.target.checked)
    const colIndex = this.displayedColumns.findIndex(col => col === colName);
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
  }

  confirmDialog(id) {
    var id=id

       const message = `Are you sure you want to delete this webinar?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message, id);

    const dialogRef = this.dialog.open(ConfirmBoxComponentComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result==true){
            this.webinar_service.Post(this.delete_webinar, { webinar_id: id, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      if (this.response['status'] == 1) {
        this.toastr.success('Webinar Deleted Successfully')

      } else {
        this.toastr.warning('There Are some Issue')

      }
      this.getWebinarList()
    });
      }else{

      }
    });
  }

  rows: any;

  webinarName: string;
  name
  Search(value, name) {
    //  console.log(value,name)
    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;
    if (value.length == 0) {

      if (name == 'webinar_name') {
        this.webinarName = '';
      }
    }
    else {
      if (name == 'webinar_name') {
        this.webinarName = value;
      }
    }

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start

    this.showloader = true

    this.webinar_service.Post(this.get_webinars, {
      webinar_name: this.webinarName,

      offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
    })
      .subscribe(res => {
        this.showloader = false
        // console.log(res)
        this.response = res
        this.allItems = this.response['recordsTotal'];
        this.rows = this.response['data']
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data
      });
    // getWebinarList
    // console.log('value', value)

    // console.log('value', value.length)
    if (value.length == 0) {
      this.getWebinarList()
    }

  }
}

  //  var item={
  //   webinar_id : id,
  //    message : `Are you sure you want to delete this webinar?`

  //   }
    // console.log(id)
    // this.webinar_service.Post(this.delete_webinar, { webinar_id: id, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    //   // console.log(this.response)
    //   if (this.response['status'] == 1) {
    //     this.toastr.success('Webinar Deleted Successfully')

    //   } else {
    //     this.toastr.warning('There Are some Issue')

    //   }
    //   this.getWebinarList()
    // });