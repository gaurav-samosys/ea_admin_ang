import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddWebinarService } from './add-webinar.service';
import { ToastrService } from 'ngx-toastr';
declare var moment: any
import * as myGlobals from '../../../../global';

@Component({
  selector: 'app-add-webinar',
  templateUrl: './add-webinar.component.html',
  styleUrls: ['./add-webinar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWebinarComponent implements OnInit {
  AddWebinarForm: FormGroup
  name: number = 0
  add_button: number = 0
  hide: number = 0
  message: number = 1
  currentDate
  message1 = 'this is field required'
  prodId
  // update_webinar = myGlobals.update_webinar
  getwebinarById = myGlobals.getwebinarById
  add_webinar = myGlobals.add_webinar

  // enriched_image="https://staging.enrichedacademy.com/img/enriched-logo.png"
  public dateTime2: Date;
  response;
  constructor(public router: Router, private fb: FormBuilder,
    public rout: ActivatedRoute,
    private interview_service: AddWebinarService, public toastr: ToastrService) {
    this.AddWebinarForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      webinar_date: new FormControl('', [Validators.required]),
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
      image_upload: ''

    })
  }
  /**
  //  * time picker
   */
  // test = [new Date(), new Date()];
  ngOnInit() {
    this.prodId = window.location.href.split('add_webinar/')[1]
    // alert(id)
    console.log(this.prodId)
    if (this.prodId) {
      this.editPostWebinar();
    }
    this.currentDate = new Date()
    console.log(this.currentDate)
  }

  /**
   * File Select 
   */
  url = 'https://staging.enrichedacademy.com/img/enriched-logo.png';
  // onSelectFile(event) {
  //   this.hide = 1
  //   this.message = 1
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event: any) => { // called once readAsDataURL is completed
  //       console.log(event);
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  /**
   * 
   */

  startDateChange() {

  }
  /**
   * Button Toggle
   */
  public show: boolean = true;
  public buttonName: any = 'keyboard_arrow_down';
  buttontoggle() {
    this.show = !this.show;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "keyboard_arrow_up";
    else
      this.buttonName = "keyboard_arrow_down";
  }

  /**
   * submit form
   */
  submit() {
    this.message = 0
    let item = {
      name: this.AddWebinarForm.controls['name'].value,
      // webinar_date: moment(this.AddWebinarForm.controls['webinar_date'].value).local().format('YYYY-MM-DD HH:mm:ss'),
      webinar_date: this.AddWebinarForm.controls['webinar_date'].value,
      start_time: this.AddWebinarForm.controls['start_time'].value,
      end_time: this.AddWebinarForm.controls['end_time'].value,
      img_url: this.AddWebinarForm.controls['image_upload'].value,
      // image: this.url
      // image:this.enriched_image

    }

    if (this.AddWebinarForm.invalid == true) {
      return false;
    }

    console.log(this.AddWebinarForm.value, item);
    this.interview_service.Post(this.add_webinar, {
      name: item.name, webinar_date: item.webinar_date, start_time: item.start_time, end_time: item.end_time,
      // img_url: item.image,
      img_url: item.img_url,
      token: 'LIVESITE'
    }).subscribe(res => {
      console.log(res)
      this.AddSubmitForm(res)
    });
  }

  AddSubmitForm(res) {
    if (res['status'] == 1) {
      this.toastr.success('Data Inserted Successfully')
      this.router.navigate(['/apps/webinars'])
    } else {
      this.toastr.warning('There Are some Issue')
    }
  }
  // day: "Thursday"
  // end_time: null
  // webinar_date: null
  // webinar_name: null
  // webinar_time: null
  /**
   * Edit Form
   * @param prodId 
   */
  editPostWebinar() {
    this.interview_service.Post(this.getwebinarById, { webinar_id: this.prodId, token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      console.log(this.response)
      this.name = 1
      this.add_button = 1
      if (this.response['status'] == 1) {
        this.response = this.response['data']
        for (let index = 0; index < this.response.length; index++) {
          var element = this.response[index];
          console.log(element)
        }
        // console.log(this.response,this.response['webinar_name'],this.response['webinar_date'],
        // this.response['webinar_time'],this.response['end_time'],this.response['webinar_img'])
        this.AddWebinarForm.controls['name'].setValue(element['webinar_name']),
          this.AddWebinarForm.controls['webinar_date'].setValue(element['webinar_date'])
        this.AddWebinarForm.controls['start_time'].setValue(element['webinar_time'])
        this.AddWebinarForm.controls['end_time'].setValue(element['end_time'])
        this.AddWebinarForm.controls['image_upload'].setValue(element['webinar_img'])
      } else {
        this.name = 0
        this.add_button = 0

      }
    });
  }

  // created_date: "2019-10-31 16:29:50"
  // day: "Thursday"
  // end_time: "14:30:00"
  // id: 3
  // links: ""
  // webinar_date: "2019-11-12"
  // webinar_img: "2.png"
  // webinar_name: "8 Factors To Mastering Your Personal Finances As A Canadian Presented By Dustan Woodhouse and Enriched Academy"
  // webinar_time: "13:00:00

  /**
   * 
   * @param prodId update form
   */
  update(prodId) {
    console.log(prodId)
    let item = {
      name: this.AddWebinarForm.controls['name'].value,
      // webinar_date: moment(this.AddWebinarForm.controls['webinar_date'].value).local().format('YYYY-MM-DD HH:mm:ss'),
      webinar_date: this.AddWebinarForm.controls['webinar_date'].value,
      start_time: this.AddWebinarForm.controls['start_time'].value,
      end_time: this.AddWebinarForm.controls['end_time'].value,
      // image: this.url
      img_url: this.AddWebinarForm.controls['image_upload'].value


    }

    this.interview_service.Post(this.add_webinar, {
      name: item.name, webinar_date: item.webinar_date, start_time: item.start_time, end_time: item.end_time,
      img_url: item.img_url,webinar_id: this.prodId,
      token: 'LIVESITE'
    }).subscribe(res => {
      console.log(res)
      if (res['status'] == 1) {
        this.toastr.success('Webinar Update Successfully')
        this.router.navigate(['/apps/webinars'])
      } else {
        this.toastr.warning('There Are some Issue')
      }
    });
  }
  MyDate(newDate, name) {
    //   let date;
    //   if (name == 'start') {

    //     this.startDate = newDate;
    //     date = this.startDate
    //   }
    //   else if (name == 'end') {

    //     this.endDate = newDate;
    //     date = this.endDate
    //   }
    //   if (date != null) {

    //     this.Search(this.datePipe.transform(date, "yyyy-MM-dd"), name);
    //   }
    //   else {
    //     this.Search(date = '', name)
    //   }
  }
  //image upload
  image_upload(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.AddWebinarForm.get('image_upload').setValue({
        filename: file.name,
        filetype: file.type,
        filesize: file.size,
        value: (reader.result).toString().split(',')[1],
      })
    };
  }
}
