import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { ShowquizService } from './showquiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { QuestioneditComponent } from './questionedit/questionedit.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ConfirmboxComponent } from './confirmbox/confirmbox.component';
import { ConfirmDialogModel } from '../quizzeslist/confirmbox/confirmbox.component';
// import { ConfirmDialogModel, ConfirmboxComponent } from '../quizzeslist/confirmbox/confirmbox.component';

@Component({
  selector: 'app-showquiz',
  templateUrl: './showquiz.component.html',
  styleUrls: ['./showquiz.component.scss']
})
export class ShowquizComponent implements OnInit {
  displayedColumns: string[] = ['question', 'points', 'questionType', 'created', 'action'];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1;
  endIndex = 10;
  value = '';
  name1: any;
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
  topic_id: any;
  // array of all items to be paged
  allItems: any;
  states: any;
  dummy: any;
  // pager object
  pager: any = {};
  name: any;
  id: any;
  res_data: any;
  // paged items
  pagedItems: any[];
  sort_column
  ASC
  sort_order='DESC'
  getQuestionsList = myGlobals.getQuestionsList;
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  names: string;
  title: string;
  vertical_id: string;
  constructor(private location: Location,private _snackBar: MatSnackBar, public _formBuilder: FormBuilder, private _Activatedroute: ActivatedRoute, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, public show_service: ShowquizService) {
    this.res_data = JSON.parse(localStorage.getItem('data'));
    console.log(this.res_data)

    if (localStorage.getItem('questionadded_status') == 'true') {
      this.openquestionaddedSnackBar();
      localStorage.removeItem('questionadded_status');
    }
    else if (localStorage.getItem('questionadded_status') == 'false') {
      this.openquestionaddederrorSnackBar();
      localStorage.removeItem('questionadded_status');
    }
  }

  ngOnInit() {
    this.names = localStorage.getItem('names')
    this.name = localStorage.getItem('name')
    this.title = localStorage.getItem('title')
    this.vertical_id = localStorage.getItem('vertical_id')
    console.log(this.vertical_id)
    this.id = this._Activatedroute.snapshot.paramMap.get('id')
    this.topic_id = this._Activatedroute.snapshot.paramMap.get('topicid')
    console.log("id==",this.id,"name=====",this.name,"topic id===",this.topic_id,"vertical_id=====",this.vertical_id);
    this.getquestionList(this.id);

    this.dummy = this._formBuilder.group({
      category: [''],
      passing: [''],
      quiz: [''],
      desc: ['']
    })

    this.dummy.patchValue({
      category: localStorage.getItem('names'),
      passing: this.res_data.passing_score,
      quiz: this.res_data.quiz_name,
      desc: this.res_data.quiz_description,
    })

    this.dummy.controls['category'].disable();
    this.dummy.controls['passing'].disable();
    this.dummy.controls['quiz'].disable();
    this.dummy.controls['desc'].disable();

  }
  /**
   * back location
   */
  back(){
    this.location.back();
  }

  /**
   * 
   * @param id getQuetionList
   */
  getquestionList(id) {
    this.show_service.Post(this.getQuestionsList, { quiz_id: id, token: 'LIVESITE', start: this.pageNumber, length: this.pageSize })
      .subscribe(res => {
        this.common = res
        this.data = this.common.data
        this.allItems = this.common.total_data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        //this.setPage(1,id);
      });
  }

  public handlePage(e: any) {
    console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex;
    if (this.value != '') {
      this.Search(this.value)
    }
    else {
      this.iterator(this.id);

    }
  }

  private iterator(id) {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    /* this.showloader=true;*/
    this.show_service.Post(this.getQuestionsList, { quiz_id: id, token: 'LIVESITE', offset: this.pageNumber, limit: this.pageSize }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.data = this.common.data
      //this.showloader=false;
      this.dataSource = this.data;

    })
  }

/**
 * snackbar
 */
  openquestionaddedSnackBar() {
    this._snackBar.open('Question added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openquestionaddederrorSnackBar() {
    this._snackBar.open('Question not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /* setPage(page: number,id) {
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems, page,this.size);
             this.start=this.pager.startIndex + 1;
          this.end=this.pager.endIndex + 1;
          // get current page of items
  
                    this.pageNumber=this.pager.startIndex;
  
  
     this.show_service.Post(this.getQuestionsList,{quiz_id:id,token:'LIVESITE'})
              .subscribe(res => {
                  this.common=res
                 this.rows=this.common.data
                 this.data=this.rows.slice(0, this.size);
                 console.log(this.data)
               this.dataSource.data=this.data
                 this.allItems = this.common.total_data;
              });
         
      }*/

      /**
       * 
       * @param value change limit
       */
  changelimit(value) {
    this.size = parseInt(value);
    this.getquestionList(this.id);
  }

  /**
   * Add question Dialog
   */
  addQuestion() {
    let value = { quiz_id: this.id, topic_id: this.topic_id }
    let dialog = this.dialog.open(AddquestionComponent, {
      data: value,
      width: '600px', height: '550px'
    });
  }

  /**
   * 
   * @param value search bar
   */
  Search(value) {
    this.value = value;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.show_service.Post(this.getQuestionsList, {
      quiz_id: this.id,
      token: 'LIVESITE',
      offset: this.pageNumber,
      limit: this.pageSize,
      question: value
    }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.rows = this.common.data
      this.data = this.rows.slice(0, this.size);
      this.dataSource = this.data
    })
  }

  /**
   * 
   * @param element edit dialog open
   */
  openDialog(element) {
    //let value={quiz_id:this.id,topic_id:this.topic_id}
    let dialog = this.dialog.open(QuestioneditComponent, {
      data: element,
      width: '550px', height: '550px'
    });
  }
/**
  * table sort
  * @param sort_column 
  * @param sort_order 
  */
 updateSortingOrderVerical(sort_column,sort_order){
  this.sort_column = sort_column
  this.ASC = sort_order
  // this.manage_service.Post(this.getVerticalDataList, {column:this.sort_column,dir:this.ASC, vertical_id:this.id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
  //   this.common = res
  //   this.dataSource=this.common.data
  // });
}

 /**
    * Confirm Dialog For Delete
    */
   confirmDialog(value): void {
    const message = `Are you sure you want to delete this showquiz?`;
    let data = value
    const dialogData = new ConfirmDialogModel("Confirm Action", message, data);

    const dialogRef = this.dialog.open(ConfirmboxComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
}
