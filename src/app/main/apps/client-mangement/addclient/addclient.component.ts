import { Component, OnInit , ElementRef, ViewChild,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddclientService } from './addclient.service';
import * as myGlobals from '../../../../global';
import { DatePipe } from '@angular/common';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss'],
  providers: [DatePipe],
/*  template:'<button (click)="sendNotification()">Notify my parent!</button>'*/
})
export class AddclientComponent implements OnInit {

/* @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    sendNotification() {
        this.notifyParent.emit('Some value to send to the parent');
    }*/

   @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
    Counters = 0;
addclientForm:FormGroup;
division=1;
getPortalView=myGlobals.getPortalView;
portal:any;
 addClients=myGlobals.addClient;
    getCompanies=myGlobals.getCompanies;
      getClientVertical=myGlobals.getClientVertical;
       urls = [];
       showreward=1;
 common:any;
 companyData:any;
 data:any;
 vertical:any;
 selected ={startDate: moment, endDate: moment};
 status=false;
 formdata:any;
 clientadded_status:any;
 reward_start:any;
 imgURL:any;
 imgURLdrip:any;
 imgURLchallenge:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private sanitizer:DomSanitizer,private datePipe: DatePipe,private _snackBar: MatSnackBar,private rt:Router,private _formBuilder: FormBuilder,public addclient_service:AddclientService) { }
  
  transform(image) {
    return this.sanitizer.bypassSecurityTrustHtml(image);
  }
  
  ngOnInit() {
    this.getcompany();
    this.getVertical();
    this.getPortalview();
  	this.addclientForm=this._formBuilder.group({

  		companyname:['',Validators.required],
  		country:['',Validators.required],
  		state:['',Validators.required],
  		city:['',Validators.required],
  		industry:['',Validators.required],
  		clientname:['',Validators.required],
  		clientvertical:['',Validators.required],
  		firstname:['',Validators.required],
  		lastname:['',Validators.required],
  		portalview:['',Validators.required],
  		email:['',Validators.required],
  		clientcity:['',Validators.required],
  		phone:['',Validators.required],
  		useraccess:[''],
  		min_passing_score:[''],
  		allow_create_api:[''],
  		credit_link:[''],
  		free_link:[''],
      logo:[''],
      reward_type:[''],
      duration_drip:[''],
      reward_cycle:[''],
      reward_completion:[''],
      specific_reward:[''],
      compaign_cycle:[''],
      reward_start:[''],
      reward_end:[''],
      reward_type1:[''],
      reward_completion1:[''],
      email_remainder:[''],
      upload_file:['']


  	})
    this.addclientForm.patchValue({
      free_link:'https://secure-ocs.transunion.ca/secureocs/credit-agree.html'
    })
  }

        public hasError = (controlName: string, errorName: string) =>{
    return this.addclientForm.controls[controlName].hasError(errorName);
  }

  credit_view(value)
  {
    if(value.checked == true){
      this.status = true;
    }
    else{
      this.status = false;
    }
  }



  addClient(){
    let reward_all:any,reward_type:any
    console.log(this.addclientForm.value)
    if(this.addclientForm.invalid)
    {
      return false;
    }

    if(this.division == 2)
    {
     reward_all =this.addclientForm.value.reward_completion,
     reward_type=this.addclientForm.value.reward_type
    }
    else if(this.division == 3)
    {
       reward_all =this.addclientForm.value.reward_completion1,
        reward_type=this.addclientForm.value.reward_type
    }
      this.formdata={
    clientvertical:this.addclientForm.value.clientvertical,
    company_id:this.addclientForm.value.companyname,
   first_name:this.addclientForm.value.firstname ,
   last_name:this.addclientForm.value.lastname ,
   portal_view:this.addclientForm.value.portalview ,
   user_access:this.addclientForm.value.useraccess ,
   min_passing_score:this.addclientForm.value.min_passing_score ,
   email:this.addclientForm.value.email ,
   client_name:this.addclientForm.value.clientname  ,
   phone:this.addclientForm.value.phone ,
   city:this.addclientForm.value.city ,
   subdomain:this.addclientForm.value.companyname ,
   allow_create_api:this.addclientForm.value.allow_create_api,
  show_transunion_button:this.addclientForm.value.companyname ,
  credit_link:this.addclientForm.value.credit_link ,
  free_link:this.addclientForm.value.free_link , 
  token:"LIVESITE",
  logo:this.addclientForm.value.logo,

  upload_file: this.addclientForm.value.upload_file,
  reward_type: reward_type,
  duration_of_drip: this.addclientForm.value.duration_drip,
  reward_cycle_runs: this.addclientForm.value.reward_cycle,

  reward_all: reward_all,

  drip_campaign_cycle: this.addclientForm.value.compaign_cycle,
  specific_reward:this.addclientForm.value.specific_reward,
  reward_start_date:this.addclientForm.value.reward_start,
  reward_end_date:this.addclientForm.value.reward_end,
  email_reminder_cycle:this.addclientForm.value.email_remainder
  }

/*  clientvertical:1
company_id:148
first_name:test
last_name:test
portal_view:3
user_access:1
min_passing_score:0
email:testTypeTEST11@enrichedacademy.com
client_name:test
phone:9826187483
city:indore
subdomain:testType@asda.com
allow_create_api:0
show_transunion_button:1
credit_link:test aldas
free_link:asdas asdasd
token:LIVESITE

reward_type:single_reward_program
duration_of_drip:9
reward_cycle_runs:yes
reward_all:specific_completions
drip_campaign_cycle:weekly
reward_start_date:2019-08-22
reward_end_date:2019-08-22
specific_reward:10
email_reminder_cycle:monthly*/
  console.log(this.formdata)
  this.addclient_service.Post(this.addClients,this.formdata).subscribe(res=>{
    this.common=res
    console.log(this.common)
         this.clientadded_status=this.common.success;
         localStorage.setItem('clientadded_status',this.clientadded_status)
         this.rt.navigate(['/apps/client-mangement/clients'])
  })
  }

    selectFile(event)
    {
       
    var pattern = /image-*/;

        if (!event.target.files[0].type.match(pattern)){
    this.openaddSnackBar();
    this.clearFile();
      return false;
    }
    else{
       let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
       this.imgURL= reader.result
        this.addclientForm.get('logo').setValue({
          filename: file.name,
          filetype: file.type,
          filesize:file.size,
          value: (reader.result).toString().split(',')[1]
        })
      };
    }

    }
    }
    openaddSnackBar() {
    this._snackBar.open('Please select image in png,jpg or gif format !!', 'End now', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

    clearFile() {
    this.addclientForm.get('logo').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  getVertical(){
     this.addclient_service.Post(this.getClientVertical,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res;
                this.vertical=this.common.data;
              })
  }

  getcompany()
  {
      this.addclient_service.Post(this.getCompanies,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res;
                console.log(this.common)
                this.companyData=this.common.data;
              })
  }

  getData(value){
      this.addclient_service.Post(this.getCompanies,{company_id:value,token:'LIVESITE'})
            .subscribe(res => {
                this.common=res;
                console.log(this.common)
                this.data=this.common.data
               this.addclientForm.patchValue({
                  country:this.data[0].countries_name,
                  state:this.data[0].state_name,
                  city:this.data[0].city,
                  industry:this.data[0].industries_name
               })
              })
  }

      getPortalview(){
     this.addclient_service.Post(this.getPortalView,{token:'LIVESITE'})
            .subscribe(res => {
                this.common=res;
                this.portal=this.common.data;
              })
  }


  portalChange(value)
  {
    console.log("check",value)
    if(value == 1){
   this.division=1;
  }
     else if(value == 2)
     {
        this.division=2;
     }
       else if(value == 3)
     {
        this.division=3;
     }
  
  }

    selectFile1(event)
  {
     let file,files,data=[]
     var pattern = /image-*/;

        if (!event.target.files[0].type.match(pattern)){
    this.openaddSnackBar();
    this.clearFile();
      return false;
    }
    else{
       let reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          let file1 = event.target.files[i];
          console.log(file1)
          let reader = new FileReader();
              /*  var reader = new FileReader();*/

                reader.onload = (event:any) => {
                   this.imgURLdrip= reader.result
                  let file, files=[]
                  console.log(event);
                  file={ 
                 filename: file1.name,
                filetype: file1.type,
                filesize:file1.size,
                value: (event.target.result).toString().split(',')[1]
                  }
                   this.urls.push(file); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
    console.log("check",this.urls)
    this.addclientForm.get('upload_file').setValue(this.urls)
    }

  } 
    rewardData(value)
  {
  this.addclientForm.patchValue({
    reward_type:value
  })
  }

  durationData(value)
  {
  this.addclientForm.patchValue({
    duration_drip:value
  })
  }
  compaignData(value)
  {
     this.addclientForm.patchValue({
    compaign_cycle:value
  })
    
  } 
  Showreward(value)
  {
    if(value == 'yes')
    {
   this.showreward=2

    }
    else
    {
    this.showreward=1
    }
  }
  rewardData1(value)
  {
    this.addclientForm.patchValue({
    reward_type:value
  })
  } 

  specificData(value)
  {
    this.addclientForm.patchValue({
      specific_reward:value
    })
  } 
  selectFile2(event)
  {
         let file,files,data=[]
     var pattern = /image-*/;

        if (!event.target.files[0].type.match(pattern)){
    this.openaddSnackBar();
    this.clearFile();
      return false;
    }
    else{
       let reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          let file1 = event.target.files[i];
          console.log(file1)
          let reader = new FileReader();
              /*  var reader = new FileReader();*/

                reader.onload = (event:any) => {
                  this.imgURLchallenge=reader.result
                  let file, files=[]
                  console.log(event);
                  file={ 
                 filename: file1.name,
                filetype: file1.type,
                filesize:file1.size,
                value: (event.target.result).toString().split(',')[1]
                  }
                   this.urls.push(file); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
    console.log("check",this.urls)
    this.addclientForm.get('upload_file').setValue(this.urls)
    }

  } 
  remainderData(value)
  {
    this.addclientForm.patchValue({
      email_remainder:value
    })
  }

  change(value)
  {

  this.addclientForm.patchValue({
   reward_start:this.datePipe.transform(value.startDate,"yyyy-MM-dd 00-00-00"),
   reward_end:this.datePipe.transform(value.endDate,"yyyy-MM-dd HH-mm-ss")

  })
  }


}
