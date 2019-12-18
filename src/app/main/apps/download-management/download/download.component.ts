import { Component, OnInit,ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { DownloadService } from './download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
	displayedColumns: string[] = ['s_no', 'file_name','action'];
		  data:any;
  response:any;
  html :  any ;
  result:any;
   pageNumber:number=0;
    size:number=10;
    rows:any;
    start:any;
    end:any;
common:any;
country:any;
    // array of all items to be paged
    allItems: any;
    states:any;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
   uploadFileList=myGlobals.uploadFileList;
   uploadFile=myGlobals.uploadFile;
   dataSource = new MatTableDataSource<any>(this.data);

  constructor(private http: HttpClient,public dialog: MatDialog,private pagerService: PagerService,public download_service:DownloadService) {

   }

  ngOnInit() {
    this.fetchData();
  }

    fetchData()
    {
      this.download_service.Post(this.uploadFileList,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
               this.rows=this.common.data
               this.data=this.rows.slice(0, 10);
               console.log(this.common)
             this.dataSource.data=this.data
               this.allItems = this.data.length;
               this.setPage(1);

            });
    }

 setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page,this.size);
           this.start=this.pager.startIndex + 1;
        this.end=this.pager.endIndex + 1;
        // get current page of items

                  this.pageNumber=this.pager.startIndex;


   this.download_service.Post(this.uploadFileList,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
               this.rows=this.common.data
               this.data=this.rows.slice(0, this.size);
               console.log(this.data)
             this.dataSource.data=this.data
               this.allItems = this.data.length;
            });
       
    }

       changelimit(value)
  {
    this.size=parseInt(value);
    this.fetchData();
  }


selectFile(value)
{
console.log(value)
this.download_service.Post(this.uploadFile,{file:value,token:"LIVESITE"}).subscribe(res=>{
  console.log(res)
})
}


}
