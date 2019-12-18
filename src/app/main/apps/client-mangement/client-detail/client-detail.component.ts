import { Component, OnInit,ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientDetailService } from './client-detail.service'
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { AdduserComponent } from 'app/main/apps/user-mangement/user/adduser/adduser.component';
import { UserEditComponent } from 'app/main/apps/user-mangement/user/user-edit/user-edit.component';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
    providers: [DatePipe]
})
export class ClientDetailComponent implements OnInit {
  division=1;
  public pageSize = 10;
public currentPage = 0;
public totalSize = 0;
      startIndex=1
      endIndex=10
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
client_data:any;
startDate1:Date;
endDate1:Date;
    // array of all items to be paged
    allItems: any;
    states:any;
    vertical:any;
    startDate:Date;
    endDate:Date;
    clientname:any;
    companyname:any;
    first_name:any;
    email:any;
    vertical1:any;
    portal:any;
    country1:any;
    state:any;
    city:any;
    status:any;
    sdate:any;
    edate:any;
     value='';
     name:any;
     id:any;
    // pager object
    pager: any = {};
    fullname:any;
    access_code:any;

    company:any;
    industry:any;
    client:any;
    emails:any;
    first:any;
    last:any;
    vertical2:any;
    portal1:any;
    phone:any;
    countrys:any;
    states1:any;
    city1:any;
    status1:any;
    industrys:any;

    // paged items
    pagedItems: any[];
   getClients=myGlobals.getClients;
   getIndustry=myGlobals.getIndustry;
   getCountry=myGlobals.getCountry;
   getStates=myGlobals.getState;
   getUsers=myGlobals.getUsers;
   getClientVertical=myGlobals.getClientVertical;
   statusChangeApiUser=myGlobals.statusChangeApiUser;
   clientActive=myGlobals.clientActive;
   displayedColumns: string[] = ['first_name', 'email','client_name','created_on','status','action'];
	dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private _Activatedroute:ActivatedRoute,private datePipe: DatePipe,private http: HttpClient,public dialog: MatDialog,public client_service:ClientDetailService) {

   }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.fetchCountry();
    this.getClient();
    this.ClientVertical();
    this.getIndustries();
    this.getUserData();
  }

  getClient(){
       this.client_service.Post(this.getClients,{id:this.id,fields:'*',token:'LIVESITE'}).subscribe(res => {
        this.common=res
        this.client_data=this.common.data;
        console.log(this.client_data)
               //this.setPage(1);

               this.company=this.client_data[0].company_name;
                this.client=this.client_data[0].client_name;
                this.emails=this.client_data[0].email;
                this.first=this.client_data[0].first_name;
                this.last=this.client_data[0].last_name;
                this.vertical2=this.client_data[0].client_vertical;
                this.portal1=this.client_data[0].name;
               this. phone=this.client_data[0].phone;
                this.countrys=this.client_data[0].country;
                this.states1=this.client_data[0].state_name;
                this.city1=this.client_data[0].city;
                this.industrys=this.client_data[0].industry;
    
    });
  }



getUserData()
{
   this.client_service.Post(this.getUsers,{clients:this.id,token:'LIVESITE',limit:this.pageSize,offset:this.pageNumber}).subscribe(res => {
        this.common=res
        this.data=this.common.data;
         this.allItems = this.common.total_data;
        console.log(this.data)
             this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;

      })
}




   public handlePage(e: any) {
    console.log(e)
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
    this.startIndex =(this.currentPage * e.pageSize)+1; 
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex ;
  if(this.value != '' )
  {
    console.log(this.value,this.name)
   this.Search(this.value,this.name)
  }
  else{
  this.iterator();

  }
}

private iterator() {
let part;

  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  this.pageNumber=start

        this.client_service.Post(this.getUsers,{clients:this.id,token:'LIVESITE',limit:this.pageSize,offset:this.pageNumber}).subscribe(res => {
        this.common=res
         this.allItems = this.common.total_data;
        //this.showloader=false;
        this.data=this.common.data;
       this.dataSource = this.data;

 })
}



