import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddInterviewService } from './add-interview.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.component.html',
  styleUrls: ['./add-interview.component.scss']
})
export class AddInterviewComponent implements OnInit {
  add_button: number = 0
  name: number = 0
  AddInterviewForm: FormGroup
  response: any;
  statusArray = [{ id: '1', value: 'Active' }, { id: '0', value: 'Inactive' }]
  constructor(public router: Router, private fb: FormBuilder,
    public rout: ActivatedRoute,
    private interview_service: AddInterviewService, public toastr: ToastrService) {
    this.AddInterviewForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      video_id: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),

    })
  }

  ngOnInit() {
  }
  /**
   * change status
   * @param id 
   */
  statusChange(id) {
    console.log(id)
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
    let item = {
      title: this.AddInterviewForm.controls['title'].value,
      status: this.AddInterviewForm.controls['status'].value,
      video_id: this.AddInterviewForm.controls['video_id'].value,
    }

    if (this.AddInterviewForm.invalid == true) {
      return false;
    }

    // console.log(this.AddInterviewForm.value);
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
  //       this.AddInterviewForm.controls['post_title'].setValue(this.response['post_title']),
  //         this.AddInterviewForm.controls['category'].setValue(this.response['category'])
  //       this.AddInterviewForm.controls['author'].setValue(this.response['author'])
  //       this.AddInterviewForm.controls['video_id'].setValue(this.response['video_id'].toString())
  //       this.AddInterviewForm.controls['cover_img'].setValue(this.response['cover_img'].toString())
  //       this.AddInterviewForm.controls['description'].setValue(this.response['description'])
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
      title: this.AddInterviewForm.controls['title'].value,
      status: this.AddInterviewForm.controls['status'].value,
      video_id: this.AddInterviewForm.controls['video_id'].value,
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

}
