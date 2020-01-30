import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ManagementService } from '../management.service';
import * as myGlobals from '../../../../../global';
let ConfirmdialogComponent = class ConfirmdialogComponent {
    constructor(dialogRef, data, rt, manage_service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this.manage_service = manage_service;
        this.deleteTopic = myGlobals.deleteTopic;
        // Update view with given values
        this.res_data = data.id;
        console.log("check", this.res_data);
        this.title = data.title;
        this.message = data.message;
    }
    onConfirm() {
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
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
};
ConfirmdialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-confirmdialog',
        templateUrl: './confirmdialog.component.html',
        styleUrls: ['./confirmdialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, ManagementService])
], ConfirmdialogComponent);
export { ConfirmdialogComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=confirmdialog.component.js.map