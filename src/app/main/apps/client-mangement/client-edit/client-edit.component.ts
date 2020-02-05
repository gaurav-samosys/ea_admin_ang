import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../../../global';
import { EditClientService } from './edit-client.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  providers: [DatePipe],
  /*  template : `
          <app-client-edit (notifyParent)="getNotification($event)"></app-client-edit> `*/
})
export class ClientEditComponent implements OnInit {
  // seasons: string[] = ['Credit Link', 'Free Link', 'Link from user',''];
  seasons: string[] = ['CreditView', 'Free Consumer Disclosure', 'Allow User'];

  rewards: string[]=['Yes','Specific Completions Only']
  // CreditView  Free Consumer Disclosure  Allow User
  /* getNotification(evt) {
 
     if ( ! evt) {
         return;
     }
     console.log(evt)
         // Do something with the notification (evt) sent by the child!
     }*/
     public buttonName: any = 'keyboard_arrow_down';
     public buttonName1: any = 'keyboard_arrow_down';

     public show: boolean = true;
     public show1: boolean = true;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  editclientForm: FormGroup;
  editClient = myGlobals.editClient;
  getClients = myGlobals.getClients;
  getCompanies = myGlobals.getCompanies;
  getClientVertical = myGlobals.getClientVertical;
  getPortalView = myGlobals.getPortalView;
  data: any;
  portal_data: any;
  client_data: any;
  common: any;
  client_id: any;
  company_id: any;
  companyData: any;
  vertical: any;
  status = true;
  portal: any;
  checkedstatus = false;
  checkedstatus1 = false;
  radioOptions: string = 'TEST1';
  isSpecial: any;
  showreward = 1;
  selectedd: any
  selected: any
  urls = [];
  imgURL: any;
  imgURLdrip: any;
  imgURLchallenge: any;
  //date ={startDate: moment, endDate: moment};
  check = 1;
  reward_check = 1;
  clientName
  reward_cycle = 1;
  formdata: any;
  reward_start: any;
  division = 1;
  clientedit_status: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private toastr: ToastrService,
    
