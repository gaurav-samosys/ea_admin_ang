import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagementService }    from '../management.service';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent {
	  title: string;
  message: string;
  res_data:any;
    deleteTopic=myGlobals.deleteTopic;
 common:any;
 deletetopic_status
  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,private manage_service:ManagementService) {
    // Update view with given values
     this.res_data=data.id
    console.log("check",this.res_data)
    this.title = data.title;
    this.message = data.message;
  }
  
  onConfirm(): void {
    // Close the dialog, return true
/*     this.manage_service.Post(this.deleteTopic,{id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
      this.common=res;
         this.deletetopic_status=this.common.status;
        console.log(this.deletetopic_status)
             
          
        localStorage.setItem("deletetopic_status",this.deletetopic_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/vertical-management/management/"+this.res_data.vertical_id]));
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
