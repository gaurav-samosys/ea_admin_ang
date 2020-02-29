import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VideolistService } from '../videolist.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  addvideoForm: any;
  value = 1;
  addVideos = myGlobals.addVideo;
  common: any;
  addvideo_status: any;
  topic_id: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddvideoComponent>, private rt: Router, public _formBuilder: FormBuilder, private video_service: VideolistService) {
    this.topic_id = this.data;
    console.log(this.topic_id)
  }

  ngOnInit() {
    this.addvideoForm = this._formBuilder.group({
      title: ['', Validators.required],
      sort_desc: ['', Validators.required],
      order: ['', Validators.required],
      video_composer: ['', Validators.required],
      user_type: [''],

    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addvideoForm.controls[controlName].hasError(errorName);
  }

  addVideo() {

    if (this.addvideoForm.invalid) {
      return false;
    }
    console.log(this.addvideoForm.value)
    this.addvideoForm.value.token = "LIVESITE";
    this.addvideoForm.value.topic_id = this.topic_id;

    this.video_service.Post(this.addVideos, this.addvideoForm.value).subscribe(res => {
      this.common = res;
      this.addvideo_status = this.common.status;
      console.log(this.addvideo_status)

      this.dialogRef.close(true);

      // localStorage.setItem("addvideo_status", this.addvideo_status);

      this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() =>
        this.rt.navigate(["/apps/vertical-management/videolist/" + this.topic_id]));
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
