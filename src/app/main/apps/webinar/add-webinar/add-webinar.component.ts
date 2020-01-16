import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddWebinarService } from './add-webinar.service';
import { ToastrService } from 'ngx-toastr';
declare var moment: any

@Component({
  selector: 'app-add-webinar',
  templateUrl: './add-webinar.component.html',
  styleUrls: ['./add-webinar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWebinarComponent implements OnInit {
  AddWebinarForm: FormGroup
  name:number=0
  add_button:number=0
  hide:number=0
  message:number=1
  currentDate
  message1='this is field required'
  // enriched_image="https://staging.enrichedacademy.com/img/enriched-logo.png"
  public dateTime2: Date;
  constructor(public router: Router, private fb: FormBuilder,
    public rout: ActivatedRoute,
    private interview_service: AddWebinarService, public toastr: ToastrService) {
    this.AddWebinarForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      webinar_date: new FormControl('', [Validators.required]),
      start_time: new FormControl('', [Validators.required]),
      end_time: new FormControl('', [Validators.required]),
      // image:''
    })
  }

  /**
  //  * time picker
   */
  // test = [new Date(), new Date()];
  ngOnInit() {
    this.currentDate=new Date()
    console.log(this.currentDate)
  }

  /**
   * File Select 
   */
  url = 'https://staging.enrichedacademy.com/img/enriched-logo.png';
  onSelectFile(event) {
    this.hide =1
    this.message=1
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        console.log(event);
        this.url = event.target.result;
      }
    }
  }

  /**
   * 
   */

  startDateChange(){

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
      // image: this.AddWebinarForm.controls['image'].value,
      image:this.url
      // image:this.enriched_image

    }

    if (this.AddWebinarForm.invalid == true) {
      return false;
    }

    console.log(this.AddWebinarForm.value,item);
    // this.interview_service.Post(this.addEditBlogApi, {
    //   post_title: item.post_title, category: item.category, author: item.author, video_id: item.video_id, description: item.description, cover_img: item.cover_img,
    //   token: 'LIVESITE'
    // }).subscribe(res => {
    //  this.AddSubmitForm(res)
    // });
  }

  AddSubmitForm(res) {
    if (res['success'] == true && res['status_code'] == 200) {
      this.toastr.success('Blog Add Successfully')
      this.router.navigate(['/apps/blogs/blog'])
    } else {
      this.toastr.warning('There Are some Issue')
    }
  }

  /**
   * Edit Form
   * @param prodId 
   */
  // editPost() {
  //   this.interview_service.Post(this.addEditBlogApi, { id: this.prodId, token: 'LIVESITE' }).subscribe(res => {
  //     this.response = res
  //     console.log(this.response)
  //     this.name = 1
  //     this.add_button = 1
  //     if (this.response['success'] == true && this.response['status_code'] == 200) {
  //       this.response = this.response['data']
  //       console.log(this.response)
  //       this.AddWebinarForm.controls['post_title'].setValue(this.response['post_title']),
  //         this.AddWebinarForm.controls['category'].setValue(this.response['category'])
  //       this.AddWebinarForm.controls['author'].setValue(this.response['author'])
  //       this.AddWebinarForm.controls['video_id'].setValue(this.response['video_id'].toString())
  //       this.AddWebinarForm.controls['cover_img'].setValue(this.response['cover_img'].toString())
  //       this.AddWebinarForm.controls['description'].setValue(this.response['description'])
  //     } else {
  //       this.name = 0
  //       this.add_button = 0

  //     }
  //   });
  // }

  /**
   * 
   * @param prodId update form
   */
  update(prodId) {
    console.log(prodId)
    let item = {
      title: this.AddWebinarForm.controls['title'].value,
      status: this.AddWebinarForm.controls['status'].value,
      video_id: this.AddWebinarForm.controls['video_id'].value,
    }
    // this.interview_service.Post(this.updateBlogApi, {id:this.prodId,
    //   post_title: item.post_title,
    //    category: item.category, 
    //    author: item.author, 
    //    video_id: item.video_id, 
    //    description: item.description, 
    //    cover_img: item.cover_img,
    //   token: 'LIVESITE'
    // }).subscribe(res => {
    //   console.log(res)
    //   if (res['success'] == true && res['status_code'] == 200) {
    //     this.toastr.success('Blog Update Successfully')
    //     this.router.navigate(['/apps/blogs'])
    //   } else {
    //     this.toastr.warning('There Are some Issue')
    //   }
    // });
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

}
