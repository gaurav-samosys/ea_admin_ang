import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { VerticalService } from '../vertical.service';
import * as myGlobals from '../../../../../global';
let DeleteverticalComponent = class DeleteverticalComponent {
    constructor(dialogRef, data, rt, vertical_service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this.vertical_service = vertical_service;
        this.deleteVertical = myGlobals.deleteVertical;
        // Update view with given values
        console.log(data);
        this.title = data.title;
        this.message = data.message;
        this.res_data = data.id;
        console.log("check", this.res_data);
    }
    onConfirm() {
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
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
};
DeleteverticalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-deletevertical',
        templateUrl: './deletevertical.component.html',
        styleUrls: ['./deletevertical.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, VerticalService])
], DeleteverticalComponent);
export { DeleteverticalComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=deletevertical.component.js.map