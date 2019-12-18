import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VerticalService }    from '../vertical.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-deletevertical',
  templateUrl: './deletevertical.component.html',
  styleUrls: ['./deletevertical.component.scss']
})
export class DeleteverticalComponent  {
  title: string;
  message: string;
 common:any;
 deletevertical_status:any;
  deleteVertical=myGlobals.deleteVertical;
  res_data:any;
  topic_id:any;
  constructor(public dialogRef: MatDialogRef<DeleteverticalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,private vertical_service:VerticalService) {
    // Update view with given values
    console.log(data)
    this.title = data.title;
    this.message = data.message;
     this.res_data=data.id
    console.log("check",this.res_data)
  }
  
  onConfirm(): void {
    // Close the dialog, return true

/*     this.vertical_service.Post(this.deleteVertical,{vertical_id:this.res_data,token:"LIVESITE"}).subscribe(res=>{
      this.common=res;
         this.deletevertical_status=this.common.status;
        console.log(this.deletevertical_status)
             
          
        localStorage.setItem("deletevertical_status",this.deletevertical_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/vertical"]));
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
