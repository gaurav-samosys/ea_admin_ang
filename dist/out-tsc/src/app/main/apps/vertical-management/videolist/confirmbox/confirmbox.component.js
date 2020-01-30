import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { VideolistService } from '../videolist.service';
import * as myGlobals from '../../../../../global';
let ConfirmboxComponent = class ConfirmboxComponent {
    constructor(dialogRef, data, rt, video_service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this.video_service = video_service;
        this.deleteVideo = myGlobals.deleteVideo;
        // Update view with given values
        console.log(data);
        this.title = data.title;
        this.message = data.message;
        this.res_data = data.id;
        console.log("check", this.res_data);
        this.topic_id = this.res_data.topic_id;
    }
    onConfirm() {
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
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
};
ConfirmboxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-confirmbox',
        templateUrl: './confirmbox.component.html',
        styleUrls: ['./confirmbox.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, VideolistService])
], ConfirmboxComponent);
export { ConfirmboxComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=confirmbox.component.js.map