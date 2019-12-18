import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { AddquizComponent } from './addquiz/addquiz.component';
import { EditquizComponent } from './editquiz/editquiz.component';
/*import { WatchvideoComponent } from './watchvideo/watchvideo.component';*/
import { QuizzeslistService } from './quizzeslist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmboxComponent, ConfirmDialogModel } from './confirmbox/confirmbox.component';


@Component({
  selector: 'app-quizzeslist',
  templateUrl: './quizzeslist.component.html',
  styleUrls: ['./quizzeslist.component.scss']
})
export class QuizzeslistComponent implements OnInit {
  displayedColumns: string[] = ['quiz_name', 'quiz_description', 'totalQuestions', 'passing_score', 'status', 'action', 'created'];
  getQuizzesListbyTopic = myGlobals.getQuizzesListbyTopic;
  quizActive = myGlobals.quizActive;
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  common: any;
  data: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1;
  endIndex = 10;
  value = '';
  name1: any;
  dataSource = new MatTableDataSource<any>(this.data);
  allItems: any;
  start: any;
  end: any;
  pager: any = {};
  vertical_id: any;
  // paged items
  pagedItems: any[];
  title: any;
  description: any;
  result: any;
  topic_id: any;
  name: any;
  names: any;
  datas: any[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public rt: Router, private _snackBar: MatSnackBar, private _Activatedroute: ActivatedRoute, private http: HttpClient, public dialog: MatDialog, private pagerService: PagerService, public quize_service: QuizzeslistService) {
    if (localStorage.getItem('addquiz_status') == 'true') {
      this.openaddSnackBar();
      localStorage.removeItem('addquiz_status');
    }
    else if (localStorage.getItem('addquiz_status') == 'false') {
      this.openadderrorSnackBar();
      localStorage.removeItem('addquiz_status');
    }
    else if (localStorage.getItem('editquiz_status') == 'true') {
      this.openeditSnackBar();
      localStorage.removeItem('editquiz_status');
    }
    else if (localStorage.getItem('editquiz_status') == 'false') {
      this.openediterrorSnackBar();
      localStorage.removeItem('editquiz_status');
    }

    else if (localStorage.getItem('deletequiz_status') == 'true') {
      this.opendeleteSnackBar();
      localStorage.removeItem('deletequiz_status');
    }
    else if (localStorage.getItem('deletequiz_status') == 'false') {
      this.opendeleteerrorSnackBar();
      localStorage.removeItem('deletequiz_status');
    }
  }

  ngOnInit() {
    this.name = localStorage.getItem('name')
    this.names = localStorage.getItem('names')
    this.topic_id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.topic_id)
    this.getQuizeList(this.topic_id)
  }

  getQuizeList(id) {
    this.quize_service.Post(this.getQuizzesListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.data = this.common.data
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      //this.setPage(1,id);
    })
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
      this.iterator(this.topic_id);

    }
  }

  private iterator(id) {
    let part;

    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    /* this.showloader=true;*/
    this.quize_service.Post(this.getQuizzesListbyTopic, { topic_id: id, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.data = this.common.data
      //this.showloader=false;
      this.dataSource = this.data;

    })
  }
  /*
    setPage(page: number,id) {
          // get pager object from service
          this.pager = this.pagerService.getPager(this.allItems, page,this.size);
          // get current page of items
        
          this.start=this.pager.startIndex + 1;
          this.end=this.pager.endIndex + 1;
  
                    this.pageNumber=this.pager.startIndex;
                   
  
     this.quize_service.Post(this.getQuizzesListbyTopic,{topic_id:id,offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
              .subscribe(res => {
                  this.common=res
                 this.rows=this.common.data
                 this.data=this.rows.slice(0, this.size);
                 console.log(this.data)
               this.dataSource.data=this.data;
               this.allItems = this.common.total_data;
  
  
              });
         
      }*/

  changelimit(value) {
    this.size = parseInt(value);
    this.getQuizeList(this.topic_id);
  }

  addQuiz() {
    let dialog = this.dialog.open(AddquizComponent, {
      data: this.topic_id,
      width: '650px', height: '500px'
    });
  }

  openDialog(value) {
    let dialog = this.dialog.open(EditquizComponent, {
      data: value,
      width: '650px', height: '500px'
    });

  }

  View(value) {
    localStorage.setItem('title', value.quiz_name)
    localStorage.setItem('data', JSON.stringify(value))

    this.rt.navigate(['/apps/vertical-management/showquiz', value.id, this.topic_id])
  }

  confirmDialog(value): void {
    const message = `Are you sure you want to delete this quiz?`;
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
  openaddSnackBar() {
    this._snackBar.open('Quiz added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openadderrorSnackBar() {
    this._snackBar.open('Quiz not added successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openeditSnackBar() {
    this._snackBar.open('Quiz updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openediterrorSnackBar() {
    this._snackBar.open('Quiz not updated successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  opendeleteSnackBar() {
    this._snackBar.open('Quiz delete successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  opendeleteerrorSnackBar() {
    this._snackBar.open('Quiz not delete successfully!!', 'End now', {
      duration: 4000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  Search(value) {
    this.value = value;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.quize_service.Post(this.getQuizzesListbyTopic, {
      topic_id: this.topic_id,
      quiz_name: value,
      offset: this.pageNumber,
      limit: this.pageSize,
      token: 'LIVESITE'
    }).subscribe(res => {
      this.common = res
      this.allItems = this.common.total_data;
      this.rows = this.common.data
      this.data = this.rows.slice(0, this.size);
      this.dataSource = this.data
    })
  }

  onChange(value, id) {
    console.log(value, id)
    let status;
    if (value == false) {
      status = 0;
    }
    else {
      status = 1;
    }
    this.quize_service.Post(this.quizActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
      console.log(res)
    })
  }

}
