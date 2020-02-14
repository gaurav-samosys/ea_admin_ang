import { Component, OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../../../../global';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { PagerService } from '../pager.service';
import { CompanyDetailService } from './company-detail.service';
import { Router,ActivatedRoute } from '@angular/router';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';

 
@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
   providers: [DatePipe]
})
export class CompanyDetailComponent implements OnInit {
  division=1;
	 data:any;
  response:any;
  html :  any ;
  result:any;
   pageNumber:number=0;
    size:number=10;
    rows:any;
    start:any;
    end:any;
    first_name1:any;
    vertical:any;
    startDate1:Date;
    endDate1:Date;
    country:any;
     startDate: Date;
     endDate: Date;
    // array of all items to be paged
    allItems: any;
    common:any;
    // pager object
    pager: any = {};
    states:any;
    industry:any;
     status:any;

     status1:any;
     industry1:any;
     company:any;
     fullname:any;
     email:any;
     city:any
     sdate:any;
     edate:any;
     country1:any;
     state1:any;
     showloader=false;
     value='';
     name:any;
     id:any;
     clientname:any;
    companyname:any;
    vertical1:any;
    portal:any;
    state:any;
    // paged items
    pagedItems: any[];
   getClients=myGlobals.getClients;
   getClientVertical=myGlobals.getClientVertical;
     getCountry=myGlobals.getCountry;
      getStates=myGlobals.getState;
      getIndustry=myGlobals.getIndustry;
      companyActive=myGlobals.companyActive;
      public pageSize = 10;
public currentPage = 0;
public totalSize = 0;
      startIndex=1
      endIndex=10
      company_name:any;
      first_name:any;
      last_name:any;
      emails:any;
      phone:any;
      sort_column
      // sort_column = "date_created";
      sort_order = "DESC";
      ASC;
      
      industrys:any;
  displayedColumns: string[] = ['client_name', 'client_vertical', 'name','created_on','status','total_user','action'];
	dataSource = new MatTableDataSource<any>(this.data);
   horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  client_name: any;
  client_Name: any;
  detail_id: any;
   constructor(private _Activatedroute:ActivatedRoute,
    private datePipe: DatePipe,
    public route:ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private pagerService: PagerService,
    public companyService:CompanyDetailService) {

     
   }
   sub
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
// console.log(this.id)
      // In a real app: dispatch action to load the details here.
   });
   
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    // console.log(this.id)
  	this.getIndustries();
  	this.getData();
    this.ClientVertical();
    this.getCountryList();
    this.getStatesList()
  }

  /**get company list */
  getCountryList(){
    this.companyService.Post(this.getCountry,{token:'LIVESITE'}).subscribe(res=>{
      this.common=res['data']
      this.country=this.common
      // console.log(this.common,this.country)
    });
      
  }

  /**
   * get states list
   */
  getStatesList(){
    this.companyService.Post(this.getStates,{token:'LIVESITE'}).subscribe(res=>{
      this.common=res['data']
      this.states=this.common
      // console.log(this.common,this.states)
    });
  }
  confirmDialog(id){
    console.log(id)
  }
  /**
     * Edit client
     */
    // [routerLink]="['/apps/client-mangement/client-edit', element.id,element.company_id]" 
    editClient(id){
      console.log(id)
   }
  /**
   * get data based on company
   */
  getData()
  {
    this.showloader=true
     this.companyService.Post(this.getClients,
      {company_id:this.id,fields:'*',token:'LIVESITE'}).subscribe(res=>{
     this.common=res
console.log( this.common)
     this.showloader=false

     this.allItems = this.common.total_data;
     this.data=this.common.data;
     console.log(this.data,"table=============data")
     this.client_name=this.data[0].client_name;
     this.company_name=this.data[0].company_name;
    //  console.log(this.company_name)
     localStorage.setItem('comp_name', this.data[0].company_name.replace(/ /g, "_"));
    
     this.detail_id = this.data[0]['id']
      this.client_Name = this.data[0]['client_name'].replace(/ /g, "_");
      // console.log(this.client_Name,this.detail_id,"================");
      this.first_name=this.data[0].first_name;
      this.last_name=this.data[0].last_name;
      this.emails=this.data[0].email;
      this.phone=this.data[0].phone;
      this.industrys=this.data[0].industry;
          this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
 })
  }

  public handlePage(e: any) {
    // console.log(e)
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
    this.startIndex =(this.currentPage * e.pageSize)+1; 
    this.endIndex = this.startIndex < e.length ? Math.min(this.startIndex + e.pageSize, e.length) : this.startIndex ;
  if(this.value != '')
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
  this.showloader=true

        this.companyService.Post(this.getClients,{company_id:this.id,fields:'*',token:'LIVESITE'}).subscribe(res => {
        this.common=res
        this.showloader=false

         this.allItems = this.common.total_data;
        this.data=this.common.data;
       this.dataSource = this.data;

 })
}

  /**===========================================================
        sorting using Assending and dissending order
  ===========================================================*/

  updateSortingOrderCompany(sort_column, sort_order) {
    this.showloader=true

    this.sort_column = sort_column
    this.ASC = sort_order
    // this.companyService.Post(this.getCompanies, {column:this.sort_column,dir:this.ASC, offset: this.pageNumber, limit: this.pageSize, token: 'LIVESITE' }).subscribe(res => {
    //   this.response = res
    this.showloader=false

    //   console.log(this.response.data)
    //   this.dataSource=this.response.data
    // })
  }
 /**===========================================================
           on selction change status 
     ===========================================================*/
     onChange(value, id) {
      // console.log(value, id)
      let status;
      if (value == false) {
        status = 0;
        this.toastr.success('Status Inactive Successfully');
      }
      else {
        status = 1;
        this.toastr.success('Status Active Successfully');
  
      }
      this.companyService.Post(this.companyActive, { token: "LIVESITE", id: id, status: status }).subscribe(res => {
        // console.log(res)
      })
    }

    
 /**===========================================================
          Export data and download
  ===========================================================*/
  // exportData() {
  //   this.companyService.Post(this.exportManageCompanies, {
  //     company_name: this.company ? this.company : '',
  //     full_name: this.fullname ? this.fullname : '',
  //     user_email: this.email ? this.email : '',
  //     country: this.country1 ? this.country1 : '',
  //     state: this.state1 ? this.state1 : '',
  //     city: this.city ? this.city : '',
  //     industry: this.industry1 ? this.industry1 : '',
  //     start_date: this.sdate ? this.sdate : '',
  //     end_date: this.edate ? this.edate : '',
  //     user_type: '',
  //     status_check: '',
  //     excel: '',
  //     pdf: '',
  //     search_keyword: '',
  //     token: 'LIVESITE'
  //   })
  //     .subscribe(res => {
  //       console.log(res)
  //       if (res['success'] == true) {
  //         console.log(this.data)
  //         this.companyService.exportAsExcelFile(this.data, 'sample');
  //       }

  //     })

  // }

  /**
   * get industry
   */
