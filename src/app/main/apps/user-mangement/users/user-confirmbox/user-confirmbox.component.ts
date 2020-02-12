import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService }    from '../users.service';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../../global';

@Component({
  selector: 'app-user-confirmbox',
  templateUrl: './user-confirmbox.component.html',
  styleUrls: ['./user-confirmbox.component.scss']
})
export class UserConfirmboxComponent{

	  title: string;
  message: string;
  common:any;
  deleteUser = myGlobals.deleteUser;
delete_status:any;
 
  constructor(public dialogRef: MatDialogRef<UserConfirmboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private rt:Router,private user:UsersService) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }
  
  onConfirm(): void {
    // Close the dialog, return true
/*        this.user.POST(this.deleteUser,{id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
      this.common=res;
         this.delete_status=this.common.status;
        console.log(this.delete_status)
             
          
        localStorage.setItem("delete_user",this.delete_status);
      
        this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
                          this.rt.navigate(["/apps/user-mangement/user"]));
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