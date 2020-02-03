import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatPaginator } from '@angular/material';
import { ExpertInterviewService } from '../expert-interview.service';
import * as myGlobals from '../../../../global';
import { EmbedVideoService } from 'ngx-embed-video';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-expert-interview',
  templateUrl: './expert-interview.component.html',
  styleUrls: ['./expert-interview.component.scss']
})
export class ExpertInterviewComponent implements OnInit {
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  endIndex = 10
  data: any;
  size: number = 10;

  value = '';
  pageNumber: any;
  vimeoUrl
  rows: any;

  showloader = false
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  displayedColumns: string[] = ['title', 'video', 'create_date', 'action'];
  dataSource = new MatTableDataSource<any>(this.data);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  response: any;
  allItems: any;
  expert_interview = myGlobals.expert_interview
  delete_expert_interview_video = myGlobals.delete_expert_interview_video
  expertInterview:FormGroup
  constructor(public toastr: ToastrService,
    private embedService: EmbedVideoService,
    public expert_service: ExpertInterviewService,private fb:FormBuilder,
    public router: Router) {
      this.expertInterview=this.fb.group({
  title:['']
      })
  }

  ngOnInit() {
    this.getExpertInterView()
  }

  /**
   * button toggle show hide
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
   * get Expert list
   * 
   */
  getExpertInterView() {
    this.showloader = true
    this.expert_service.Post(this.expert_interview, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false

      this.response = res
      console.log(this.response)
      var video = res['data']
      for (let index = 0; index < video.length; index++) {
        const video_id = video[index].video_id;
        console.log(video_id)

        // this.vimeoUrl = "https://vimeo.com/197933516";
      }
      this.data = this.response.data;
      console.log(this.data)
      this.dataSource = this.data;
      this.allItems = this.response.total_data;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      //this.setPage(1);

    });
  }

  /**
   * 
   * @param e pagination
   */
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

  private iterator() {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;
    this.expert_service.Post(this.expert_interview, { offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      this.showloader = false;
      this.data = this.response.data;
      this.dataSource = this.data;

    })
  }
  
  titleName: string;
  name
  Search(value, name) {
    //  console.log(value,name)
    if (this.value != value) {
      this.currentPage = 0;
    }
    this.value = value;
    this.name = name;
    if (value.length == 0) {

      if (name == 'title') {
        this.titleName = '';
      }
    }
    else {
      if (name == 'title') {
        this.titleName = value;
      }
    }

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start

    this.showloader=true

    this.expert_service.Post(this.expert_interview, {
      title: this.titleName, 
  
      offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE'
    })
      .subscribe(res => {
    this.showloader=false
    // console.log(res)
        this.response = res
        this.allItems = this.response['recordsTotal'];
        this.rows = this.response['data']
        this.data = this.rows.slice(0, this.size);
        this.dataSource = this.data
      });
  }
  /**
   * sorting order
   */
  sort_column
  ASC
  sort_order = "DESC";

  updateSortingOrderInterview(sort_column, sort_order) {
    this.showloader = true

    this.sort_column = sort_column
    this.ASC = sort_order
    this.expert_service.Post(this.expert_interview, { column: this.sort_column, dir: this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.showloader = false

      this.response = res
      this.dataSource = this.response.data
    });
  }
  /**
    * column toggle show hide
    * @param colName 
    * @param evt 
    */
  columnClick(value, colName: string, evt) {
    console.log('-0-----', evt.target.checked)
    const colIndex = this.displayedColumns.findIndex(col => col === colName);
    if (evt.target.checked == false) {
      this.displayedColumns.splice(colIndex, 1);
    } else {
      // this.displayedColumns.push(colName);
      this.displayedColumns.splice(value, 0, colName)

    }
  }

  /**
   * 
   * @param id confirm dialog box
   */
  confirmDialog(id) {
    this.expert_service.Post(this.delete_expert_interview_video, { id: id, token: 'LIVESITE' }).subscribe(res => {
      console.log(res)
      this.getExpertInterView()
      if (res['status'] == '1') {
        this.toastr.success('Expert Record Delete Successfully')
        // this.router.navigate(['/apps/expert_interview'])
      } else {
        this.toastr.warning('There Are some Issue')
      }
    })
  }


  /**
   * 
   * @param element edit expert interview 
   */
  EditExpertInterview(element) {
    console.log(element)
    var id = element.id
    console.log(id)
    this.router.navigate(['/apps/add_expert_interview', id]);

  }
}


  // if (colIndex > 0) {
    //   // column is currently shown in the table, so we remove it
    //   this.displayedColumns.splice(colIndex, 1);
    // } else {
    //   // column is not in the table, so we add it
    //   this.displayedColumns.push(colName);
    // }