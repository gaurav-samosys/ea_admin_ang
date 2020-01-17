import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatPaginator } from '@angular/material';
import { WebinarListService } from './webinar-list.service';

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

  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  displayedColumns: string[] = ['webinar_name', 'image', 'day', 'date','start_time','end_time','action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  response: any;
  allItems: any;

  constructor(public webinar_service:WebinarListService) { }

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
  getWebinarList() {
    // this.expert_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    //   console.log(this.response)
    //   this.data = this.response.data;
    //   console.log(this.data)
    //   this.dataSource = this.data;
    //   this.allItems = this.response.total_data;
    //   this.dataSource = new MatTableDataSource(this.data);
    //   this.dataSource.paginator = this.paginator;
    //   //this.setPage(1);

    // });
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
    //  this.showloader=true;
    // this.expert_service.Post(this.getClients, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      // this.response = res
      //this.showloader=false;
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
    this.sort_column = sort_column
    this.ASC = sort_order
    // this.expert_service.Post(this.getClients, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    //   this.dataSource=this.response.data
    // });
  }
 /**
   * column toggle show hide
   * @param colName 
   * @param evt 
   */
  columnClick(colName: string, evt) {
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

}