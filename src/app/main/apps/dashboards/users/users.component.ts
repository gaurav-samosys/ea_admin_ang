import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserConfirmboxComponent, ConfirmDialogModel } from './user-confirmbox/user-confirmbox.component';
import { map } from 'rxjs/operators';
import { PagerService } from '../pager.service'


export interface PeriodicElement {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] =[]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  showLoader=false;
  data:any;
  response:any;
  result:any;
   getUsers=myGlobals.getUsers
    pageNumber:number=0;
    size:number=10;
    rows:any;
    start:any;
    end:any;
    // array of all items to be paged
    allItems: any;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
  displayedColumns: string[] = ['first_name', 'last_name', 'email','phone_no','status','action'];
dataSource = new MatTableDataSource<PeriodicElement>(this.data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService){

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };
  this.showLoader=true;
   this.http.post(this.getUsers,{fields : '*', offset:this.pageNumber, limit : this.size ,token:'LIVESITE'},httpOptions).subscribe(res => {
        this.showLoader=false;
         this.response=res
         this.data=this.response.data
       this.dataSource.data=this.data
      this.allItems = this.response.total_data;
               this.setPage(1);
          })

  }


    openDialog(value) {
    let dialog= this.dialog.open(ModalComponent,{
      data:value,
       width: '650px',height:'400px'
    });

  }

  confirmDialog(value): void {
    const message = `Are you sure you want to delete this user detail?`;
    let id =value
    const dialogData = new ConfirmDialogModel("Confirm Action", message,id);
 
    const dialogRef = this.dialog.open(UserConfirmboxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

    editDialog(value): void { 
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',height:'500px',
      data: value
    });
  }

   setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
        // get current page of items
        this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;

                  this.pageNumber=this.pager.startIndex;
                  this.size=10;

                         const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };
 this.showLoader=true;
   this.http.post(this.getUsers,{fields : '*', offset:this.pageNumber,limit : this.size,token:'LIVESITE' },httpOptions)
            .subscribe(res => {
                 this.showLoader=false;
                this.response=res
               this.rows=this.response.data
               this.data=this.rows.slice(0, 10);
             this.dataSource.data=this.data
               this.allItems = this.response.total_data;


            });
       
    }
}





