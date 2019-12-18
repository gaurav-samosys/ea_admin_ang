import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VideolistService }    from '../videolist.service';
import * as myGlobals from '../../../../../global';
@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss']
})
export class ConfirmboxComponent {
	  title: string;
  message: string;
 common:any;
 deletevideo_status:any;
  deleteVideo=myGlobals.deleteVideo;
  res_data:any;
  topic_id:any;
  constructor(public dialogRef: MatDialogRef<ConfirmboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,private video_service:VideolistService) {
    // Update view with given values
    console.log(data)
    this.title = data.title;
    this.message = data.message;
     this.res_data=data.id
    console.log("check",this.res_data)
    this.topic_id=this.res_data.topic_id
  }
  
  onConfirm(): void {
    // Close the dialog, return true

/*     this.video_service.Post(this.deleteVideo,{video_id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
      this.common=res;
         this.deletevideo_status=this.common.status;
        console.log(this.deletevideo_status)
             
          
        localStorage.setItem("deletevideo_status",this.deletevideo_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/videolist/"+this.topic_id]));
        this.dialogRef.close();
    })*/
    this.dialogRef.close(true);
  }
 
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
 
  constructor(public title: string, public message: string,public id:any) {
  }
}
