import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { VideolistService } from '../videolist.service';
import * as myGlobals from '../../../../../global';
let AddvideoComponent = class AddvideoComponent {
    constructor(data, dialogRef, rt, _formBuilder, video_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.video_service = video_service;
        this.value = 1;
        this.addVideos = myGlobals.addVideo;
        this.hasError = (controlName, errorName) => {
            return this.addvideoForm.controls[controlName].hasError(errorName);
        };
        this.topic_id = this.data;
        console.log(this.topic_id);
    }
    ngOnInit() {
        this.addvideoForm = this._formBuilder.group({
            title: ['', Validators.required],
            sort_desc: ['', Validators.required],
            order: ['', Validators.required],
            video_composer: ['', Validators.required],
            user_type: [''],
        });
    }
    addVideo() {
        if (this.addvideoForm.invalid) {
            return false;
        }
        console.log(this.addvideoForm.value);
        this.addvideoForm.value.token = "LIVESITE";
        this.addvideoForm.value.topic_id = this.topic_id;
        this.video_service.Post(this.addVideos, this.addvideoForm.value).subscribe(res => {
            this.common = res;
            this.addvideo_status = this.common.status;
            console.log(this.addvideo_status);
            localStorage.setItem("addvideo_status", this.addvideo_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/videolist/" + this.topic_id]));
            this.dialogRef.close();
        });
    }
    onClose() {
        this.dialogRef.close();
    }
};
AddvideoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addvideo',
        templateUrl: './addvideo.component.html',
        styleUrls: ['./addvideo.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, VideolistService])
], AddvideoComponent);
export { AddvideoComponent };
//# sourceMappingURL=addvideo.component.js.map