getIndustries(){
 this.client_service.Post(this.getIndustry,{token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.industry=this.common.data;
   })
}



    changelimit(value)
  {
    this.size=parseInt(value);
     this.getClient();
  }

    fetchCountry(){


   this.client_service.Post(this.getCountry,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res
                this.country=this.common.data;

            })
}
     getState(value,name){
       this.country1='';
   this.state='';
   this.Search(value,name);
   this.client_service.Post(this.getStates,{countries_id:value,token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.states=this.common.data
   })
}

Edit(value){
  console.log(value)
this.client_service.editData(value)
}
ClientVertical(){
  this.client_service.Post(this.getClientVertical,{token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.vertical=this.common.data
   })
}

     addUser(){
          let dialog= this.dialog.open(AdduserComponent, {
      width: '600px',height:'400px'
    });
    }

        editDialog(value): void { 
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '600px',height:'500px',
      data: value
    });
  }


onChange(value,id){
  console.log(value,id)
   let status;
      if(value == false){
      status =0;
      }
      else{
        status =1;
      }
  this.client_service.Post(this.clientActive,{token:"LIVESITE",id:id, status:status}).subscribe(res=>{
    console.log(res)
  })
}

     Search(value,name){
     if(this.value != value)
    {
      this.currentPage=0;
    }
          this.value=value;
    this.name=name;
        if(value.length == 0 || value == '')
        {
            if(name == 'fullname'){
        this.fullname ='';
        }
        else if(name == 'email'){
          this.email =''
        }

          else if(name == 'email'){
          this.email =''
        }

          else if(name == 'clientname'){
          this.clientname =''
        }
            else if(name == 'companyname'){
          this.companyname =''
        }
            else if(name == 'country'){
          this.country1 =''
        }
            else if(name == 'state'){
          this.state =''

        }
            else if(name == 'city'){
          this.city =''
          
        }
             else if(name == 'status'){
          this.status =''
          
        }
             else if(name == 'access_code'){
          this.access_code =''
          
        }
              else if(name == 'start'){
          this.sdate =''
        }
            else if(name == 'end'){
          this.edate =''
        }
        }
      
        if(name == 'fullname'){
        this.fullname =value;
        }
        else if(name == 'email'){
          this.email =value
        }

          else if(name == 'email'){
          this.email =value
        }

          else if(name == 'clientname'){
          this.clientname =value
        }
            else if(name == 'companyname'){
          this.companyname =value
        }
            else if(name == 'country'){
          this.country1 =value
        }
            else if(name == 'state'){
          this.state =value

        }
            else if(name == 'city'){
          this.city =value
          
        }
             else if(name == 'status'){
          this.status =value
          
        }
             else if(name == 'access_code'){
          this.access_code =value
          
        }
              else if(name == 'start'){
          this.sdate =value
        }
            else if(name == 'end'){
          this.edate =value
        }
           const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  this.pageNumber=start
       this.client_service.Post(this.getUsers,{clients:this.id,full_name:this.fullname,client_name:this.clientname,company_name:this.companyname,country:this.country1,state:this.state,city:this.city,status:this.status,access_code:this.access_code,start_date:this.sdate,end_date:this.edate,offset:this.pageNumber,limit : this.size,token:'LIVESITE' })
            .subscribe(res => {
                this.common=res
                this.allItems=this.common.total_data;
               this.rows=this.common.data
               this.data=this.rows.slice(0, this.size);
             this.dataSource=this.data

            });
      }


        MyDate(newDate,name) {
    let date;
    if(name == 'start'){

    this.startDate = newDate;
    date=this.startDate
    }
     else if(name == 'end'){

    this.endDate = newDate;
    date=this.endDate
    }
   
    if(date != null){

     this.Search(this.datePipe.transform(date,"yyyy-MM-dd"),name);
    }
    else{
      this.Search(date ='',name)
    }
  }

  exportData()
  {
    
  }

  SwitchButton(value)
{
if(value == 1)
{
  this.division=1;
}
else if (value == 2) {
  this.division=2;
}
}

}

