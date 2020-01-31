import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatPaginator } from '@angular/material';
import { WebinarListService } from './webinar-list.service';
import * as myGlobals from '../../../../global';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  get_webinars=myGlobals.get_webinars
  delete_webinar=myGlobals.delete_webinar
 
  pageNumber: number = 0;
  size: number = 10;
  

  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  displayedColumns: string[] = ['webinar_name', 'image', 'day', 'date','start_time','end_time','action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  response: any;
  allItems: any;
  showloader=false
  webinarListForm:FormGroup
  constructor(public toastr: ToastrService,public webinar_service:WebinarListService,private fb :FormBuilder) { 
    this.webinarListForm=this.fb.group({
      webinar_name :''
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
    this.showloader=true

    this.webinar_service.Post(this.get_webinars, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader=false

      console.log("get_webinars list=============",this.response)
      this.data = this.response.data;
      console.log(this.data)
      this.webinar_img=this.data['webinar_img']
      console.log (this.webinar_img)
      this.dataSource = this.data;
      this.allItems = this.response.total_data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
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
      if (this.value != this.value) {
        this.currentPage = 0;
      }
      // console.log(this.value, this.name)
      // this.Search(this.value, this.name)
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
     this.showloader=true;
    // this.webinar_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      // this.response = res
      this.showloader=false;
      this.data = this.response.data;
      this.dataSource = this.data;

    // })
  }
  sort_column
  ASC
  sort_order = "DESC";
 /**
   * sorting
   */
  updateSortingOrderWebinar(sort_column, sort_order) {
    this.showloader=true
    this.sort_column = sort_column
    this.ASC = sort_order
    // this.webinar_service.Post(this.getClients, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    this.showloader=false

    //   this.dataSource=this.response.data
    // });
  }
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

  confirmDialog(id){
    var id=id
    console.log(id )
    this.webinar_service.Post(this.delete_webinar, {webinar_id:id,  token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      console.log(this.response )
      if(this.response['status']==1){
        this.toastr.success('Webinar Deleted Successfully')

      }else{
        this.toastr.warning('There Are some Issue')

      }
      this.getWebinarList()
    });
  }
}
