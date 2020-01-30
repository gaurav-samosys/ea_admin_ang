import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import * as myGlobals from '../../../../../global';
let UserConfirmboxComponent = class UserConfirmboxComponent {
    constructor(dialogRef, data, rt, user) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this.user = user;
        this.deleteUser = myGlobals.deleteUser;
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }
    onConfirm() {
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
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
};
UserConfirmboxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-confirmbox',
        templateUrl: './user-confirmbox.component.html',
        styleUrls: ['./user-confirmbox.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, UsersService])
], UserConfirmboxComponent);
export { UserConfirmboxComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=user-confirmbox.component.js.map