    private datePipe: DatePipe, private _snackBar: MatSnackBar, private _Activatedroute: ActivatedRoute, private rt: Router, private _formBuilder: FormBuilder, public edit_service: EditClientService, private route: ActivatedRoute) {

    /*this.route.queryParams.subscribe(params => {
        this.data = JSON.parse(params["data"]);
        console.log(this.data)
        });*/
  }

  ngOnInit() {
    this.selectedd = JSON.stringify(1);
    this.getcompany();
    this.getVertical();
    this.getPortalview();
    this.client_id = this._Activatedroute.snapshot.paramMap.get("id");
    this.company_id = this._Activatedroute.snapshot.paramMap.get("id1");
    console.log(this.client_id, this.company_id)

    this.editclientForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      companyname: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      industry: ['', Validators.required],
      clientname: ['', Validators.required],
      clientvertical: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      portalview: [''],
      email: ['', Validators.required],
      clientcity: ['', Validators.required],
      phone: ['', Validators.required],
      useraccess: [''],
      min_passing_score: [''],
      allow_create_api: [''],
      credit_link: [''],
      free_link: [''],
      logo: [''],
      reward_type: [''],
      duration_drip: [''],
      reward_cycle: [''],
      specific_reward: [''],
      reward_completion: [''],
      compaign_cycle: [''],
      reward_start: [''],
      reward_type1: [''],
      reward_completion1: [''],
      email_remainder: [''],
      upload_file:[''],
      allow_unlock_bonus:'',emai_domain:'',
       allow_unlock:'' , allow_unlock_user:'', default_client_vertical:'' ,
       vimeo_id:'',
        portalviewdefault:'', defaultclientvertical:''

    })

    this.edit_service.Post(this.getClients, { id: this.client_id, company_id: this.company_id, token: "LIVESITE", fields: '*' }).subscribe(res => {
      this.common = res;
      this.clientName=this.common.data[0].client_name
      console.log(this.common.data[0].client_name,"=====================")
      this.client_data = this.common.data;
      this.portal_data = this.common.portalData
      console.log(this.portal_data)

      if (this.client_data[0].user_access == 'company_import') {
        this.check = 2;
      }
      else {
        this.check = 1;
      }



      if (this.client_data[0].portal_view == 1) {
        this.division = 1;
        this.editclientForm.patchValue({
          username: this.client_data[0].user_name,
          companyname: this.client_data[0].company_name,

          clientname: this.client_data[0].client_name,
          firstname: this.client_data[0].first_name,
          lastname: this.client_data[0].last_name,
          email: this.client_data[0].email,
          clientcity: this.data,
          phone: this.client_data[0].phone_no,
          useraccess: this.client_data[0].user_access,
          min_passing_score: this.client_data[0].min_passing_score,
          allow_create_api: this.client_data[0].allow_create_api,
          credit_link: this.client_data[0].credit_link,
          free_link: this.client_data[0].free_link,


        })
        this.editclientForm.controls['companyname'].setValue(this.company_id, { onlySelf: true });
        this.editclientForm.controls['clientvertical'].setValue(this.client_data[0].client_vertical_id, { onlySelf: true });
        this.editclientForm.controls['portalview'].setValue(this.client_data[0].portal_view, { onlySelf: true });
        this.getData(this.company_id)
      }
      else if (this.client_data[0].portal_view == 2) {
        this.division = 2;
        if (this.portal_data.drip_data[0].reward_all == 1) {
          this.reward_check = 1;
        }
        else {
          this.reward_check = 2;
        }


        if (this.portal_data.drip_data[0].reward_cycle_runs == 1) {
          this.reward_cycle = 1;
        }
        else {
          this.reward_cycle = 2;
        }

        if (this.portal_data.image_assoc.length > 0) {

          this.imgURL = 'https://staging.enrichedacademy.com/app/webroot/files/' + this.portal_data.image_assoc[0].image
          this.imgURLdrip = 'https://staging.enrichedacademy.com/app/webroot/files/' + this.portal_data.image_assoc[1].image
        }
        // this.clientName=this.client_data[0].client_name
        // console.log("this.clientName=============",this.clientName)
        this.editclientForm.patchValue({
          username: this.client_data[0].user_name,
          companyname: this.client_data[0].company_name,
          clientname: this.client_data[0].client_name,
          firstname: this.client_data[0].first_name,
          lastname: this.client_data[0].last_name,
          email: this.client_data[0].email,
          clientcity: this.data,
          phone: this.client_data[0].phone_no,
          useraccess: this.client_data[0].user_access,
          min_passing_score: this.client_data[0].min_passing_score,
          allow_create_api: this.client_data[0].allow_create_api,
          credit_link: this.client_data[0].credit_link,
          free_link: this.client_data[0].free_link,


        })

        this.editclientForm.controls['companyname'].setValue(this.company_id, { onlySelf: true });
        this.editclientForm.controls['clientvertical'].setValue(this.client_data[0].client_vertical_id, { onlySelf: true });
        this.editclientForm.controls['portalview'].setValue(this.client_data[0].portal_view, { onlySelf: true });
        this.editclientForm.controls['reward_type'].setValue(this.portal_data.drip_data[0].reward_type, { onlySelf: true });
        this.editclientForm.controls['duration_drip'].setValue(this.portal_data.drip_data[0].duration_of_drip, { onlySelf: true });
        this.editclientForm.controls['compaign_cycle'].setValue(this.portal_data.drip_data[0].drip_campaign_cycle, { onlySelf: true });
        this.getData(this.company_id)
      }

      else if (this.client_data[0].portal_view == 3) {
        this.division = 3;
        if (this.portal_data.challenge_data[0].reward_all == 1) {
          this.reward_check = 1;
        }
        else {
          this.reward_check = 2;
        }

        /*
            if(this.portal_data.challenge_data[0].reward_cycle_runs == 1)
            {
              this.reward_cycle =1;
            }
            else
            {
         this.reward_cycle =2;
            }*/
        if (this.portal_data.challenge_data[0].reward_all == 2) {
          this.showreward == 2;
          this.editclientForm.controls['specific_reward'].setValue(this.portal_data.challenge_data[0].reward_specific, { onlySelf: true });
        }

        if (this.portal_data.image_assoc.length > 0) {
          this.imgURL = 'https://staging.enrichedacademy.com/app/webroot/files/' + this.portal_data.image_assoc[0].image
          this.imgURLchallenge = 'https://staging.enrichedacademy.com/app/webroot/files/' + this.portal_data.image_assoc[1].image
        }
        // this.clientName=this.client_data[0].client_name
        // console.log("this.clientName=============",this.clientName)
        this.editclientForm.patchValue({
          username: this.client_data[0].user_name,
          companyname: this.client_data[0].company_name,

          clientname: this.client_data[0].client_name,
          firstname: this.client_data[0].first_name,
          lastname: this.client_data[0].last_name,
          email: this.client_data[0].email,
          clientcity: this.data,
          phone: this.client_data[0].phone_no,
          useraccess: this.client_data[0].user_access,
          min_passing_score: this.client_data[0].min_passing_score,
          allow_create_api: this.client_data[0].allow_create_api,
          credit_link: this.client_data[0].credit_link,
          free_link: this.client_data[0].free_link,


        })
        this.editclientForm.controls['companyname'].setValue(this.company_id, { onlySelf: true });
        this.editclientForm.controls['clientvertical'].setValue(this.client_data[0].client_vertical_id, { onlySelf: true });
        this.editclientForm.controls['portalview'].setValue(this.client_data[0].portal_view, { onlySelf: true });

        this.editclientForm.controls['reward_type1'].setValue(this.portal_data.challenge_data[0].reward_type, { onlySelf: true });
        this.editclientForm.controls['email_remainder'].setValue(this.portal_data.challenge_data[0].email_reminder_cycle, { onlySelf: true });
        this.selected = this.datePipe.transform(this.portal_data.challenge_data[0].reward_start_date, "MM/dd/yyyy") + "-" + this.datePipe.transform(this.portal_data.challenge_data[0].reward_end_date, "MM/dd/yyyy")
        /*    
            this.editclientForm.controls['duration_drip'].setValue(this.portal_data.drip_data[0].duration_of_drip, {onlySelf: true});
            this.editclientForm.controls['compaign_cycle'].setValue(this.portal_data.drip_data[0].drip_campaign_cycle, {onlySelf: true});*/
        this.getData(this.company_id)

      }




    })

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editclientForm.controls[controlName].hasError(errorName);
  }

  updateClient() {
    let reward_all: any, reward_type: any
    if (this.editclientForm.invalid) {
      return false;
    }
    if (this.division == 2) {
      reward_all = this.editclientForm.value.reward_completion,
        reward_type = this.editclientForm.value.reward_type
    }
    else if (this.division == 3) {
      reward_all = this.editclientForm.value.reward_completion1,
        reward_type = this.editclientForm.value.reward_type
    }
    this.formdata = {
      id: this.client_id,
      client_vertical: this.editclientForm.value.clientvertical,
      company_name: this.editclientForm.value.companyname,
      first_name: this.editclientForm.value.firstname,
      last_name: this.editclientForm.value.lastname,
      portal_view: this.editclientForm.value.portalview,
      user_access: this.editclientForm.value.useraccess,
      min_passing_score: this.editclientForm.value.min_passing_score,
      email: this.editclientForm.value.email,
      client_name: this.editclientForm.value.clientname,
      phone_no: this.editclientForm.value.phone,
      city: this.editclientForm.value.city,
      subdomain: this.editclientForm.value.companyname,
      allow_create_api: this.editclientForm.value.allow_create_api,
      credit_link: this.editclientForm.value.credit_link,
      free_link: this.editclientForm.value.free_link,
      token: "LIVESITE",
      logo: this.editclientForm.value.logo,
      upload_file: this.editclientForm.value.upload_file,



      reward_type: reward_type,

      duration_of_drip: this.editclientForm.value.duration_drip,
      reward_cycle_runs: this.editclientForm.value.reward_cycle,
      reward_all: reward_all,
      drip_campaign_cycle: this.editclientForm.value.compaign_cycle,

      specific_reward: this.editclientForm.value.specific_reward,
      reward_start_date: this.editclientForm.value.reward_start,
      reward_end_date: this.editclientForm.value.reward_end,
      email_reminder_cycle: this.editclientForm.value.email_remainder
    }
    this.edit_service.Post("http://192.168.0.126/enrichedacademy_live/api/admin/editClient", this.formdata).subscribe(res => {
      console.log(res)
      this.clientedit_status = this.common.success;
      this.toastr.success('Client update Successfully');

      localStorage.setItem('clientedit_status', this.clientedit_status)
      this.rt.navigate(['/apps/client-mangement/clients'])
    })
  }




  selectFile(event) {

    /*  this.files = value
      console.log(this.files)*/
    // var array = this.files.name.split('.');
    var pattern = /image-*/;

    if (!event.target.files[0].type.match(pattern)) {
      this.openaddSnackBar();
      this.clearFile();
      return false;
    }
    else {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgURL = reader.result
          this.editclientForm.get('logo').setValue({
            filename: file.name,
            filetype: file.type,
            filesize: file.size,
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
    this.editclientForm.get('logo').setValue(null);
    this.editclientForm.get('upload_file').setValue(null)

    this.fileInput.nativeElement.value = '';
  }

  getcompany() {
    this.edit_service.Post(this.getCompanies, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res;
        console.log(this.common)
        this.companyData = this.common.data;
      })
  }
  companyName
  getData(value) {
    this.edit_service.Post(this.getCompanies, { company_id: value, token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res;
        console.log("this common===========",this.common)
        this.data = this.common.data
        console.log("this data===========",this.data)
        this.companyName=this.data[0]['company_name']
        console.log("this data===========",this.companyName)

        this.editclientForm.patchValue({
          companyname:this.data[0].company_name,
          country: this.data[0].countries_name,
          state: this.data[0].state_name,
          city: this.data[0].city,
          industry: this.data[0].industries_name
        })
      })
  }

  getVertical() {
    this.edit_service.Post(this.getClientVertical, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res;
        this.vertical = this.common.data;
      })
  }

  getPortalview() {
    this.edit_service.Post(this.getPortalView, { token: 'LIVESITE' })
      .subscribe(res => {
        this.common = res;
        this.portal = this.common.data;
      })
  }

  credit_view(value) {
    console.log(value.checked)
    if (value.checked == true) {
      this.status = true;
    }
    else {
      this.status = false;
    }
  }



  /**
   * show hide button toggle
   */
  buttontoggle1() {
    this.show1 = !this.show1;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show1)
      this.buttonName1 = "keyboard_arrow_up";
    else
      this.buttonName1 = "keyboard_arrow_down";
  }

  /**
   * show hide button toggle
   */
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }



  portalChange(value) {
    console.log("check", value)
    if (value == 1) {
      this.division = 1;
    }
    else if (value == 2) {
      this.division = 2;
    }
    else if (value == 3) {
      this.division = 3;
    }

  }

  selectFile1(event) {
    let file, files, data = []
    var pattern = /image-*/;

    if (!event.target.files[0].type.match(pattern)) {
      this.openaddSnackBar();
      this.clearFile();
      return false;
    }
    else {
      let reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          let file1 = event.target.files[i];
          console.log(file1)
          let reader = new FileReader();
          /*  var reader = new FileReader();*/

          reader.onload = (event: any) => {
            this.imgURLdrip = reader.result
            let file, files = []
            console.log(event);
            file = {
              filename: file1.name,
              filetype: file1.type,
              filesize: file1.size,
              value: (event.target.result).toString().split(',')[1]
            }
            this.urls.push(file);
          }

          reader.readAsDataURL(event.target.files[i]);
        }
      }
      console.log("check", this.urls)
      this.editclientForm.get('upload_file').setValue(this.urls)
    }

  }




  
  rewardData(value) {
    this.editclientForm.patchValue({
      reward_type: value
    })
  }

  durationData(value) {
    this.editclientForm.patchValue({
      duration_drip: value
    })
  }
  compaignData(value) {
    console.log(value)
    this.editclientForm.patchValue({
      compaign_cycle: value
    })
  }


  Showreward(value) {
    if (value == 'yes') {
      this.showreward = 2

    }
    else {
      this.showreward = 1
    }
  }
  rewardData1(value) {
    this.editclientForm.patchValue({
      reward_type: value
    })
  }

  specificData(value) {
    alert(value)
    this.editclientForm.patchValue({
      specific_reward: value
    })
  }
  selectFile2(event) {
    let file, files, data = []
    var pattern = /image-*/;

    if (!event.target.files[0].type.match(pattern)) {
      this.openaddSnackBar();
      this.clearFile();
      return false;
    }
    else {
      let reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          let file1 = event.target.files[i];
          console.log(file1)
          let reader = new FileReader();
          /*  var reader = new FileReader();*/

          reader.onload = (event: any) => {
            this.imgURLchallenge = reader.result
            let file, files = []
            console.log(event);
            file = {
              filename: file1.name,
              filetype: file1.type,
              filesize: file1.size,
              value: (event.target.result).toString().split(',')[1]
            }
            this.urls.push(file);
          }

          reader.readAsDataURL(event.target.files[i]);
        }
      }
      console.log("check", this.urls)
      // this.editclientForm.get('upload_file').setValue(this.urls)
    }

  }
  remainderData(value) {
    alert(value)
    this.editclientForm.patchValue({
      email_remainder: value
    })
  }
  // /apps/client-mangement/client-detail/
  change(value) {

    this.editclientForm.patchValue({
      reward_start: this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00"),
      reward_end: this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")

    })
  }

}