getIndustries(){
 this.companyService.Post(this.getIndustry,{token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.industry=this.common.data;
   })
}

/**
 * 
 * @param value change button company detail and company search
 */
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

/**
 * 
 * @param value search
 * @param name 
 */
  Search(value,name){
     if(this.value != value)
    {
      this.currentPage=0;
    }
     this.value=value;
    this.name=name;

        if(value.length == 0)
        {
              if(name == 'client'){
        this.clientname ='';
        }
        else if(name == 'company'){
          this.companyname =''
        }

          else if(name == 'fname'){
          this.first_name1 =''
        }

          else if(name == 'email'){
          this.email =''
        }
            else if(name == 'vertical'){
          this.vertical1 =''
        }
            else if(name == 'portal'){
          this.portal =''
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
            else if(name == 'start'){
          this.sdate =''
          
         }
            else if(name == 'end'){
          this.edate =''
          
         }
        }

        else
        {


            if(name == 'client'){
        this.clientname =value;
        }
        else if(name == 'company'){
          this.companyname =value
        }

          else if(name == 'fname'){
          this.first_name1 =value
        }

          else if(name == 'email'){
          this.email =value
        }
            else if(name == 'vertical'){
          this.vertical1 =value
        }
            else if(name == 'portal'){
          this.portal =value
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
            else if(name == 'start'){
          this.sdate =value
          
         }
            else if(name == 'end'){
          this.edate =value
          
         }

      }
      const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  this.pageNumber=start
  this.showloader=true

   this.companyService.Post(this.getClients,{company_id:this.id,company_name:this.companyname,
    client_name:this.clientname,first_name:this.first_name,
    email : this.email,client_vertical:this.vertical1,portal_name:this.portal,city:this.city,
    start_date:this.sdate,end_date:this.edate,status:this.status,country:this.country1,
    state:this.state, offset:this.pageNumber,limit : this.pageSize ,token:'LIVESITE'})
            .subscribe(res => {
              this.showloader=false

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

/**
 * client vertical
 */
  ClientVertical(){
  this.companyService.Post(this.getClientVertical,{token:'LIVESITE'}).subscribe(res=>{
     this.common=res
     this.vertical=this.common.data
   })
}

}
