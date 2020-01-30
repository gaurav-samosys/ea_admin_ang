import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { VideolistService } from '../videolist.service';
import * as myGlobals from '../../../../../global';
let EditvideoComponent = class EditvideoComponent {
    constructor(data, dialogRef, rt, _formBuilder, video_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.video_service = video_service;
        this.value = 1;
        this.editVideo = myGlobals.editVideo;
        this.check = 1;
        this.hasError = (controlName, errorName) => {
            return this.editvideoForm.controls[controlName].hasError(errorName);
        };
        this.res_data = this.data;
        console.log(this.res_data);
        this.check = this.res_data.user_type;
        this.topic_id = this.res_data.topic_id;
    }
    ngOnInit() {
        this.editvideoForm = this._formBuilder.group({
            title: ['', Validators.required],
            sort_desc: ['', Validators.required],
            order: ['', Validators.required],
            video_composer: ['', Validators.required],
            user_type: [''],
        });
        this.editvideoForm.patchValue({
            title: this.res_data.title,
            sort_desc: this.res_data.sort_desc,
            order: this.res_data.order,
            video_composer: this.res_data.video_composer,
            user_type: this.res_data.user_type
        });
    }
    updateVideo() {
        if (this.editvideoForm.invalid) {
            return false;
        }
        console.log(this.editvideoForm.value);
        this.editvideoForm.value.token = "LIVESITE";
        this.editvideoForm.value.topic_id = this.topic_id;
        this.editvideoForm.value.video_id = this.res_data.id;
        this.video_service.Post(this.editVideo, this.editvideoForm.value).subscribe(res => {
            this.common = res;
            this.editvideo_status = this.common.status;
            localStorage.setItem("editvideo_status", this.editvideo_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/videolist/" + this.topic_id]));
        });
        this.dialogRef.close();
    }
    onClose() {
        this.dialogRef.close();
    }
};
EditvideoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editvideo',
        templateUrl: './editvideo.component.html',
        styleUrls: ['./editvideo.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, VideolistService])
], EditvideoComponent);
export { EditvideoComponent };
//# sourceMappingURL=editvideo.component.js.map