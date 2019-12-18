import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VideolistService }    from '../videolist.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrls: ['./editvideo.component.scss']
})
export class EditvideoComponent implements OnInit {
	editvideoForm:any;
    value=1;
    res_data:any;
      editVideo=myGlobals.editVideo;
    check=1;
    topic_id:any;
    editvideo_status:any;
    common:any
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditvideoComponent>,private rt:Router,public _formBuilder: FormBuilder,private video_service:VideolistService) {
       this.res_data = this.data;
       console.log(this.res_data)
       this.check=this.res_data.user_type;
       this.topic_id=this.res_data.topic_id;
    }

  ngOnInit() {
this.editvideoForm=this._formBuilder.group({
  		title:['',Validators.required],
  		sort_desc:['',Validators.required],
  		order:['',Validators.required],
  		video_composer:['',Validators.required],
  		user_type:[''],

  	})

    this.editvideoForm.patchValue({
      title:this.res_data.title,
      sort_desc:this.res_data.sort_desc,
      order:this.res_data.order,
      video_composer:this.res_data.video_composer,
      user_type:this.res_data.user_type
    })
}

   public hasError = (controlName: string, errorName: string) =>{
              return this.editvideoForm.controls[controlName].hasError(errorName);
            }
  
updateVideo()
{ 
  if(this.editvideoForm.invalid){
    return false;
  }
	console.log(this.editvideoForm.value)
    this.editvideoForm.value.token="LIVESITE";
  this.editvideoForm.value.topic_id=this.topic_id;
  this.editvideoForm.value.video_id=this.res_data.id;

    this.video_service.Post(this.editVideo,this.editvideoForm.value).subscribe(res=>{
      this.common=res;
         this.editvideo_status=this.common.status;
             
          
        localStorage.setItem("editvideo_status",this.editvideo_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/videolist/"+this.topic_id]));
    })
        this.dialogRef.close();
}

onClose()
{
	this.dialogRef.close();
}

}
