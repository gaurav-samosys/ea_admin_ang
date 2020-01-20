import { Component, OnInit, Inject } from '@angular/core';
import * as myGlobals from '../../../../../global';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowquizService } from '../showquiz.service';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss']
})
export class ConfirmboxComponent implements OnInit {

  title: string;
  message: string;
  deleteQuiz=myGlobals.deleteQuiz;
  common:any;
  deletequiz_status:any;
  res_data:any;
  topic_id:any;
  constructor(public dialogRef: MatDialogRef<ConfirmboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,public _formBuilder: FormBuilder,private show_service:ShowquizService) {
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

    // this.show_service.Post(this.deleteQuiz,{quiz_id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
    //   this.common=res;
    //      this.deletequiz_status=this.common.status;
    //     console.log(this.deletequiz_status)
             
          
    //     localStorage.setItem("deletequiz_status",this.deletequiz_status);
      
    //     this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
    //                       this.rt.navigate(["/apps/vertical-management/quizzeslist/"+this.topic_id]));
    //     this.dialogRef.close();
    // })

    this.dialogRef.close(true);
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
