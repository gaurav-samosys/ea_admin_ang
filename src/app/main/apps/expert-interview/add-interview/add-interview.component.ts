import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddInterviewService } from './add-interview.service';
import { ToastrService } from 'ngx-toastr';
import * as myGlobals from '../../../../global';

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
  add_expert_interview = myGlobals.add_expert_interview
  expert_interviews_detail = myGlobals.expert_interviews_detail
  update_expert_interview = myGlobals.update_expert_interview
  prodId;

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

    this.prodId = window.location.href.split('add_expert_interview/')[1]
    // alert(id)
    console.log(this.prodId)
    if(this.prodId){
      this.editForm()
    }
  }
  /**
  * 
  * @param id 
  */
  editForm() {
    var id = this.prodId;
    // console.log(id)
    this.interview_service.Post(this.expert_interviews_detail + '/' + id, { token: 'LIVESITE' }).subscribe(res => {
      this.response = res
      // console.log(this.response)
      this.name = 1
      this.add_button = 1
      if (this.response['status'] == 1) {
        this.response = this.response['data']
        console.log(this.response)
        if (this.response['status'] == 0) {
          var status = 'Inactive'
        } else {
          var status = 'Active'
        }
        this.AddInterviewForm.controls['title'].setValue(this.response['title']),
          this.AddInterviewForm.controls['video_id'].setValue(this.response['video_id'].toString())
        this.AddInterviewForm.controls['status'].setValue(status)
      } else {
        this.name = 0
        this.add_button = 0
      }
    });
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

    console.log(this.AddInterviewForm.value);
    this.interview_service.Post(this.add_expert_interview, {
      title: item.title, video_id: item.video_id, status: item.status,
      token: 'LIVESITE'
    }).subscribe(res => {
      console.log(res)
      if (res['status'] == '1') {
        this.toastr.success('Expert Added Successfully')
        this.router.navigate(['/apps/expert_interview'])
      } else {
        this.toastr.warning('There Are some Issue')
      }
      //  this.AddSubmitForm(res)
    });
  }



  /**
   * 
   * @param prodId update form
   */
  update(prodId) {
    console.log(this.response)
    console.log(prodId)
    let item = {
      title: this.AddInterviewForm.controls['title'].value,
      status: this.AddInterviewForm.controls['status'].value,
      video_id: this.AddInterviewForm.controls['video_id'].value,
    }
    this.interview_service.Post(this.update_expert_interview, {
      id: this.prodId,
      title:      item.title,
      status:     item.status,
      video_id:   item.video_id,
      token: 'LIVESITE'
    }).subscribe(res => {
      console.log(res)
      // if (res['success'] == true && res['status_code'] == 200) {
        this.toastr.success('Expert Interview Record Update Successfully')
        this.router.navigate(['/apps/expert_interview'])
      // } else {
        // this.toastr.warning('There Are some Issue')
      // }
    });
  }

}


 // AddSubmitForm(res) {
  //   console.log(res)
  //   if (res['success'] == 1) {
  //     this.toastr.success('Expert Added Successfully')
  //     this.router.navigate(['/apps/expert_interview'])
  //   } else {
  //     this.toastr.warning('There Are some Issue')
  //   }
  // }
