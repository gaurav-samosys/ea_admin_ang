import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../../../../global';
import { CommentService } from '../comment.service';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  res_data:any;
  deleteCommentApi=myGlobals.deleteCommentApi;
 common:any;
 deletetopic_status
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,private comment_service:CommentService) {
     this.res_data=data.id
    console.log("check",this.res_data)
    this.title = data.title;
    this.message = data.message;
  }
  
  onConfirm(): void {
    // Close the dialog, return true
     this.comment_service.Post(this.deleteCommentApi,{id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
      console.log(res)
      if(res['success']==true && res['status_code']==200){
        this.dialogRef.close(true);
      }
    })
  }
 
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  ngOnInit(){

  }
}

export class ConfirmDialogModel {
 
  constructor(public title: string, public message: string,public id:any) {
  }
}
