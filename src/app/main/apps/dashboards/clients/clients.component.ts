import { Component, OnInit,ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientsPopupComponent } from './clients-popup/clients-popup.component';
import { ConfirmBoxComponent, ConfirmDialogModel } from './confirm-box/confirm-box.component';
import { ClientEditComponent} from './client-edit/client-edit.component';
import { map } from 'rxjs/operators';
import { PagerService } from '../pager.service';

export interface PeriodicElement {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
	  data:any;
  response:any;
  html :  any ;
  result:any;
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
   getClients=myGlobals.getClients;
   displayedColumns: string[] = ['first_name', 'last_name', 'email','phone_no','status','action'];
	dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService) {

   }

  ngOnInit() {

    // this.http.get('getClients').subscribe(res=>{
    //   console.log(res);
    // })

  	 this.dataSource.paginator = this.paginator;
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };
   this.http.post(this.getClients,{fields : '*', offset:this.pageNumber,limit : this.size ,token:'LIVESITE'},httpOptions).subscribe(res => {
        this.response=res
        this.data=this.response.data;
        console.log(this.data)
       	this.dataSource.data=this.data;
          this.allItems = this.response.total_data;
               this.setPage(1);
    
    });
  }

     openDialog(value) {
    let dialog= this.dialog.open(ClientsPopupComponent,{
      data:value,
       width: '650px',height:'400px'
    });

  }

 confirmDialog(value): void {
    const message = `Are you sure you want to delete this user detail?`;
    let id =value
    const dialogData = new ConfirmDialogModel("Confirm Action", message,id);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

    editDialog(value): void { 
    const dialogRef = this.dialog.open(ClientEditComponent, {
      width: '600px',height:'500px',
      data: value
    });
  }

   setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
           this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;
        // get current page of items

                  this.pageNumber=this.pager.startIndex;
                  this.size=10;


                         const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'       
     })
  };
   this.http.post(this.getClients,{fields : '*', offset:this.pageNumber,limit : this.size ,token:'LIVESITE'},httpOptions)
            .subscribe(res => {
                this.response=res
               this.rows=this.response.data
               this.data=this.rows.slice(0, 10);
             this.dataSource.data=this.data
               this.allItems = this.response.total_data;


            });
       
    }

}


